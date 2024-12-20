import type { Meta } from "@storybook/react";

import { ComboBox } from "./ComboBox.tsx";
import { useState } from "react";
import { Debug } from "../Debug/Debug.tsx";
import { Button } from "../Button/Button.tsx";

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

const DEFAULT_VALUES = [
  "Online Service",
  "Development",
  "Software",
  "Utilities / Services",
  "Entertainment",
];

export const Default = () => {
  const [debugMode] = useState(false);
  const [values, setValues] = useState<string[]>(DEFAULT_VALUES);
  const [value, setValue] = useState("");

  return (
    <>
      {debugMode ? (
        <>
          <Button
            onClick={() => {
              if (values.length) {
                setValues([]);
              } else {
                setValues(DEFAULT_VALUES);
              }
            }}
          >
            Toggle Empty
          </Button>
          <Debug data={{ value, values }} />{" "}
        </>
      ) : null}
      <ComboBox
        value={value}
        values={values}
        onCreate={(v) => setValues([v, ...values])}
        onChange={(v) => setValue(v)}
        enableCreation={true}
        __debug={debugMode}
      />
    </>
  );
};
