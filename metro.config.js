const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Disable source maps and symbolic to prevent CORS/extension issues
config.project.unstable_conditionNames = ['browser', 'require'];

// Disable source maps generation
config.transformer = {
  ...config.transformer,
  minifierConfig: {
    keep_classnames: true,
    keep_fnames: true,
  },
};

module.exports = config;
