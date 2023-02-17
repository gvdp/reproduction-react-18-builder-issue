const path = require('node:path');
const { mergeConfig } = require('vite');

module.exports = {
  framework: '@storybook/react',
  stories: ['../stories/**/*.stories.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-essentials'],
  core: {
    builder: '@storybook/builder-vite',
    // we don't want to muck up the data when we're working on the builder
    disableTelemetry: true,
  },
  features: {
    storyStoreV7: true,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      // because rollup does not respect NODE_PATH, and we have a funky example setup that needs it
      build: {
        rollupOptions: {
          plugins: {
            resolveId(code) {
              if (code === 'React') return path.resolve(require.resolve('react'));
            },
          },
        },
      },
    });
  },
};
