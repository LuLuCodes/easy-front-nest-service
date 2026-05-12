import { bootstrapTracing } from './tracing';

describe('bootstrapTracing', () => {
  const ORIGINAL_ENDPOINT = process.env.OTEL_EXPORTER_OTLP_ENDPOINT;

  afterEach(() => {
    if (ORIGINAL_ENDPOINT === undefined) {
      delete process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
    } else {
      process.env.OTEL_EXPORTER_OTLP_ENDPOINT = ORIGINAL_ENDPOINT;
    }
  });

  it('returns null and is a no-op when OTEL_EXPORTER_OTLP_ENDPOINT is unset', () => {
    delete process.env.OTEL_EXPORTER_OTLP_ENDPOINT;
    expect(bootstrapTracing()).toBeNull();
  });

  // The SDK boots auto-instrumentation patches on import which is hard to
  // undo cleanly inside jest; we deliberately don't exercise the
  // start-the-SDK path in unit tests. CI will validate it through
  // the integration test container once an OTLP endpoint is wired up.
});
