import type { PageData } from './$types';

/** @type {import('./$types').PageLoad} */ export function load() {
    return {
        title: 'SSR Example',
        description: 'An example page pre-rendered with SSR.',
    } as PageData;
}
