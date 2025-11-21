import React, { ReactElement } from "react";
import { Props } from "./types";
import { getSpinScreenMarginStyle, getSpinScreenPaddingStyle, getSpinScreenBorderWidthStyle, getSpinScreenBorderRadiusStyle } from '../../utils/BoxModalUtils';
import { getImageKitUrl } from "../../utils/ImageKitUtil";

export const LosingScreen = (props: Props): ReactElement => {
    const { message, extraProps } = props;
    const defaultMessage = "Sorry, You didn't win anything";
    return (
        // The main content card, styled similarly to the winning screen.
        <div style={{
            backgroundColor: 'white',
            padding: '15px 10px', // More vertical padding to balance the layout
            borderRadius: '12px',
            textAlign: 'center',
            width: '270px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            margin: '0px', // Center the component for demonstration
            fontFamily: 'Arial, sans-serif',
        }}>
            {/* Icon representing "not winning" */}
            <img
                src={
                    extraProps && typeof extraProps['losing-img-imageImageSrc'] === 'string' && extraProps['losing-img-imageImageSrc']
                        ? `${getImageKitUrl()}/${extraProps['losing-img-imageImageSrc']}`
                        : "https://campaign-assets-pp.moengage.com/inbound/inapp/html_inapp/campaigns/zain_inapp/17522326677815583_r7jgi7/17522337977649086_mrli8k/assets/1752234344573518_msc/loose-icon.png"
                }// An empty, sad box icon
                alt="Empty box"
                 style={{
                width: '80px',
                height: '80px',
                ...getSpinScreenMarginStyle(extraProps ?? {}, 'losing-img'),
                ...getSpinScreenPaddingStyle(extraProps ?? {}, 'losing-img'),
                ...getSpinScreenBorderWidthStyle(extraProps ?? {}, 'losing-img-border', 'losing-img-border-color'),
                }}
            />

            {/* The message displayed to the user. */}
            <h2 style={{
                fontSize: typeof extraProps?.['losing-text1-fontsize'] === 'number' || typeof extraProps?.['losing-text1-fontsize'] === 'string'
                    ? extraProps['losing-text1-fontsize']
                            : undefined,
                color: typeof extraProps?.['losing-text1-fontcolor'] === 'string' ? extraProps['losing-text1-fontcolor'] as string : undefined,
                backgroundColor: typeof extraProps?.['losing-text1-bg-color'] === 'string' ? extraProps['losing-text1-bg-color'] as string : undefined,
                ...getSpinScreenMarginStyle(extraProps ?? {}, 'losing-text1'),
                ...getSpinScreenPaddingStyle(extraProps ?? {}, 'losing-text1'),
                ...getSpinScreenBorderWidthStyle(extraProps ?? {}, 'losing-text1-border', 'losing-text1-bordercolor'),
                ...getSpinScreenBorderRadiusStyle(extraProps ?? {}, 'losing-text1-border-radius'),
                maxWidth: '300px',
            }}>
                {message || defaultMessage}
            </h2>
        </div>
    );
};