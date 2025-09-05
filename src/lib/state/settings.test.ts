import { expect, describe, test } from 'vitest';
import { SettingsNative } from './settings.svelte';

describe('SettingsNative', () => {
    test('SettingsNative throws if not initialized', async () => {
        const settings = new SettingsNative();
        await expect(settings.reset()).rejects.toThrowError('Settings not initialised');
    });
    test('SettingsNative implements reset', async () => {
        const settings = new SettingsNative();
        await settings.init();
        await settings.reset();
    });

    test('SettingsNative implements setLocale', async () => {
        const settings = new SettingsNative();
        await settings.init();
        await settings.setLocale('en');
    });
});
