import { ReactElement } from "react";
import { getSpinScreenMarginStyle, getSpinScreenPaddingStyle, getSpinScreenBorderWidthStyle } from '../../utils/BoxModalUtils'
import { Props } from "./types";

export const Wrapper = ({ children, extraProps }: Props): ReactElement => <div className="spin-wheel-container"
    style={{
    ...getSpinScreenMarginStyle(extraProps ?? {}, 'spin-screen'),
    ...getSpinScreenPaddingStyle(extraProps ?? {}, 'spin-screen'),
    ...getSpinScreenBorderWidthStyle(extraProps ?? {}, 'spin-screen-border', 'default-border-color')
}}>{children}</div>;
