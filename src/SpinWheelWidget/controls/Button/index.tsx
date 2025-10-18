import { ReactElement } from "react";
import { Props } from "./types";

export const Button = ({ children, onClick, disabled, backgroundColor }: Props): ReactElement => (
  <button className="spin-button" style={{ backgroundColor: backgroundColor }}    onClick = { onClick } disabled={disabled}>
    {children}
  </button>
);
