import { getContext, hasContext, setContext, tick } from 'svelte';
import { z, ZodError } from 'zod';
import {
    getLocale as getParaglideLocale,
    locales,
    overwriteGetLocale,
    overwriteSetLocale,
    setLocale as setParaglideLocale,
    type Locale,
} from '$lib/paraglide/runtime';
import { Preferences } from '@capacitor/preferences';

const CONTEXT_KEY_SETTINGS: unique symbol = Symbol('settings');

const PREFS_GROUP_KEY = 'app';
const PREFS_SETTINGS_KEY = 'settings';

const SettingsDataSchema = z.object({
    locale: z.enum(locales),
});
export type SettingsData = z.infer<typeof SettingsDataSchema>;

const defaultSettingsData: SettingsData = {
    locale: getParaglideLocale(),
};

export abstract class Settings {
    state: SettingsData;

    constructor() {
        this.state = defaultSettingsData;
    }

    /**
     * Sets the locale (language) setting.
     */
    async setLocale(locale: Locale) {
        throw new Error(
            `Method 'setLocale()' must be implemented to change locale to '${locale}'.`,
        );
    }

    /**
     * Resets the settings store.
     */
    async reset() {
        throw new Error(`Method 'reset()' must be implemented.`);
    }
}

export class SettingsNative implements Settings {
    #init: boolean = false;
    #state: SettingsData = $state(defaultSettingsData);

    private static async getSettingsFromPrefs(): Promise<SettingsData | null> {
        const res = await Preferences.get({ key: PREFS_SETTINGS_KEY });
        if (!res.value) return null;

        const resJson = JSON.parse(res.value);
        const parsed = SettingsDataSchema.safeParse(resJson);
        // If the settings value did not parse
        if (!parsed.success) {
            throw parsed.error;
        }

        return parsed.data;
    }

    private static async storeSettingsToPrefs(settingsData: SettingsData) {
        const settingsStr = JSON.stringify(settingsData);
        await Preferences.set({ key: PREFS_SETTINGS_KEY, value: settingsStr });
    }

    async init() {
        if (this.#init) {
            console.warn('Settings already initialised');
            return;
        }

        // set custom preferences group key
        await Preferences.configure({ group: PREFS_GROUP_KEY });

        let settings = null;
        try {
            settings = await SettingsNative.getSettingsFromPrefs();
        } catch (e) {
            if (e instanceof ZodError) {
                console.warn('Could not parse saved settings', e);
            } else {
                throw e;
            }
        }

        if (settings) {
            // settings existed, so update the state
            this.#state = settings;
        } else {
            // no settings are found/parsed, so we are using defaultSettings from field declaration
            // no need to store to preferences until something beyond defaults is set
            console.debug('No valid settings found. Using defaults.');
        }

        this.#init = true;

        setParaglideLocale(this.#state.locale);

        overwriteGetLocale(() => {
            return this.#state.locale;
        });

        overwriteSetLocale(async (locale) => {
            await this.setLocale(locale);
        });

        console.debug('Settings initialised');
    }

    get state(): SettingsData {
        if (!this.#init) {
            throw new Error('Settings not initialised');
        }
        return this.#state;
    }

    async setLocale(locale: Locale) {
        if (!this.#init) throw new Error('Settings not initialised');

        await tick();

        if (locale !== this.#state.locale) {
            this.#state.locale = locale;
            await SettingsNative.storeSettingsToPrefs(this.#state);
        }
    }

    async reset() {
        if (!this.#init) throw new Error('Settings not initialised');

        await tick();
        this.#state = defaultSettingsData;
        await Preferences.clear();
    }
}

export const hasSettingsContext = () => {
    return hasContext(CONTEXT_KEY_SETTINGS);
};

export const setSettingsContext = (settings: Settings) => {
    setContext(CONTEXT_KEY_SETTINGS, settings);
};

export const getSettingsContext = (): Settings => {
    if (!hasSettingsContext()) {
        throw new Error('No settings found in context');
    }

    return getContext<Settings>(CONTEXT_KEY_SETTINGS);
};
