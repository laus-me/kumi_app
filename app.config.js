export default {
    "expo": {
        "name": "Kumi",
        "slug": "kumi-app",
        "version": "1.0.0",
        "orientation": "portrait",
        "icon": "./src/assets/icon.png",
        "userInterfaceStyle": "light",
        "splash": {
            "image": "./src/assets/splash.png",
            "resizeMode": "contain",
            "backgroundColor": "#ffffff",
        },
        "updates": {
            "fallbackToCacheTimeout": 0,
        },
        "assetBundlePatterns": [
            "**/*",
        ],
        "ios": {
            "supportsTablet": true,
            "bundleIdentifier": "app.netlify.poyang.kumi",
        },
        "android": {
            "adaptiveIcon": {
                "foregroundImage": "./src/assets/adaptive-icon.png",
                "backgroundColor": "#FFFFFF",
            },
            "package": "app.netlify.poyang.kumi",
        },
        "web": {
            "favicon": "./src/assets/favicon.png",
        },
        "extra": {
            "apiBaseURL": process.env.API_BASE_URL || "https://localhost:3000",
            "eas": {
                "projectId": "6859934b-a82d-4ea6-98d9-adee2fdad74f",
            },
        },
    },
};
