// test/index.spec.ts
import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';
import worker from '../src/index';

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>;

describe('UNIT: Photo service worker', () => {
	it('responds a 200 OK to list all images', async () => {
		const request = new IncomingRequest('http://www.example.com/images/');
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx);
		expect(await response.status).toEqual(200);
	});
});

describe("INTEGRATION: Photo service worker", () => {
	it("should return images in the response", async () => {
		const response = await SELF.fetch('http://www.example.com/images');
		const json = await response.json();
		expect(json).toEqual(
			expect.arrayContaining([
				expect.objectContaining({
					id: 3,
					url: 'https://bar.com/img1',
					author: 'Lara Lobster',
				})
			])
		);
	});

	it("should return a set number of images if count is provided", async () => {
		const response = await SELF.fetch('http://www.example.com/images?count=2');
		const json = await response.json();
		console.log(`>>> JSON`, json);
		expect(json).toHaveLength(2);
	});

	it('responds with data of img with id "1" (integration style)', async () => {
		const response = await SELF.fetch('http://www.example.com/images/1');
		expect(await response.text()).toEqual(`{"id":1,"url":"https://foo.com/img1","author":"Bart Simpson"}`);
	});

	it("returns a 404 if a non-existent endpoint is called", async () => {
		const response = await SELF.fetch('http://www.example.com/invalid-endpoint');
		expect(response.status).toEqual(404);
	});
});