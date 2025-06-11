const { getDefaultConfig } = require('@expo/metro-config')

const config = getDefaultConfig(__dirname)
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg')
config.resolver.sourceExts.push('svg')
config.resolver.unstable_conditionNames = [ 'browser', 'require', 'react-native', ]
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('expo-svg-transformer'),
}

module.exports = config