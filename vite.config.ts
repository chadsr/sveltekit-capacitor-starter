import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sentrySvelteKit } from '@sentry/sveltekit';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import browserslistToEsbuild from 'browserslist-to-esbuild';
import devtoolsJson from 'vite-plugin-devtools-json';
import legacy from '@vitejs/plugin-legacy';

const browsers = browserslist();

export default defineConfig(({ mode }) => {
    // Load 'VITE' prefixed environment variables from the environment based on `mode` in the current working directory.
    // note that the base ImportMetaEnv properties are not available. ONLY the 'VITE_%s' properties are.
    const env: NodeJS.ProcessEnv & ImportMetaEnv = {
        ...process.env,
        ...(loadEnv(mode, process.cwd(), 'VITE') as ImportMetaEnv),
    };

    return {
        css: {
            transformer: 'lightningcss',
            lightningcss: {
                targets: browserslistToTargets(browsers),
            },
        },
        build: {
            target: browserslistToEsbuild(browsers),
            minify: 'esbuild',
            cssMinify: 'lightningcss',
            rollupOptions: {
                external: ['sharp'],
            },
        },
        define: {
            __APP_VERSION__: JSON.stringify(env.npm_package_version),
        },
        plugins: [
            devtoolsJson(),
            sentrySvelteKit({
                autoUploadSourceMaps: true,
                sourceMapsUploadOptions: {
                    telemetry: false,
                    org: 'someorg',
                    project: 'app',
                },
            }),
            tailwindcss(),
            sveltekit(),
            paraglideVitePlugin({
                project: './project.inlang',
                outdir: './src/lib/paraglide',
            }),
            legacy({
                // build modern targets only
                modernTargets: browsers,
                modernPolyfills: true,
                renderModernChunks: true,
                renderLegacyChunks: false,
            }),
        ],
        test: {
            globals: true,
            environment: 'jsdom',
            include: ['src/**/*.{test,spec}.{js,ts}'],
            reporters: env.GITHUB_ACTIONS ? ['dot', 'github-actions'] : ['dot'],
        },
    };
});
