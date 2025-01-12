/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { Router } from 'itty-router'
import getImages from './handlers/get_images​';
import createImage from './handlers/create_image';
import getSingleImage from './handlers/get-single-image';

const router = Router();

router
	.get('/images', getImages)
	.get('/images/:id', getSingleImage)
	.post('/images', createImage)
	.get('*', () => new Response('Not found', { status: 404 }));

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return router.fetch(request);
	},
} satisfies ExportedHandler<Env>;
