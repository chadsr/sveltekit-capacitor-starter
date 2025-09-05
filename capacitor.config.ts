import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.example.app',
    appName: 'Example App',
    webDir: 'build',
    plugins: {
        SplashScreen: {
            launchAutoHide: false,
            launchFadeOutDuration: 500,
            showSpinner: false,
            splashFullScreen: true,
            splashImmersive: true,
        },
    },
    ios: {
        scheme: 'Example App',
    },
    android: {},
};

export default config;
