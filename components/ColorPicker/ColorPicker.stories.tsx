import type { Meta } from "@storybook/react";

import { ColorPicker } from "./ColorPicker.tsx";
import { useState } from "react";
import { Button } from "../Button/Button.tsx";

const meta = {
  title: "ColorPicker",
  component: ColorPicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof ColorPicker>;

export default meta;

export const RGB = () => {
  return <ColorPicker mode={"rgb"} />;
};

export const RGBString = () => {
  return <ColorPicker mode={"rgbString"} />;
};

export const RGBA = () => {
  return <ColorPicker mode={"rgba"} />;
};

export const RGBAString = () => {
  return <ColorPicker mode={"rgbaString"} />;
};

export const Hex = () => {
  const [color, setColor] = useState("#0f0");

  return (
    <>
      {color}
      <Button
        onClick={() => {
          setColor("#f00");
        }}
      >
        Set to Red
      </Button>
      <Button
        onClick={() => {
          setColor("#0ff");
        }}
      >
        Set to Cyan
      </Button>
      <ColorPicker
        color={color}
        mode={"hex"}
        colorSwatches={["#f00", "#0f0", "#00f"]}
        onChange={setColor}
      />
    </>
  );
};

export const HexAlpha = () => {
  return <ColorPicker mode={"hexAlpha"} />;
};

export const HexInput = () => {
  return <ColorPicker mode={"hexInput"} />;
};

export const HSL = () => {
  return <ColorPicker mode={"hsl"} />;
};

export const HSLString = () => {
  return <ColorPicker mode={"hslString"} />;
};

export const HSLA = () => {
  return <ColorPicker mode={"hsla"} />;
};

export const HSLAString = () => {
  return <ColorPicker mode={"hslaString"} />;
};

export const HSV = () => {
  return <ColorPicker mode={"hsv"} />;
};

export const HSVString = () => {
  return <ColorPicker mode={"hsvString"} />;
};

export const HSVA = () => {
  return <ColorPicker mode={"hsva"} />;
};

export const HSVAString = () => {
  return <ColorPicker mode={"hsvaString"} />;
};
