import type { Meta } from "@storybook/react";

import { InputText } from "./InputText";

const meta = {
  title: "InputText",
  component: InputText,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof InputText>;

export default meta;

export const Default = () => {
  return <InputText />;
};
