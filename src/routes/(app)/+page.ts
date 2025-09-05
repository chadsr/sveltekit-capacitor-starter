import { m } from '$lib/paraglide/messages';
import type { PageData } from './$types';

/** @type {import('./$types').PageLoad} */ export function load() {
    return {
        title: m.app_name(),
        description: 'Example App',
    } as PageData;
}
