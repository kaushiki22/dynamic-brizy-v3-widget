import { getSpinScreenMarginStyle, getSpinScreenPaddingStyle, getSpinScreenBorderWidthStyle, getSpinScreenBorderRadiusStyle } from "../../SpinWheelWidget/utils/BoxModalUtils";
import { Types } from "../types";
import { getItems } from "../utils/getItems";

// Helper function to convert style object to string
const styleToString = (style: Record<string, any>): string => {
  return Object.entries(style)
    .map(([key, value]) => {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `${kebabKey}: ${value}`;
    })
    .join('; ');
};

export const View = (props: Types): string => {
  const items = getItems(props);

  const hasWinLose = items.some(item => item.loseOption === 'on');
  const displayText = items.length > 0 ? (hasWinLose ? 'Win or Lose' : 'Prize') : 'No items configured';
  const emoji = items.length > 0 ? '🎁' : '🎫';
  const emptyText = items.length > 0 ? 'Scratch to reveal' : 'No items configured';

  const containerStyle = {
    position: "relative",
    backgroundColor: 'transparent',
    padding: '2rem',
    borderRadius: '1rem',
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    ...getSpinScreenMarginStyle(props ?? {}, 'scratch-card-default'),
  };

  const previewCardStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '400px',
    height: '300px'
  };

  const backgroundStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    borderRadius: '12px',
    overflow: 'hidden',
    zIndex: '0'
  };

  const defaultPadding = Object.entries(getSpinScreenPaddingStyle(props ?? {}, 'scratch-card-default'))
    .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`)
    .join('; ');


  const contentStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    color: '#6c757d',
    fontSize: '14px',
    fontWeight: 'bold',
  };

  return `
    <div
      id="scratchCardContainer"
      data-scratch-card-default="${getSpinScreenMarginStyle(props ?? {}, 'scratch-card-default')}"
      class="scratch-card-container"
      data-scratch-card-default-bg-color="${props?.['scratch-card-default-bg-color'] || 'transparent'}"
      data-scratch-card-default-padding="${defaultPadding}"
      data-scratch-card-box-is-form="${props?.['scratch-card-box-is-form'] || 'off'}"
      data-scratch-card-image="${props?.['scratch-card-default-imageImageSrc'] || ''}"
      data-scratch-card-winning-card-bg-color="${props?.['scratch-card-winning-card-bg-color'] || 'transparent'}"
      data-scratch-card-winning-img-imageimagesrc="${props?.['scratch-card-winning-img-imageImageSrc'] || ''}"
      data-scratch-card-winning-img-margin="${Object.entries(getSpinScreenMarginStyle(props ?? {}, 'scratch-card-winning-img')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-card-winning-img-padding="${Object.entries(getSpinScreenPaddingStyle(props ?? {}, 'scratch-card-winning-img')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-card-winning-img-border="${Object.entries(getSpinScreenBorderWidthStyle(props ?? {}, 'scratch-card-winning-img-border', 'scratch-card-winning-img-border-color')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-card-winning-text1-margin="${Object.entries(getSpinScreenMarginStyle(props ?? {}, 'scratch-card-winning-text1')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-card-winning-text1-padding="${Object.entries(getSpinScreenPaddingStyle(props ?? {}, 'scratch-card-winning-text1')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-card-winning-text1-border="${Object.entries(getSpinScreenBorderWidthStyle(props ?? {}, 'scratch-card-winning-text1-border', 'scratch-card-winning-text1-bordercolor')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-card-winning-text1-border-radius="${Object.entries(getSpinScreenBorderRadiusStyle(props ?? {}, 'scratch-card-winning-text1-border-radius')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-card-winning-coupon-box-margin="${Object.entries(getSpinScreenMarginStyle(props ?? {}, 'scratch-card-winning-coupon-box')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-card-winning-coupon-box-padding="${Object.entries(getSpinScreenPaddingStyle(props ?? {}, 'scratch-card-winning-coupon-box')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-card-winning-coupon-box-border="${Object.entries(getSpinScreenBorderWidthStyle(props ?? {}, 'scratch-card-winning-coupon-box-border', 'scratch-card-winning-coupon-box-border-color', 'scratch-card-winning-couponbox-type')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-card-winning-coupon-box-border-radius="${Object.entries(getSpinScreenBorderRadiusStyle(props ?? {}, 'scratch-card-winning-coupon-box-border-radius')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-card-winning-text1-title="${props?.['scratch-card-winning-text1-title'] || ''}"
      data-scratch-card-winning-text1-fontcolor="${props?.['scratch-card-winning-text1-fontcolor'] || '#333'}"
      data-scratch-card-winning-text1-fontsize="${props?.['scratch-card-winning-text1-fontsize'] || '16'}"
      data-scratch-card-winning-text1-bg-color="${props?.['scratch-card-winning-text1-bg-color'] || 'transparent'}"
      data-scratch-card-winning-couponbox-size="${props?.['scratch-card-winning-couponbox-size'] || 'medium'}"
      data-scratch-card-winning-couponbox-type="${props?.['scratch-card-winning-couponbox-type'] || ''}"
      data-scratch-card-winning-coupon-box-color="${props?.['scratch-card-winning-coupon-box-color'] || '#f8f0ff'}"
      data-scratch-card-winning-coupon-box-fontcolor="${props?.['scratch-card-winning-coupon-box-fontcolor'] || '#333'}"
      data-scratch-card-winning-coupon-box-fontsize="${props?.['scratch-card-winning-coupon-box-fontsize'] || '16'}"
      data-scratch-card-winning-coupon-box-give-icon="${props?.['scratch-card-winning-coupon-box-give-icon'] || 'on'}"
      data-scratch-card-winning-coupon-box-give-icon-color="${props?.['scratch-card-winning-coupon-box-give-icon-color'] || '#333'}"
      data-scratch-card-losing-bg-color="${props?.['scratch-card-losing-bg-color'] || 'transparent'}"
      data-scratch-card-losing-img-imageimagesrc="${props?.['scratch-card-losing-img-imageImageSrc'] || ''}"
      data-scratch-card-losing-text1-title="${props?.['scratch-card-losing-text1-title'] || 'Sorry, You didn\'t win anything'}"
      data-scratch-card-losing-text1-fontcolor="${props?.['scratch-card-losing-text1-fontcolor'] || '#333'}"
      data-scratch-card-losing-text1-fontsize="${props?.['scratch-card-losing-text1-fontsize'] || '16'}"
      data-scratch-card-losing-text1-bg-color="${props?.['scratch-card-losing-text1-bg-color'] || 'transparent'}"
      data-scratch-card-losing-img-margin="${Object.entries(getSpinScreenMarginStyle(props ?? {}, 'scratch-card-losing-img')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-card-losing-img-padding="${Object.entries(getSpinScreenPaddingStyle(props ?? {}, 'scratch-card-losing-img')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-card-losing-img-border="${Object.entries(getSpinScreenBorderWidthStyle(props ?? {}, 'scratch-card-losing-img-border', 'scratch-card-losing-img-border-color')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-card-losing-text1-margin="${Object.entries(getSpinScreenMarginStyle(props ?? {}, 'scratch-card-losing-text1')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-card-losing-text1-padding="${Object.entries(getSpinScreenPaddingStyle(props ?? {}, 'scratch-card-losing-text1')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-card-losing-text1-border="${Object.entries(getSpinScreenBorderWidthStyle(props ?? {}, 'scratch-card-losing-text1-border', 'scratch-card-losing-text1-bordercolor')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-losing-text1-border-radius="${Object.entries(getSpinScreenBorderRadiusStyle(props ?? {}, 'scratch-card-losing-text1-border-radius')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}"
      data-scratch-items="${JSON.stringify(items).replace(/"/g, '&quot;')}"
      style="${styleToString(containerStyle)}"
    >
      <div class="preview-card" style="${styleToString(previewCardStyle)}">
        <div style="${styleToString(backgroundStyle)}">
          <div style="${styleToString(contentStyle)}">
            <div style="text-align: center;">
              <div>${emoji}</div>
              <div>${emptyText}</div>
              <div style="font-size: 12px; margin-top: 4px;">${displayText}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
};