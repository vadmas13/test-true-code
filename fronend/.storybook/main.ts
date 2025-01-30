import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  // async viteFinal(config) {
  //   const { mergeConfig } = await import('vite');
  //   return mergeConfig(config, {
  //     css: {
  //       preprocessorOptions: {
  //         scss: {
  //           additionalData: `import '../src/styles/normalize.scss'`,
  //         },
  //       },
  //     },
  //   });
  // },
};
export default config;
