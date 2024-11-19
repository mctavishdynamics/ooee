import type { Preview } from "@storybook/react";

import "@fontsource/barlow-semi-condensed/100.css";
import "@fontsource/barlow-semi-condensed/100-italic.css";
import "@fontsource/barlow-semi-condensed/200.css";
import "@fontsource/barlow-semi-condensed/200-italic.css";
import "@fontsource/barlow-semi-condensed/300.css";
import "@fontsource/barlow-semi-condensed/300-italic.css";
import "@fontsource/barlow-semi-condensed/400.css";
import "@fontsource/barlow-semi-condensed/400-italic.css";
import "@fontsource/barlow-semi-condensed/500.css";
import "@fontsource/barlow-semi-condensed/500-italic.css";
import "@fontsource/barlow-semi-condensed/600.css";
import "@fontsource/barlow-semi-condensed/600-italic.css";
import "@fontsource/barlow-semi-condensed/700.css";
import "@fontsource/barlow-semi-condensed/700-italic.css";
import "@fontsource/barlow-semi-condensed/800.css";
import "@fontsource/barlow-semi-condensed/800-italic.css";
import "@fontsource/barlow-semi-condensed/900.css";
import "@fontsource/barlow-semi-condensed/900-italic.css";

import "../ooee.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
