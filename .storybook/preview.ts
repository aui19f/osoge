// import type { Preview } from "@storybook/nextjs-vite";
import "app/globals.css";

import { Preview } from "@storybook/nextjs-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import { Renderer } from "storybook/internal/types";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [
    withThemeByClassName<Renderer>({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
  globalTypes: {
    darkMode: {
      defaultValue: true, // Enable dark mode by default on all stories
    },
    className: {
      defaultValue: "custom-classname", // Set your custom dark mode class name
    },
  },
};
export default preview;
