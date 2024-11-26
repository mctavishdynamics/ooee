import type { Meta } from "@storybook/react";

import { PopupColorPicker } from "./PopupColorPicker.tsx";
import { Button } from "../Button/Button.tsx";
import { useState } from "react";

const meta = {
  title: "PopupColorPicker",
  component: PopupColorPicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof PopupColorPicker>;

export default meta;

export const Default = () => {
  const [color, setColor] = useState("#f00");

  return (
    <PopupColorPicker
      mode={"hex"}
      onChange={(newColor) => {
        setColor(newColor);
      }}
    >
      {(isOpened, setIsOpened) => {
        return (
          <div style={{ display: "flex" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                backgroundColor: color,
              }}
            />
            <Button
              onClick={() => {
                setIsOpened((isOpened) => !isOpened);
              }}
            >
              {isOpened ? "Close" : "Open"}
            </Button>
          </div>
        );
      }}
    </PopupColorPicker>
  );
};
