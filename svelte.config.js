import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

import { mdsvex } from 'mdsvex';

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors

	extensions: ['.svelte', '.svx', '.md'],
	preprocess: [
		sveltePreprocess({
			postcss: {
				configFilePath: join(__dirname, 'postcss.config.cjs')
			}
		}),
		mdsvex({
			extensions: ['.svx', '.md'],
			smartypants: {
				dashes: 'oldschool',
				backticks: true,
				ellipses: true,
				quotes: false
			}
		})
	],
	kit: {
		adapter: adapter()
	}
};

export default config;
