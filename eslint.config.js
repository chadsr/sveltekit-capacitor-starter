import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import { includeIgnoreFile } from '@eslint/compat';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ...tseslint.configs.recommended,
    ...svelte.configs.recommended,
    prettier,
    ...svelte.configs.prettier,
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                __APP_VERSION__: 'readonly',
                // ...globals.node,
            },
        },
    },
    {
        files: ['**/*.svelte', '**/*.svelte.ts'],
        // See more details at: https://typescript-eslint.io/packages/parser/
        languageOptions: {
            parserOptions: {
                projectService: true,
                extraFileExtensions: ['.svelte'],
                parser: ts.parser,
            },
        },
    },
    {
        files: ['**/*.svelte', '**/*.svelte.js', '**/*.svelte.ts'],
        languageOptions: {
            parserOptions: {
                svelteConfig,
            },
        },
    },
    {
        rules: {
            // Override or add rule settings here, such as:
            // 'svelte/rule-name': 'error'
        },
    },
    {
        ignores: ['ios/', 'android/'],
    },
);
