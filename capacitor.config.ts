import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.timecapsule.app',
  appName: 'Time Capsule',
  webDir: 'dist',
  server: {
    android: {
      allowMixedContent: true,
    },
    ios: {
      contentInset: 'automatic',
    },
  },
  ios: {
    scheme: 'Time Capsule',
    contentInset: 'automatic',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#667eea',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      iosSpinnerStyle: 'small',
      spinnerColor: '#ffffff',
    },
  },
};

export default config;

