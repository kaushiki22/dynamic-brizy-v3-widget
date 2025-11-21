import { ReactElement } from "react";
import { Props } from "./types";
import { getSpinScreenMarginStyle, getSpinScreenPaddingStyle, getSpinScreenBorderWidthStyle, getSpinScreenBorderRadiusStyle } from '../../utils/BoxModalUtils'

export const Won = (props: Props): ReactElement => {
  const { data, extraProps } = props;
  const { couponCode, title } = data ?? { score: '', title: '' };
  const couponBoxSize = { small: '180px', medium: '200px', large: '220px' };
  
  return (
    // The main content card.
    <div style={{
      backgroundColor: `${extraProps?.['winning-coupon-box-bg-color']}`,
      padding: '15px 10px',
      borderRadius: '12px',
      textAlign: 'center',
      width: '270px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: "center"
    }}>
      {/* Gift Icon Image */}
      <div>
        <img
          src={
            extraProps && typeof extraProps['winning-img-imageImageSrc'] === 'string' && extraProps['winning-img-imageImageSrc']
              ? `https://image-staging-ap1.moengage.com/${extraProps['winning-img-imageImageSrc']}`
              : "https://cdn.moengage.com/inapp/html-template5/assets/img/win-icon.png"
          } // A festive gift box icon
          alt="Gift box prize"
          style={{
            width: '80px',
            height: '80px',
            ...getSpinScreenMarginStyle(extraProps ?? {}, 'winning-img'),
            ...getSpinScreenPaddingStyle(extraProps ?? {}, 'winning-img'),
            ...getSpinScreenBorderWidthStyle(extraProps ?? {}, 'winning-img-border', 'winning-img-border-color', ''),
          }}
        />
        <p style={{
          fontSize: typeof extraProps?.['winning-text1-fontsize'] === 'number' || typeof extraProps?.['winning-text1-fontsize'] === 'string'
            ? extraProps['winning-text1-fontsize']
            : undefined,
          color: typeof extraProps?.['winning-text1-fontcolor'] === 'string' ? extraProps['winning-text1-fontcolor'] as string : undefined,
          backgroundColor: typeof extraProps?.['winning-text1-bg-color'] === 'string' ? extraProps['winning-text1-bg-color'] as string : undefined,
          ...getSpinScreenMarginStyle(extraProps ?? {}, 'winning-text1'),
          ...getSpinScreenPaddingStyle(extraProps ?? {}, 'winning-text1'),
          ...getSpinScreenBorderWidthStyle(extraProps ?? {}, 'winning-text1-border', 'winning-text1-bordercolor'),
          ...getSpinScreenBorderRadiusStyle(extraProps ?? {}, 'winning-text1-border-radius'),
          maxWidth: '300px',
        }}>
          {extraProps?.['winning-text1-title']}
        </p>
        <p style={{
          fontSize: '22px',
          fontWeight: 'bold',
          color: '#222',
          margin: '10px 0'
        }}>
          {title || '20% OFF'}
        </p>

      </div>
      {/* The coupon code display and copy button. */}
      <div style={{
        borderRadius: '8px',
        padding: '12px',
        display: 'flex',
        justifyContent: extraProps?.['winning-coupon-box-give-icon'] !== 'on' ? 'center' : 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        backgroundColor:`${extraProps?.['winning-coupon-box-color']}`,
        transition: 'background-color 0.3s',
        width: couponBoxSize[
          (extraProps?.['winning-couponbox-size'] === 'small' ||
            extraProps?.['winning-couponbox-size'] === 'medium' ||
            extraProps?.['winning-couponbox-size'] === 'large')
            ? extraProps['winning-couponbox-size']
            : 'medium'
        ],
        ...getSpinScreenMarginStyle(extraProps ?? {}, 'winning-coupon-box'),
        ...getSpinScreenPaddingStyle(extraProps ?? {}, 'winning-coupon-box'),
        ...getSpinScreenBorderWidthStyle(extraProps ?? {}, 'winning-coupon-box-border', 'winning-coupon-box-border-color', 'winning-couponbox-type'),
        ...getSpinScreenBorderRadiusStyle(extraProps ?? {}, 'winning-coupon-box-border-radius')
      }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#E6D4F7'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F8F0FF'}
      >
        <span style={{
          color: `${extraProps?.['winning-coupon-box-fontcolor']}`,
          fontWeight: 'bold',
          fontSize: `${extraProps?.['winning-coupon-box-fontsize']}px`,
          letterSpacing: '1px',
          margin: 0,
          marginRight: extraProps?.['winning-coupon-box-give-icon'] === 'on' ? '40px' : '0px'
        }}
        >
          {couponCode || 'KIWI_100'}
        </span>
        {/* Copy Icon Image */}
        {extraProps?.['winning-coupon-box-give-icon'] === 'on' &&
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={`${extraProps['winning-coupon-box-give-icon-color']}`}><path d="M0 0h24v24H0z" fill="none" /><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>
        }
      </div>
      <p style={{
        fontSize: typeof extraProps?.['winning-text2-fontsize'] === 'number' || typeof extraProps?.['winning-text2-fontsize'] === 'string'
          ? extraProps['winning-text2-fontsize']
          : undefined,
        color: typeof extraProps?.['winning-text2-fontcolor'] === 'string' ? extraProps['winning-text2-fontcolor'] as string : undefined,
        backgroundColor: typeof extraProps?.['winning-text2-bg-color'] === 'string' ? extraProps['winning-text2-bg-color'] as string : undefined,
        ...getSpinScreenMarginStyle(extraProps ?? {}, 'winning-text2'),
        ...getSpinScreenPaddingStyle(extraProps ?? {}, 'winning-text2'),
        ...getSpinScreenBorderWidthStyle(extraProps ?? {}, 'winning-text2-border', 'winning-text2-bordercolor'),
        ...getSpinScreenBorderRadiusStyle(extraProps ?? {}, 'winning-text2-border-radius'),
        maxWidth: '300px',
      }}>
        {extraProps?.['winning-text2-title']}
      </p>
    </div>
  );
};
