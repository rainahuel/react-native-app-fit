export default {
  name: "Built by Rain",
  slug: "my-fitness-app-new",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "builtbyrain", 
  userInterfaceStyle: "dark",
  newArchEnabled: true,
  splash: {
    image: "./assets/images/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#121212"
  },
  assetBundlePatterns: [
    "**/*"
  ],
  ios: {
    supportsTablet: false,
    bundleIdentifier: "com.rainahuel.builtbyrain",
    buildNumber: "2",
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false
    }
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#121212"
    },
    edgeToEdgeEnabled: true,
    package: "com.rainahuel.builtbyrain",
    versionCode: 1
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "expo-router"
  ],
  experiments: {
    typedRoutes: true
  },
  extra: {
    eas: {
      projectId: "e5561575-ccb3-48d1-86d9-3e12ecc9342f"
    }
  },
  owner: "rainahuel",
  updates: {
    fallbackToCacheTimeout: 0,
    url: "https://u.expo.dev/e5561575-ccb3-48d1-86d9-3e12ecc9342f"
  },
  runtimeVersion: {
    policy: "sdkVersion"
  }
};