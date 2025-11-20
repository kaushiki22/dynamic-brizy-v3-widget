import { ReactElement } from "react";
import { Props } from "./types";

export const Button = ({ children, onClick, disabled, backgroundColor, padding }: Props): ReactElement => (
  <button className="spin-button" style={{ backgroundColor: backgroundColor, padding: padding || '1.2rem 0.8rem' }} onClick={onClick} disabled={disabled}>
    {children}
  </button>
);
