import { ReactNode } from "react";

export interface Props {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  backgroundColor?: string;
  padding?: string;
}
