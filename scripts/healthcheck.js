#!/usr/bin/env node
/**
 * Container HEALTHCHECK entrypoint.
 *
 * The runner image is distroless (no shell, no curl/wget), so we ship a
 * tiny Node script that hits the liveness endpoint and exits 0/1 based
 * on the HTTP status. Reads PORT from env so it tracks the listening
 * port without rebuilding the image.
 */
const http = require('node:http');

const port = Number(process.env.APP_PORT || process.env.PORT || 8000);
const host = process.env.HEALTHCHECK_HOST || '127.0.0.1';
const path = process.env.HEALTHCHECK_PATH || '/api/health';
const timeoutMs = Number(process.env.HEALTHCHECK_TIMEOUT_MS || 2000);

const req = http.request({ host, port, path, method: 'GET', timeout: timeoutMs }, (res) => {
  if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
    res.resume();
    process.exit(0);
  }
  process.stderr.write(`healthcheck failed: status=${res.statusCode}\n`);
  process.exit(1);
});

req.on('timeout', () => {
  req.destroy(new Error('timeout'));
});
req.on('error', (err) => {
  process.stderr.write(`healthcheck failed: ${err.message}\n`);
  process.exit(1);
});
req.end();
