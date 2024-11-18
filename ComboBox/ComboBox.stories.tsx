import type { Meta } from "@storybook/react";

import { ComboBox } from "./ComboBox";

const meta = {
  title: "ComboBox",
  component: ComboBox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof ComboBox>;

export default meta;

export const Default = () => {
  return <ComboBox />;
};
