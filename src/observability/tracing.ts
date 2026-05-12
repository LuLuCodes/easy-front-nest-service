import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';

/**
 * Bootstrap OpenTelemetry tracing.
 *
 * Opt-in: only starts the SDK when `OTEL_EXPORTER_OTLP_ENDPOINT` is set,
 * so local dev / CI / unit tests stay zero-overhead and never need a
 * collector. Auto-instruments HTTP, Fastify, ioredis, and mysql2.
 *
 * Must run BEFORE `NestFactory.create` so the instrumentations patch
 * modules at first require time.
 */
export function bootstrapTracing(): NodeSDK | null {
  const endpoint = process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
  if (!endpoint) return null;

  if (process.env.OTEL_LOG_LEVEL === 'debug') {
    diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);
  }

  const sdk = new NodeSDK({
    resource: resourceFromAttributes({
      [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME ?? 'easy-front-nest-service',
      [ATTR_SERVICE_VERSION]: process.env.OTEL_SERVICE_VERSION ?? '5.0.0',
      'deployment.environment': process.env.NODE_ENV ?? 'production',
    }),
    traceExporter: new OTLPTraceExporter({
      url: endpoint.endsWith('/v1/traces') ? endpoint : `${endpoint}/v1/traces`,
    }),
    instrumentations: [
      getNodeAutoInstrumentations({
        '@opentelemetry/instrumentation-fs': { enabled: false },
        '@opentelemetry/instrumentation-net': { enabled: false },
        '@opentelemetry/instrumentation-dns': { enabled: false },
      }),
    ],
  });

  sdk.start();

  const shutdown = async (): Promise<void> => {
    try {
      await sdk.shutdown();
    } catch {
      // ignore — best effort on shutdown
    }
  };
  process.once('SIGTERM', shutdown);
  process.once('SIGINT', shutdown);

  return sdk;
}
