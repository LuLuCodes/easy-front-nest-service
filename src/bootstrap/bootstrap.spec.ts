import type { INestApplication } from '@nestjs/common';
import type { ConfigService } from '@nestjs/config';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';

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
    it('enables CORS in any env and registers helmet in production', async () => {
      const register = jest.fn().mockResolvedValue(undefined);
      const app = {
        register,
        enableCors: jest.fn(),
        getHttpAdapter: () => ({ getInstance: () => ({ register }) }),
      } as unknown as NestFastifyApplication;
      await applySecurity(app, fakeConfig({ 'app.node_env': 'production' }));
      expect(register).toHaveBeenCalled();
      expect(app.enableCors).toHaveBeenCalled();
    });

    it('skips helmet in non-production envs', async () => {
      const register = jest.fn().mockResolvedValue(undefined);
      const app = {
        register,
        enableCors: jest.fn(),
        getHttpAdapter: () => ({ getInstance: () => ({ register }) }),
      } as unknown as NestFastifyApplication;
      await applySecurity(app, fakeConfig({ 'app.node_env': 'development' }));
      expect(register).not.toHaveBeenCalled();
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
