import { ReactElement } from "react";
import { Props } from "./types";
import { getSpinScreenBorderWidthStyle, getSpinScreenPaddingStyle, getSpinScreenMarginStyle, getSpinScreenBorderRadiusStyle } from "../../../SpinWheelWidget/utils/BoxModalUtils";

export const LosingScreen = (props: Props): ReactElement => {
    const { extraProps } = props;

    return (
        <div style={{
            backgroundColor: `${extraProps?.['scratch-card-losing-bg-color'] || 'transparent'}`,
            padding: '15px 10px',
            borderRadius: '12px',
            textAlign: 'center',
            width: '320px',
            margin: '0px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <img
                src={
                    extraProps && typeof extraProps['scratch-card-losing-img-imageImageSrc'] === 'string' && extraProps['scratch-card-losing-img-imageImageSrc']
                        ? `https://image-staging-ap1.moengage.com/${extraProps['scratch-card-losing-img-imageImageSrc']}`
                        : "https://image-staging-ap1.moengage.com/zaininappmoengage/20250813082112920973515LXRVectorpngzaininappmoengage.png"
                }// An empty, sad box icon
                alt="Empty box"
                 style={{
                width: '80px',
                     height: '80px',
                     ...getSpinScreenBorderWidthStyle(extraProps ?? {}, 'scratch-card-losing-img-border', 'scratch-card-losing-img-border-color'),
                     ...getSpinScreenPaddingStyle(extraProps ?? {}, 'scratch-card-losing-img'),
                     ...getSpinScreenMarginStyle(extraProps ?? {}, 'scratch-card-losing-img')
                }}
            />

            {/* The message displayed to the user. */}
            <h2 style={{
                fontSize: typeof extraProps?.['scratch-card-losing-text1-fontsize'] === 'number' || typeof extraProps?.['scratch-card-losing-text1-fontsize'] === 'string'
                    ? extraProps['scratch-card-losing-text1-fontsize']
                    : '16px',
                color: typeof extraProps?.['scratch-card-losing-text1-fontcolor'] === 'string' ? extraProps['scratch-card-losing-text1-fontcolor'] as string : '#333',
                backgroundColor: typeof extraProps?.['scratch-card-losing-text1-bg-color'] === 'string' ? extraProps['scratch-card-losing-text1-bg-color'] as string : 'transparent',
                ...getSpinScreenBorderWidthStyle(extraProps ?? {}, 'scratch-card-losing-text1-border', 'scratch-card-losing-text1-bordercolor'),
                ...getSpinScreenPaddingStyle(extraProps ?? {}, 'scratch-card-losing-text1'),
                ...getSpinScreenBorderRadiusStyle(extraProps ?? {}, 'scratch-card-losing-text1-border-radius'),
                ...getSpinScreenMarginStyle(extraProps ?? {}, 'scratch-card-losing-text1')
            }}>
                {extraProps?.['scratch-card-losing-text1-title']}
            </h2>
        </div>
    );
};
