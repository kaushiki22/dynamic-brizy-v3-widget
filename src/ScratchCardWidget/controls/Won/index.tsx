import { ReactElement } from "react";
import { Props } from "./types";
import { getSpinScreenBorderWidthStyle, getSpinScreenPaddingStyle, getSpinScreenMarginStyle, getSpinScreenBorderRadiusStyle } from "../../../SpinWheelWidget/utils/BoxModalUtils";

export const Won = (props: Props): ReactElement => {
  const { data, extraProps } = props;
  const { couponCode, title } = data ?? { couponCode: '', title: '' };
  const couponBoxSize = { small: '180px', medium: '200px', large: '220px' };
  console.log("extraProps winning", { extraProps, data, props });
  return (
    // The main content card.
    <div style={{
      backgroundColor: `${extraProps?.['scratch-card-winning-card-bg-color'] || 'transparent'}`,
      padding: '15px 10px',
      borderRadius: '12px',
      textAlign: 'center',
      width: '320px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: "center"
    }}>
      {/* Gift Icon Image */}
      <div>
        <img
          src={
            extraProps && typeof extraProps['scratch-card-winning-img-imageImageSrc'] === 'string' && extraProps['scratch-card-winning-img-imageImageSrc']
              ? `https://image-staging-ap1.moengage.com/${extraProps['scratch-card-winning-img-imageImageSrc']}`
              : "https://image-staging-ap1.moengage.com/zaininappmoengage/20250813082208174819U7VY3E3667fd08188e527bc564e165889218d63e9ddb29pngzaininappmoengage.png"
          } // A festive gift box icon
          alt="Gift box prize"
          style={{
            width: '80px',
            height: '80px',
            ...getSpinScreenBorderWidthStyle(extraProps ?? {}, 'scratch-card-winning-img-border', 'scratch-card-winning-img-border-color') ,
            ...getSpinScreenPaddingStyle(extraProps ?? {}, 'scratch-card-winning-img'),
            ...getSpinScreenMarginStyle(extraProps ?? {}, 'scratch-card-winning-img')
          }}
        />
        <p style={{
          fontSize: typeof extraProps?.['scratch-card-winning-text1-fontsize'] === 'number' || typeof extraProps?.['scratch-card-winning-text1-fontsize'] === 'string'
            ? extraProps['scratch-card-winning-text1-fontsize']
            : '16px',
          color: typeof extraProps?.['scratch-card-winning-text1-fontcolor'] === 'string' ? extraProps['scratch-card-winning-text1-fontcolor'] as string : '#333',
          backgroundColor: typeof extraProps?.['scratch-card-winning-text1-bg-color'] === 'string' ? extraProps['scratch-card-winning-text1-bg-color'] as string : 'transparent',
          ...getSpinScreenBorderWidthStyle(extraProps ?? {}, 'scratch-card-winning-text1-border', 'scratch-card-winning-text1-bordercolor'),
          ...getSpinScreenPaddingStyle(extraProps ?? {}, 'scratch-card-winning-text1'),
          ...getSpinScreenBorderRadiusStyle(extraProps ?? {}, 'scratch-card-winning-text1-border-radius' ),
          ...getSpinScreenMarginStyle(extraProps ?? {}, 'scratch-card-winning-text1'),
          maxWidth: '300px',
        }}>
          {extraProps?.['scratch-card-winning-text1-title']}
          <p style={{
            fontSize: typeof extraProps?.['scratch-card-winning-text1-fontsize'] === 'number' || typeof extraProps?.['scratch-card-winning-text1-fontsize'] === 'string'
              ? extraProps['scratch-card-winning-text1-fontsize']
              : '22px',
            fontWeight: 'bold',
            color: typeof extraProps?.['scratch-card-winning-text1-fontcolor'] === 'string' ? extraProps['scratch-card-winning-text1-fontcolor'] as string : '#333',
            backgroundColor: typeof extraProps?.['winning-text1-bg-color'] === 'string' ? extraProps['winning-text1-bg-color'] as string : 'transparent',
            margin: '0 0 15px 0'
          }}>
            {title || '₹500 gift card'}
          </p>
        </p>

      </div>
      {/* The coupon code display and copy button. */}
      <div style={{
        ...getSpinScreenBorderWidthStyle(extraProps ?? {}, 'scratch-card-winning-coupon-box-border', 'scratch-card-winning-coupon-box-border-color', 'scratch-card-winning-couponbox-type'),
        ...getSpinScreenPaddingStyle(extraProps ?? {}, 'scratch-card-winning-coupon-box'),
        ...getSpinScreenBorderRadiusStyle(extraProps ?? {}, 'scratch-card-winning-coupon-box-border-radius'),
        ...getSpinScreenMarginStyle(extraProps ?? {}, 'scratch-card-winning-coupon-box'),
        display: 'flex',
        justifyContent: extraProps?.['scratch-card-winning-coupon-box-give-icon'] !== 'on' ? 'end' : 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        backgroundColor: `${extraProps?.['scratch-card-winning-coupon-box-color'] || '#f8f0ff'}`,
        width: couponBoxSize[
          (extraProps?.['scratch-card-winning-couponbox-size'] === 'small' ||
            extraProps?.['scratch-card-winning-couponbox-size'] === 'medium' ||
            extraProps?.['scratch-card-winning-couponbox-size'] === 'large')
            ? extraProps['scratch-card-winning-couponbox-size']
            : 'medium'
        ],
      }}
      >
        <span style={{
          color: `${extraProps?.['scratch-card-winning-coupon-box-fontcolor'] || '#333'}`,
          fontWeight: 'bold',
          fontSize: `${extraProps?.['scratch-card-winning-coupon-box-fontsize'] || '16'}px`,
          letterSpacing: '1px',
          margin: 0,
          marginRight: '40px'
        }}
        >
          {couponCode || 'AD_500'}
        </span>
        {/* Copy Icon Image */}
        {extraProps?.['scratch-card-winning-coupon-box-give-icon'] === 'on' &&
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={`${extraProps['scratch-card-winning-coupon-box-give-icon-color'] || '#333'}`}><path d="M0 0h24v24H0z" fill="none" /><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>
        }
      </div>
    </div>
  );
};
