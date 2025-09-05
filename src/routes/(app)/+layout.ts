import { SettingsNative } from '$lib/state/settings.svelte';

export const ssr = false;
export const prerender = true;

export const load = async () => {
    // initialise (populate) the settings
    const settings = new SettingsNative();
    await settings.init();

    console.debug('App layout loaded');

    return { settings };
};
