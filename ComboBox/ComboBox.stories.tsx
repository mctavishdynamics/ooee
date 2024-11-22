import type { Meta } from "@storybook/react";

import { ComboBox } from "./ComboBox";
import { useState } from "react";
import { Debug } from "../Debug/Debug.tsx";

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
  const [debugMode] = useState(true);
  const [values, setValues] = useState<string[]>([
    "Online Service",
    "Development",
    "Software",
    "Utilities / Services",
    "Entertainment",
  ]);
  const [value, setValue] = useState("");

  return (
    <>
      {debugMode ? <Debug data={{ value, values }} /> : null}
      <ComboBox
        value={value}
        values={values}
        noResults="Press Enter to create"
        onCreate={(v) => setValues([v, ...values])}
        onChange={(v) => setValue(v)}
        __debug={debugMode}
      />
    </>
  );
};
