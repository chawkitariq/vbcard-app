# VBCard App

This is a React Native application that uses [VBCard API](https://github.com/chawkitariq/vbcard-api) to manage digital business cards.

## Setup (IMPORTANT)

To run the application in the best way, follow the steps below:

1. To run the application on your Windows or macOS machine, you first need to follow the [official React Native setup guide](https://reactnative.dev/docs/set-up-your-environment) to set up your environment correctly.

2. As mentioned before, the application uses the [VBCard API](https://github.com/chawkitariq/vbcard-api), so you need to start the API server in a dedicated terminal before running the application.

## Start Application

### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly, provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode, respectively.
