import type { Meta } from "@storybook/react";

import { Toggle } from "./Toggle.tsx";

const meta = {
  title: "Toggle",
  component: Toggle,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof Toggle>;

export default meta;

export const Default = () => {
  return <Toggle />;
};
