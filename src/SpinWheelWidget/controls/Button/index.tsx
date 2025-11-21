import { ReactElement } from "react";
import { Props } from "./types";

export const Button = ({ children, onClick, disabled, backgroundColor, padding, spinButtonFontSize, spinButtonTextColor }: Props): ReactElement => (
  <button className="spin-button" style={{ backgroundColor: backgroundColor, padding: padding || '1.2rem 0.8rem', fontSize: `${spinButtonFontSize || 16}px`, color: spinButtonTextColor || "#fff" }} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);
