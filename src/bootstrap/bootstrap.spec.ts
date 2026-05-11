import type { INestApplication } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { applyGlobalProviders } from './global';
import { applySecurity } from './security';
import { applySwagger } from './swagger';
import { printBanner } from './banner';

function fakeConfig(values: Record<string, string>): ConfigService {
  return {
    get: jest.fn((k: string) => values[k]),
  } as unknown as ConfigService;
}

describe('bootstrap helpers', () => {
  describe('applyGlobalProviders', () => {
    it('wires interceptor + 3 exception filters', () => {
      const app = {
        useGlobalInterceptors: jest.fn(),
        useGlobalFilters: jest.fn(),
      } as unknown as INestApplication;
      applyGlobalProviders(app);
      expect(app.useGlobalInterceptors).toHaveBeenCalledTimes(1);
      const filtersArgs = (app.useGlobalFilters as jest.Mock).mock.calls[0];
      expect(filtersArgs).toHaveLength(3);
    });
  });

  describe('applySecurity', () => {
    it('enables CORS in any env and adds helmet in production', () => {
      const app = {
        use: jest.fn(),
        enableCors: jest.fn(),
      } as unknown as NestExpressApplication;
      applySecurity(app, fakeConfig({ 'app.node_env': 'production' }));
      expect(app.use).toHaveBeenCalled();
      expect(app.enableCors).toHaveBeenCalled();
    });

    it('skips helmet in non-production envs', () => {
      const app = {
        use: jest.fn(),
        enableCors: jest.fn(),
      } as unknown as NestExpressApplication;
      applySecurity(app, fakeConfig({ 'app.node_env': 'development' }));
      expect(app.use).not.toHaveBeenCalled();
      expect(app.enableCors).toHaveBeenCalled();
    });
  });

  describe('applySwagger', () => {
    it('no-ops in production', () => {
      const app = { use: jest.fn() } as unknown as INestApplication;
      expect(() => applySwagger(app, fakeConfig({ 'app.node_env': 'production' }))).not.toThrow();
      expect(app.use).not.toHaveBeenCalled();
    });
  });

  describe('printBanner', () => {
    it('writes the running url + ASCII banner to console.log', () => {
      const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined);
      printBanner('http://localhost:8000');
      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });
});
