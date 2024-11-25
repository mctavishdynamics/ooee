import type { Meta } from "@storybook/react";

import { ColorPicker } from "./ColorPicker.tsx";

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
  return <ColorPicker mode={"hex"} />;
};

export const HexAlpha = () => {
  return <ColorPicker mode={"hexAlpha"} />;
};

export const HexInput = () => {
  return <ColorPicker mode={"hexInput"} />;
};

export const Hsl = () => {
  return <ColorPicker mode={"hsl"} />;
};

export const HslString = () => {
  return <ColorPicker mode={"hslString"} />;
};

export const Hsla = () => {
  return <ColorPicker mode={"hsla"} />;
};

export const HslaString = () => {
  return <ColorPicker mode={"hslaString"} />;
};

export const Hsv = () => {
  return <ColorPicker mode={"hsv"} />;
};

export const HsvString = () => {
  return <ColorPicker mode={"hsvString"} />;
};

export const Hsva = () => {
  return <ColorPicker mode={"hsva"} />;
};

export const HsvaString = () => {
  return <ColorPicker mode={"hsvaString"} />;
};
