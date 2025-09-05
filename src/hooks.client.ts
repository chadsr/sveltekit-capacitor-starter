import * as Sentry from '@sentry/capacitor';
import * as SentrySvelteKit from '@sentry/sveltekit';
import type { ClientInit, HandleClientError } from '@sveltejs/kit';
import { SplashScreen } from '@capacitor/splash-screen';
import { ClientError } from '$lib/errors';

export const init: ClientInit = async () => {
    Sentry.init(
        {
            environment: import.meta.env.MODE,
            release: __APP_VERSION__,
            dsn: import.meta.env.VITE_SENTRY_DSN,
            tracesSampleRate: 1.0,

            // This sets the sample rate to be 10%. You may want this to be 100% while
            // in development and sample at a lower rate in production
            replaysSessionSampleRate: 0.1,

            // If the entire session is not sampled, use the below sample rate to sample
            // sessions when an error occurs.
            replaysOnErrorSampleRate: 1.0,

            // If you don't want to use Session Replay, just remove the line below:
            integrations: [
                Sentry.browserTracingIntegration(),
                Sentry.replayIntegration(),
                SentrySvelteKit.extraErrorDataIntegration(),
            ],
        },
        SentrySvelteKit.init,
    );

    // Do setup here

    await SplashScreen.hide();
};

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError: HandleClientError = SentrySvelteKit.handleErrorWithSentry(
    ({ error, message }) => {
        return {
            message: error instanceof ClientError ? error.message : message,
        };
    },
);
