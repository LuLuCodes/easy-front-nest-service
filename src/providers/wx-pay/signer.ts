import {
  createPrivateKey,
  createPublicKey,
  createSign,
  createVerify,
  randomBytes,
  type KeyObject,
} from 'node:crypto';

export interface RequestForSigning {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  /** Request path including query string, e.g. /v3/pay/transactions/native */
  pathWithQuery: string;
  /** Stringified JSON body for POST/PUT/PATCH; empty string for GET/DELETE. */
  body: string;
}

export interface AuthorizationParams {
  mchId: string;
  serialNo: string;
  privateKey: KeyObject;
}

const ALGO = 'WECHATPAY2-SHA256-RSA2048';

/**
 * Builds the canonical signature string and signs it with the merchant
 * private key per WeChat Pay v3:
 *
 *   {METHOD}\n{PATH_WITH_QUERY}\n{TIMESTAMP}\n{NONCE}\n{BODY}\n
 */
export function buildAuthorizationHeader(
  req: RequestForSigning,
  auth: AuthorizationParams,
): string {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonceStr = randomBytes(16).toString('hex');
  const message = `${req.method}\n${req.pathWithQuery}\n${timestamp}\n${nonceStr}\n${req.body}\n`;
  const signature = createSign('RSA-SHA256')
    .update(message, 'utf8')
    .sign(auth.privateKey, 'base64');
  return (
    `${ALGO} ` +
    `mchid="${auth.mchId}",` +
    `nonce_str="${nonceStr}",` +
    `timestamp="${timestamp}",` +
    `serial_no="${auth.serialNo}",` +
    `signature="${signature}"`
  );
}

export interface ResponseToVerify {
  /** Body bytes of the upstream response (string is fine — JSON body). */
  body: string;
  /** Wechatpay-Timestamp header */
  timestamp: string;
  /** Wechatpay-Nonce header */
  nonce: string;
  /** Wechatpay-Signature header (base64) */
  signature: string;
}

/**
 * Verifies a v3 response signature against a platform certificate. Per
 * WeChat docs the canonical message is:
 *
 *   {TIMESTAMP}\n{NONCE}\n{BODY}\n
 *
 * Caller selects the platform cert by `Wechatpay-Serial` header.
 */
export function verifyV3Signature(res: ResponseToVerify, platformPublicKey: KeyObject): boolean {
  const message = `${res.timestamp}\n${res.nonce}\n${res.body}\n`;
  return createVerify('RSA-SHA256')
    .update(message, 'utf8')
    .verify(platformPublicKey, res.signature, 'base64');
}

export function loadPrivateKey(pem: string): KeyObject {
  return createPrivateKey({ key: pem, format: 'pem' });
}

export function loadPublicKeyFromCertPem(certPem: string): KeyObject {
  return createPublicKey({ key: certPem, format: 'pem' });
}
