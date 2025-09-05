import * as Sentry from '@sentry/sveltekit';
import { sequence } from '@sveltejs/kit/hooks';
import type { Handle, HandleServerError } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server';

Sentry.init({
    environment: import.meta.env.MODE,
    release: __APP_VERSION__,
    dsn: import.meta.env.VITE_SENTRY_DSN,
    tracesSampleRate: 1,
});

// creating a handle to use the paraglide middleware
const paraglideHandle: Handle = ({ event, resolve }) =>
    paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
        event.request = localizedRequest;
        return resolve(event, {
            transformPageChunk: ({ html }) => {
                return html.replace('%lang%', locale);
            },
        });
    });

// add your own hooks as part of the sequence here
export const handle = sequence(Sentry.sentryHandle(), paraglideHandle);
export const handleError: HandleServerError = Sentry.handleErrorWithSentry();
