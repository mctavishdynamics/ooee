import type { Meta } from "@storybook/react";

import { InputText } from "./InputText.tsx";

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

export const Number = () => {
  return <InputText type={"number"} />;
};
