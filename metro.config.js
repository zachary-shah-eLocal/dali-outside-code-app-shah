const { getDefaultConfig } = require('@expo/metro-config');

// Get the default Metro config
const defaultConfig = getDefaultConfig(__dirname);

// Destructure assetExts and sourceExts from the resolver
const { assetExts, sourceExts } = defaultConfig.resolver;

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
  },
};

// Merge the custom config with the default config manually
const mergedConfig = {
  ...defaultConfig,
  transformer: {
    ...defaultConfig.transformer,
    ...config.transformer,
  },
  resolver: {
    ...defaultConfig.resolver,
    ...config.resolver,
  },
};

module.exports = mergedConfig;
