import { test, expect } from '@playwright/test';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../..', import.meta.url));
const contentTypes = {
  '.js': 'text/javascript',
  '.mjs': 'text/javascript'
};

let server;
let origin;

test.beforeAll(async () => {
  server = createServer(async (request, response) => {
    if (request.url === '/') {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end('<!doctype html><title>js-sha256 worker test</title>');
      return;
    }

    const path = normalize(join(root, decodeURIComponent(request.url)));
    if (!path.startsWith(root)) {
      response.writeHead(403);
      response.end();
      return;
    }

    try {
      await stat(path);
      response.writeHead(200, {
        'Content-Type': contentTypes[extname(path)] || 'application/octet-stream'
      });
      createReadStream(path).pipe(response);
    } catch {
      response.writeHead(404);
      response.end();
    }
  });

  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  origin = `http://127.0.0.1:${address.port}`;
});

test.afterAll(async () => {
  await new Promise((resolve, reject) => {
    server.close(error => error ? reject(error) : resolve());
  });
});

async function hashInWorker(page, workerPath, options) {
  return page.evaluate(({ workerPath, options }) => new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, options);
    const timeout = setTimeout(() => {
      worker.terminate();
      reject(new Error('Worker timed out'));
    }, 5000);

    worker.onmessage = event => {
      clearTimeout(timeout);
      worker.terminate();
      resolve(event.data);
    };
    worker.onerror = event => {
      clearTimeout(timeout);
      worker.terminate();
      reject(new Error(event.message));
    };
    worker.postMessage('abc');
  }), { workerPath, options });
}

test('classic Worker loads the minified UMD build', async ({ page }) => {
  await page.goto(origin);
  const hash = await hashInWorker(page, '/tests/browser/classic-worker.js');
  expect(hash).toBe(
    'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
  );
});

test('module Worker imports the ESM source entry', async ({ page }) => {
  await page.goto(origin);
  const hash = await hashInWorker(
    page,
    '/tests/browser/module-worker.mjs',
    { type: 'module' }
  );
  expect(hash).toBe(
    'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
  );
});
