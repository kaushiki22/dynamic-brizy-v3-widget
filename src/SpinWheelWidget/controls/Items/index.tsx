import React, { useRef, useEffect, useState } from "react";
import { Button } from "../Button";
import { Props } from "./types";
import { getSpinScreenMarginStyle, getSpinScreenPaddingStyle, getSpinScreenBorderWidthStyle } from '../../utils/BoxModalUtils'
import { wheelSize, wheelPointerConfig, radicalDistanse } from '../../constant/spinWheelConstant'

export const Items = (props: Props): React.ReactElement => {
  const { items, spinning, onSpinStart, style, extraProps  } = props;

  const wheelRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    if (wheelRef.current) {
      console.log('wheelRef.current.offsetWidth', {wheelRef});
      setRadius(wheelRef.current.offsetWidth / 2);
    }
  }, [items.length, style?.width, style?.height]);

  if (!items || items.length === 0) {
    return (
      <div>
        No spin wheel options configured. Please go to the toolbar and set the number of spin wheels you need.
      </div>
    );
  }

  const sectorAngle = 360 / items.length;

  const gradient = items
    .map((item, index) => {
      const color = item.sectorColor || (index % 2 === 0 ? "#FCD34D" : "#93C5FD");
      const start = sectorAngle * index;
      const end = start + sectorAngle;
      return `${color} ${start}deg ${end}deg`;
    })
    .join(", ");
  
  const pointerSizeKey =
    extraProps && typeof extraProps["Wheel-pointer-size"] === "string"
      ? extraProps["Wheel-pointer-size"]
      : "medium";
  const pointerPositionKey =
    extraProps && typeof extraProps["pointer-position"] === "string"
      ? extraProps["pointer-position"]
      : "top";

  const pointerConfig =
    wheelPointerConfig[pointerSizeKey] && wheelPointerConfig[pointerSizeKey][pointerPositionKey]
      ? wheelPointerConfig[pointerSizeKey][pointerPositionKey]
      : wheelPointerConfig["medium"]["top"];

  const wheelStyle = {
    ...style,
    aspectRatio: "1 / 1",
    borderRadius: "50%",
    background: `conic-gradient(${gradient})`,
    position: "relative" as const,
    margin: "0 auto",
    width: wheelSize[pointerSizeKey],
    height: wheelSize[pointerSizeKey],
    transition: spinning ? "transform 3s ease-out" : undefined,
  }; 

  return (
    <div className="spin-wheel-container" style={{
      position: "relative",
      backgroundColor: extraProps?.['default-bg-color'],
      ...getSpinScreenMarginStyle(extraProps ?? {}, 'spin-screen'),
      ...getSpinScreenPaddingStyle(extraProps ?? {}, 'spin-screen'),
      ...getSpinScreenBorderWidthStyle(extraProps ?? {}, 'spin-screen-border', 'default-border-color'),
    }}>
      <div style={{ position: 'relative', margin: '0 auto' }}>
      {/* Wheel */}
      <div ref={wheelRef} className="spin-wheel" style={wheelStyle}>
        {radius > 0 &&
          items.map((item, index) => {
            const sectorAngle = 360 / items.length;
            const rotation = sectorAngle * index + sectorAngle / 2;

            const fontSize = item.fontSize || 14;
            const pointerSize = extraProps && typeof extraProps["Wheel-pointer-size"] === "string" ? extraProps["Wheel-pointer-size"] : "medium";
            const radialVal = radicalDistanse[pointerSize] || 0.6;
            const distanceFromCenter = radius * radialVal; // radial multiplier for symmetry
            const imageSize = radius / 4;
            return (
               <div
                key={index}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: `
                  translateX(-50%) translateY(-50%)
                  rotate(${rotation}deg)
                  translateY(-${distanceFromCenter}px)
                  rotate( ${item.image ?  '0' : '-90'}deg)
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
                          marginBottom: '8px', // Adds space between the image and the title.
                          objectFit: 'contain',
                        }}
                        // This handy trick hides the image element if the src link is broken.
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  )}
                {/* Conditionally render the image ONLY if a URL is provided in the data. */}
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
          backgroundColor: typeof extraProps?.['default-pointer-color'] === 'string'
            ? extraProps['default-pointer-color'] as string
            : undefined,
          clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
          zIndex: 10,
        }}
      />

      {/* Spin button */}
      <Button onClick={onSpinStart} disabled={spinning} backgroundColor={typeof extraProps?.['default-spin-btn-color'] === 'string' ? extraProps['default-spin-btn-color'] : undefined}>
          {spinning ? "Spinning..." : extraProps?.['spin-wheel-box-is-form'] === 'on' ? "" : (typeof extraProps?.['default-spin-btn-text'] === 'string' && extraProps['default-spin-btn-text'].trim() !== '' ? extraProps['default-spin-btn-text'] : "Spin")}
        </Button>
        </div>
    </div>
  );
};