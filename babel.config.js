module.exports = {
  presets: [
    'module:@react-native/babel-preset',
    'module:metro-react-native-babel-preset',
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
