import React from "react";
import { Props } from "../types";
import { getItems } from "../utils/getItems";
import { wheelSize, wheelPointerConfig, radicalDistanse } from '../constant/spinWheelConstant';
import { getSpinScreenMarginStyle, getSpinScreenPaddingStyle, getSpinScreenBorderWidthStyle, getSpinScreenBorderRadiusStyle } from '../utils/BoxModalUtils';

export const View = (props: Props): React.ReactElement => {
  const items = getItems(props);

  // Generate static HTML structure for Preview Mode
  const sectorAngle = 360 / items.length;
  const gradient = items
    .map((item, index) => {
      const color = item.sectorColor || (index % 2 === 0 ? "#FCD34D" : "#93C5FD");
      const start = sectorAngle * index;
      const end = start + sectorAngle;
      return `${color} ${start}deg ${end}deg`;
    })
    .join(", ");

  // Get pointer configuration
  const pointerSizeKey = props?.["Wheel-pointer-size"] || "medium";
  const pointerPositionKey = props?.["pointer-position"] || "top";
  const pointerConfig = wheelPointerConfig[pointerSizeKey]?.[pointerPositionKey] || wheelPointerConfig["medium"]["top"];
  const wheelSizeValue = wheelSize[pointerSizeKey] || wheelSize["medium"];
  const radialVal = radicalDistanse[pointerSizeKey] || 0.6;
  return (
    <div 
      id="spinWheelContainer"
      className="spin-wheel-container" 
      data-pointer-position={pointerPositionKey}
      data-spin-wheel-box-is-form={props?.['spin-wheel-box-is-form'] || 'off'}
      data-winning-img-imageImageSrc={props?.['winning-img-imageImageSrc'] || ''}
      data-winning-text1-title={props?.['winning-text1-title'] || 'Congratulations, you won'}
      data-winning-text1-fontcolor={props?.['winning-text1-fontcolor'] || '#333'}
      data-winning-text1-fontsize={props?.['winning-text1-fontsize'] || '16'}
      data-winning-text1-bg-color={props?.['winning-text1-bg-color'] || 'transparent'}
      data-winning-text2-title={props?.['winning-text2-title'] || 'copy this code and use during checkout'}
      data-winning-text2-fontcolor={props?.['winning-text2-fontcolor'] || '#666'}
      data-winning-text2-fontsize={props?.['winning-text2-fontsize'] || '14'}
      data-winning-text2-bg-color={props?.['winning-text2-bg-color'] || 'transparent'}
      data-winning-couponbox-size={props?.['winning-couponbox-size'] || 'medium'}
      data-winning-couponbox-type={props?.['winning-couponbox-type'] || ''}
      data-winning-coupon-box-color={props?.['winning-coupon-box-color'] || '#f8f0ff'}
      data-winning-coupon-box-fontcolor={props?.['winning-coupon-box-fontcolor'] || '#333'}
      data-winning-coupon-box-fontsize={props?.['winning-coupon-box-fontsize'] || '16'}
      data-winning-coupon-box-bg-color={props?.['winning-coupon-box-bg-color'] || 'white'}
      data-winning-coupon-box-give-icon={props?.['winning-coupon-box-give-icon'] || 'on'}
      data-winning-coupon-box-give-icon-color={props?.['winning-coupon-box-give-icon-color'] || '#333'}
      data-winning-img-margin={Object.entries(getSpinScreenMarginStyle(props ?? {}, 'winning-img')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-winning-img-padding={Object.entries(getSpinScreenPaddingStyle(props ?? {}, 'winning-img')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-winning-img-border={Object.entries(getSpinScreenBorderWidthStyle(props ?? {}, 'winning-img-border', 'winning-img-border-color')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-winning-text1-margin={Object.entries(getSpinScreenMarginStyle(props ?? {}, 'winning-text1')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-winning-text1-padding={Object.entries(getSpinScreenPaddingStyle(props ?? {}, 'winning-text1')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-winning-text1-border={Object.entries(getSpinScreenBorderWidthStyle(props ?? {}, 'winning-text1-border', 'winning-text1-bordercolor')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-winning-text2-margin={Object.entries(getSpinScreenMarginStyle(props ?? {}, 'winning-text2')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-winning-text2-padding={Object.entries(getSpinScreenPaddingStyle(props ?? {}, 'winning-text2')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-winning-text2-border={Object.entries(getSpinScreenBorderWidthStyle(props ?? {}, 'winning-text2-border', 'winning-text2-bordercolor')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-winning-coupon-box-margin={Object.entries(getSpinScreenMarginStyle(props ?? {}, 'winning-coupon-box')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-winning-coupon-box-padding={Object.entries(getSpinScreenPaddingStyle(props ?? {}, 'winning-coupon-box')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-winning-coupon-box-border={Object.entries(getSpinScreenBorderWidthStyle(props ?? {}, 'winning-coupon-box-border', 'winning-coupon-box-border-color', 'winning-couponbox-type')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-winning-coupon-box-border-radius={Object.entries(getSpinScreenBorderRadiusStyle(props ?? {}, 'winning-coupon-box-border-radius')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-winning-text1-border-radius={Object.entries(getSpinScreenBorderRadiusStyle(props ?? {}, 'winning-text1-border-radius')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-winning-text2-border-radius={Object.entries(getSpinScreenBorderRadiusStyle(props ?? {}, 'winning-text2-border-radius')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-losing-img-imageImageSrc={props?.['losing-img-imageImageSrc'] || ''}
      data-losing-text1-title={props?.['losing-text1-title'] || 'Sorry, You didn\'t win anything'}
      data-losing-text1-fontcolor={props?.['losing-text1-fontcolor'] || '#dc2626'}
      data-losing-text1-fontsize={props?.['losing-text1-fontsize'] || '22'}
      data-losing-text1-bg-color={props?.['losing-text1-bg-color'] || 'transparent'}
      data-losing-img-margin={Object.entries(getSpinScreenMarginStyle(props ?? {}, 'losing-img')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-losing-img-padding={Object.entries(getSpinScreenPaddingStyle(props ?? {}, 'losing-img')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-losing-img-border={Object.entries(getSpinScreenBorderWidthStyle(props ?? {}, 'losing-img-border', 'losing-img-border-color')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-losing-text1-margin={Object.entries(getSpinScreenMarginStyle(props ?? {}, 'losing-text1')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-losing-text1-padding={Object.entries(getSpinScreenPaddingStyle(props ?? {}, 'losing-text1')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-losing-text1-border={Object.entries(getSpinScreenBorderWidthStyle(props ?? {}, 'losing-text1-border', 'losing-text1-bordercolor')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      data-losing-text1-border-radius={Object.entries(getSpinScreenBorderRadiusStyle(props ?? {}, 'losing-text1-border-radius')).map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`).join('; ')}
      style={{
        position: "relative",
        backgroundColor: props?.['default-bg-color'] || 'transparent',
        padding: '2rem',
        borderRadius: '1rem',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        ...getSpinScreenMarginStyle(props ?? {}, 'spin-screen'),
        ...getSpinScreenPaddingStyle(props ?? {}, 'spin-screen'),
        ...getSpinScreenBorderWidthStyle(props ?? {}, 'spin-screen-border', 'default-border-color'),
      }}
    >
      <div style={{ position: 'relative', margin: '0 auto' }}>
        {/* Wheel */}
        <div 
          className="spin-wheel" 
          style={{
            aspectRatio: "1 / 1",
            borderRadius: "50%",
            background: `conic-gradient(${gradient})`,
            position: "relative",
            margin: "0 auto",
            width: wheelSizeValue,
            height: wheelSizeValue,
          }}
        >
          {items.map((item, index) => {
            const rotation = sectorAngle * index + sectorAngle / 2;
            const wheelRadius = parseInt(wheelSizeValue) / 2;
            const distanceFromCenter = wheelRadius * radialVal;
            const imageSize = wheelRadius / 4;
            // Responsive font size based on wheel size
            const fontSize = item.fontSize || Math.max(10, wheelRadius / 15);
            
            return (
              <div
                key={index}
                className="wheel-item"
                data-score={item.score}
                data-lose-option={item.loseOption}
                data-title={item.title}
                data-coupon-code={item.couponCode}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `
                    translateX(-50%) translateY(-50%)
                    rotate(${rotation}deg)
                    translateY(-${distanceFromCenter}px)
                    rotate(${item.image ? '0' : '-90'}deg)
                  `,
                  transformOrigin: "center",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "max-content",
                  color: item.fontColor || "#ffffff",
                  fontSize: fontSize,
                  fontWeight: "bold",
                  lineHeight: 1.2,
                  pointerEvents: "none",
                  whiteSpace: "nowrap",
                  flexDirection: item?.image ? 'column-reverse' : 'unset',
                }}
              >
                {item.image && (
                  <div>
                    <img
                      src={`https://image-staging-ap1.moengage.com/${item.image}`}
                      alt={item.title}
                      style={{
                        width: imageSize,
                        height: imageSize,
                        marginBottom: '8px',
                        objectFit: 'contain',
                      }}
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                )}
                {item.title}
              </div>
            );
          })}
        </div>

        {/* Pointer */}
        <div
          className="pointer"
          style={{
            position: "absolute",
            top: pointerConfig.top,
            left: pointerConfig.left,
            transform: pointerConfig.translate,
            width: wheelPointerConfig[pointerSizeKey].size,
            height: wheelPointerConfig[pointerSizeKey].size,
            backgroundColor: props?.['default-pointer-color'] || "#ef4444",
            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
            zIndex: 10,
          }}
        />

        {/* Spin button */}
        <button 
          className="spin-button"
          style={{
            padding: `${props?.['spin-wheel-box-is-form'] === 'on' ? '0.8rem 0.8rem' : '1.2rem 0.8rem'}`,
            fontSize: "1rem",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: props?.['default-spin-btn-color'] || "#ef4444",
            border: "none",
            borderRadius: "2rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {props?.['spin-wheel-box-is-form'] === 'on' ? "" : props?.['default-spin-btn-text'] || "Spin"}
        </button>
      </div>

      {/* Result display area */}
      <div className="result" style={{ display: "none", marginTop: "1rem" }}></div>
    </div>
  );
};