import type { AlipaySdk, AlipaySdkCommonResult } from 'alipay-sdk';

import { ProviderError } from '@providers/base';
import { CREDENTIAL_PROVIDER, CREDENTIAL_STATUS } from '@entities/tenant-credential.entity';
import type { DecryptedCredential } from '@tenant/credential.service';

import { AlipayClient } from './alipay.client';

function ok(extra: Record<string, unknown> = {}): AlipaySdkCommonResult {
  return { code: '10000', msg: 'Success', ...extra } as unknown as AlipaySdkCommonResult;
}

function fail(): AlipaySdkCommonResult {
  return {
    code: '40004',
    msg: 'Business Failed',
    sub_code: 'ACQ.TRADE_HAS_FINISHED',
    sub_msg: '交易已经完成',
  } as unknown as AlipaySdkCommonResult;
}

function buildClient(overrides: Partial<jest.Mocked<AlipaySdk>> = {}) {
  const sdk: Partial<jest.Mocked<AlipaySdk>> = {
    exec: jest.fn(),
    sdkExec: jest.fn(),
    pageExec: jest.fn() as unknown as jest.Mocked<AlipaySdk>['pageExec'],
    checkNotifySign: jest.fn(),
    ...overrides,
  };
  const credential: DecryptedCredential = {
    id: 1,
    tenant_id: 1,
    provider: CREDENTIAL_PROVIDER.alipay,
    app_id: '2014072300007148',
    secret: 'priv',
    cert: 'pub',
    status: CREDENTIAL_STATUS.active,
    metadata: {
      notify_url: 'https://example.com/notify',
      return_url: 'https://example.com/return',
    },
  };
  return {
    client: new AlipayClient({ sdk: sdk as unknown as AlipaySdk, credential }),
    sdk: sdk as jest.Mocked<AlipaySdk>,
  };
}

describe('AlipayClient', () => {
  describe('precreate', () => {
    it('returns qr_code on success and propagates default notify_url', async () => {
      const { client, sdk } = buildClient();
      sdk.exec.mockResolvedValue(ok({ qr_code: 'https://qr.alipay.com/abc' }));
      const result = await client.precreate({
        out_trade_no: 'T1',
        total_amount: '0.01',
        subject: 'unit-test',
      });
      expect(result.qr_code).toBe('https://qr.alipay.com/abc');
      expect(sdk.exec).toHaveBeenCalledWith('alipay.trade.precreate', {
        bizContent: { out_trade_no: 'T1', total_amount: '0.01', subject: 'unit-test' },
        notifyUrl: 'https://example.com/notify',
      });
    });

    it('uses request-level notify_url override', async () => {
      const { client, sdk } = buildClient();
      sdk.exec.mockResolvedValue(ok({ qr_code: 'https://qr.alipay.com/x' }));
      await client.precreate({
        out_trade_no: 'T2',
        total_amount: '1.00',
        subject: 's',
        notify_url: 'https://override.example.com/n',
      });
      expect(sdk.exec.mock.calls[0]?.[1]?.notifyUrl).toBe('https://override.example.com/n');
    });

    it('throws ProviderError when SDK reports business failure', async () => {
      const { client, sdk } = buildClient();
      sdk.exec.mockResolvedValue(fail());
      await expect(
        client.precreate({ out_trade_no: 'T1', total_amount: '0.01', subject: 's' }),
      ).rejects.toBeInstanceOf(ProviderError);
    });

    it('throws when response is missing qr_code', async () => {
      const { client, sdk } = buildClient();
      sdk.exec.mockResolvedValue(ok({}));
      await expect(
        client.precreate({ out_trade_no: 'T1', total_amount: '0.01', subject: 's' }),
      ).rejects.toBeInstanceOf(ProviderError);
    });
  });

  describe('faceToFace', () => {
    it('forwards scene + auth_code to alipay.trade.pay', async () => {
      const { client, sdk } = buildClient();
      sdk.exec.mockResolvedValue(ok({ trade_no: '202611099001' }));
      await client.faceToFace({
        out_trade_no: 'F1',
        total_amount: '5.00',
        subject: 's',
        auth_code: '286938273891829',
      });
      expect(sdk.exec).toHaveBeenCalledWith(
        'alipay.trade.pay',
        expect.objectContaining({
          bizContent: expect.objectContaining({
            scene: 'bar_code',
            auth_code: '286938273891829',
            out_trade_no: 'F1',
          }),
        }),
      );
    });
  });

  describe('pagePay / wapPay / appPay', () => {
    it('pagePay defaults to POST and merges product_code', () => {
      const { client, sdk } = buildClient();
      (sdk.pageExec as jest.Mock).mockReturnValue('<form>html</form>');
      const html = client.pagePay({ out_trade_no: 'P1', total_amount: '1', subject: 's' });
      expect(html).toBe('<form>html</form>');
      expect(sdk.pageExec).toHaveBeenCalledWith(
        'alipay.trade.page.pay',
        'POST',
        expect.objectContaining({
          bizContent: expect.objectContaining({ product_code: 'FAST_INSTANT_TRADE_PAY' }),
          notifyUrl: 'https://example.com/notify',
          returnUrl: 'https://example.com/return',
        }),
      );
    });

    it('wapPay defaults to GET and forwards quit_url when present', () => {
      const { client, sdk } = buildClient();
      (sdk.pageExec as jest.Mock).mockReturnValue('https://openapi.alipay.com?...');
      client.wapPay({
        out_trade_no: 'W1',
        total_amount: '1',
        subject: 's',
        quit_url: 'https://example.com/quit',
      });
      const callArgs = (sdk.pageExec as jest.Mock).mock.calls[0];
      expect(callArgs[1]).toBe('GET');
      expect(callArgs[2].bizContent.quit_url).toBe('https://example.com/quit');
      expect(callArgs[2].bizContent.product_code).toBe('QUICK_WAP_WAY');
    });

    it('appPay returns the encoded order string from sdkExec', () => {
      const { client, sdk } = buildClient();
      (sdk.sdkExec as jest.Mock).mockReturnValue('encoded-order-str');
      expect(client.appPay({ out_trade_no: 'A1', total_amount: '1', subject: 's' })).toBe(
        'encoded-order-str',
      );
    });
  });

  describe('query / close / refund', () => {
    it('queryOrder requires out_trade_no or trade_no', async () => {
      const { client } = buildClient();
      await expect(client.queryOrder({})).rejects.toBeInstanceOf(ProviderError);
    });

    it('refund requires out_trade_no or trade_no', async () => {
      const { client } = buildClient();
      await expect(client.refund({ refund_amount: '1.00' })).rejects.toBeInstanceOf(ProviderError);
    });

    it('queryRefund forwards out_request_no', async () => {
      const { client, sdk } = buildClient();
      sdk.exec.mockResolvedValue(ok({ refund_amount: '1.00' }));
      await client.queryRefund({ out_trade_no: 'T1', out_request_no: 'R1' });
      expect(sdk.exec).toHaveBeenCalledWith(
        'alipay.trade.fastpay.refund.query',
        expect.objectContaining({
          bizContent: expect.objectContaining({ out_trade_no: 'T1', out_request_no: 'R1' }),
        }),
      );
    });
  });

  describe('verifyNotify', () => {
    it('returns decoded payload when SDK accepts the signature', () => {
      const { client, sdk } = buildClient();
      (sdk.checkNotifySign as jest.Mock).mockReturnValue(true);
      const decoded = client.verifyNotify({
        out_trade_no: 'T1',
        trade_no: '202611099001',
        trade_status: 'TRADE_SUCCESS',
        total_amount: '0.01',
        sign: 'sig',
      });
      expect(decoded.out_trade_no).toBe('T1');
      expect(decoded.trade_status).toBe('TRADE_SUCCESS');
      expect(decoded.total_amount).toBe('0.01');
    });

    it('throws ProviderError when signature invalid', () => {
      const { client, sdk } = buildClient();
      (sdk.checkNotifySign as jest.Mock).mockReturnValue(false);
      expect(() =>
        client.verifyNotify({
          out_trade_no: 'T1',
          trade_no: '1',
          trade_status: 'TRADE_SUCCESS',
          sign: 'tampered',
        }),
      ).toThrow(ProviderError);
    });

    it('throws ProviderError when required fields missing', () => {
      const { client, sdk } = buildClient();
      (sdk.checkNotifySign as jest.Mock).mockReturnValue(true);
      expect(() => client.verifyNotify({ sign: 'x' })).toThrow(ProviderError);
    });
  });
});
