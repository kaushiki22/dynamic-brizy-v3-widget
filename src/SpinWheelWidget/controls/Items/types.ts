import { CSSProperties } from "react";

export interface Props {
  items: Array<{
    fontColor: string;
    fontSize: number;
    score: number;
    title: string;
    couponCode: string;
    sectorColor: string,
    image: string,
    loseOption: string
}>;
  style?: CSSProperties;
  onSpinStart?: () => void;
  spinning?: boolean;
  extraProps?: {
    "Wheel-pointer-size"?: "small" | "medium" | "large",
    [key: string]: unknown,
    "pointer-position"?: "top" | "bottom" | "left" | "right",
    "default-bg-color"?: string,
    "default-border-color"?: string,
    "spin-wheel-box-is-form"?: string
  };

}
