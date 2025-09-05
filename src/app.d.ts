import '../vite-env';
import type { Settings } from '$lib/state/settings.svelte';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        interface PageData {
            title: string;
            description?: string;
            settings: Settings;
        }
        // interface PageState {}
        // interface Platform {}
    }
}

export {};
