import type { Meta } from "@storybook/react";

import { ComboBox } from "./ComboBox";
import { InputText } from "../InputText/InputText";

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
