import type { Meta } from "@storybook/react";

import { Button } from "./Button";

const meta = {
  title: "Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof Button>;

export default meta;

export const Default = () => {
  return <Button>Hello World</Button>;
};
