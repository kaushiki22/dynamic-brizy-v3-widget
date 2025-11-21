import React, { useEffect, useRef, useState } from "react";
import { getItems } from "../utils/getItems";
import { Won } from "../controls/Won";
import { LosingScreen } from "../controls/Lose";
import { Types } from "../types";
import { getSpinScreenMarginStyle, getSpinScreenPaddingStyle } from '../../SpinWheelWidget/utils/BoxModalUtils'
import "../index.scss";
import { getImageKitUrl } from "../../SpinWheelWidget/utils/ImageKitUtil";

export const Editor: React.FC<Types> = (props) => {
  const items = getItems(props);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const originalImageDataRef = useRef<ImageData | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [resultItem, setResultItem] = useState<any>(null);
  const [screenState, setScreenState] = useState<"scratch" | "win" | "lose">("scratch");
  const isFormMode = props?.['scratch-card-box-is-form'] === 'on';
  const activeTab = props["scratch-card-settingsTabs"] || "default";
  
  useEffect(() => {
    if (activeTab === "scratch-card-default-tab") {
      setScreenState("scratch");
    } else if (activeTab === "scratch-card-winning-screen-tab") {
      setScreenState("win");
    } else if (activeTab === "scratch-card-losing-screen-tab") {
      setScreenState("lose");
    }
  }, [activeTab]);
  
  const pickWinner = () => {
    if (!items?.length) return null;
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  };

  const revealResult = () => {
    setResultItem(pickWinner());
    setRevealed(true);
  };

  // Separate effect for image loading - only depends on image source, not style props
  const imageSrc = props?.["scratch-card-default-imageImageSrc"]
    ? `${getImageKitUrl()}/${props["scratch-card-default-imageImageSrc"]}`
    : "https://image-staging-ap1.moengage.com/zaininappmoengage/20250821090931604372S5VUFCcheck1pngzaininappmoengage.png";

  const lastImageSrcRef = useRef<string>("");

  useEffect(() => {
    // Only initialize when in scratch tab (image should load always)
    if (screenState !== "scratch") return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = 400;
    const ch = 300;
    
    // Only clear and reload canvas if image source actually changed
    const imageSrcChanged = lastImageSrcRef.current !== imageSrc;
    const needsReload = imageSrcChanged || canvas.width !== cw || canvas.height !== ch;
    
    if (needsReload) {
      canvas.width = cw;
      canvas.height = ch;
      lastImageSrcRef.current = imageSrc;
    }
    
    // Always ensure context is set up properly
    const currentCtx = canvas.getContext("2d");
    if (!currentCtx) return;
    
    currentCtx.shadowBlur = 0;
    currentCtx.shadowColor = "transparent";

    // Always load image if canvas was cleared or if we don't have original image data
    const needsImage = needsReload || !originalImageDataRef.current;

    // Draw mask once - ALWAYS load the image if needed
    if (needsImage) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      img.onload = () => {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        ctx.globalCompositeOperation = "source-over";
        
        // Calculate aspect ratio to maintain image proportions
        const imgAspect = img.width / img.height;
        const canvasAspect = cw / ch;
        
        let drawWidth, drawHeight, drawX, drawY;
        
        if (imgAspect > canvasAspect) {
          // Image is wider - fit to width
          drawWidth = cw;
          drawHeight = cw / imgAspect;
          drawX = 0;
          drawY = (ch - drawHeight) / 2;
        } else {
          // Image is taller - fit to height
          drawHeight = ch;
          drawWidth = ch * imgAspect;
          drawX = (cw - drawWidth) / 2;
          drawY = 0;
        }
        
        // Draw the image maintaining aspect ratio
        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        
        // Store the original image data for comparison (only if not in form mode)
        if (!isFormMode) {
          originalImageDataRef.current = ctx.getImageData(0, 0, cw, ch);
        }
      };
      
      img.onerror = () => {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#CCCCCC";
        ctx.fillRect(0, 0, cw, ch);
      };
      
      img.src = imageSrc;
    }
  }, [imageSrc, screenState, isFormMode]);

  // Separate effect for event listeners - doesn't reload image
  useEffect(() => {
    if (screenState !== "scratch") return;
    if (isFormMode) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = 400;
    const ch = 300;

    // Ensure we have a valid context and image is loaded
    // Get fresh context reference to avoid stale closures
    const getContext = () => {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return null;
      return canvasEl.getContext("2d");
    };

    let isDrawing = false;
    let lastX = 0, lastY = 0;
    let hasScratched = false;

    const getXY = (e: MouseEvent | TouchEvent) => {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return { x: 0, y: 0 };
      const rect = canvasEl.getBoundingClientRect();
      let x = 0, y = 0;
      if (e instanceof MouseEvent) {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      } else {
        const touch = e.touches[0];
        x = touch.clientX - rect.left;
        y = touch.clientY - rect.top;
      }
      x *= cw / rect.width;
      y *= ch / rect.height;
      return { x, y };
    };

    const checkScratchProgress = () => {
      // Only check if we've actually started scratching and have original data
      const originalImageData = originalImageDataRef.current;
      if (!hasScratched || !originalImageData) return;
      
      const currentCtx = getContext();
      if (!currentCtx) return;
      
      const currentImageData = currentCtx.getImageData(0, 0, cw, ch);
      let scratchedPixels = 0;
      const totalPixels = cw * ch;
      
      // Compare current image data with original to detect changes
      for (let i = 0; i < currentImageData.data.length; i += 4) {
        const originalAlpha = originalImageData.data[i + 3];
        const currentAlpha = currentImageData.data[i + 3];
        
        // If alpha changed from original (became transparent), it's scratched
        if (originalAlpha > 0 && currentAlpha === 0) {
          scratchedPixels++;
        }
      }
      
      const percent = (scratchedPixels / totalPixels) * 100;
      // If 40% is scratched, reveal the result
      if (percent > 4 && !revealed) {
        revealResult();
      }
    };

    const start = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      const currentCtx = getContext();
      if (!currentCtx) return;
      
      // Ensure image is on canvas before scratching
      if (!originalImageDataRef.current) {
        // Image not loaded yet, don't allow scratching
        return;
      }
      
      isDrawing = true;
      hasScratched = true;
      const { x, y } = getXY(e);
      lastX = x;
      lastY = y;
      currentCtx.globalCompositeOperation = "destination-out";
      currentCtx.beginPath();
      currentCtx.arc(x, y, 15, 0, Math.PI * 2);
      currentCtx.fill();
      
      // Check scratch progress after each scratch
      checkScratchProgress();
    };

    const move = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();
      const currentCtx = getContext();
      if (!currentCtx) return;
      
      const { x, y } = getXY(e);
      currentCtx.globalCompositeOperation = "destination-out";
      currentCtx.lineJoin = "round";
      currentCtx.lineCap = "round";
      currentCtx.lineWidth = 30;
      currentCtx.beginPath();
      currentCtx.moveTo(lastX, lastY);
      currentCtx.lineTo(x, y);
      currentCtx.stroke();
      lastX = x;
      lastY = y;
      
      // Check scratch progress after each move
      checkScratchProgress();
    };

    const end = () => {
      isDrawing = false;
    };

    // Mouse events
    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mouseleave", end);

    // Touch events
    canvas.addEventListener("touchstart", start);
    canvas.addEventListener("touchmove", move);
    canvas.addEventListener("touchend", end);

    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mousemove", move);
      canvas.removeEventListener("mouseup", end);
      canvas.removeEventListener("mouseleave", end);

      canvas.removeEventListener("touchstart", start);
      canvas.removeEventListener("touchmove", move);
      canvas.removeEventListener("touchend", end);
    };
  }, [screenState, isFormMode, revealed]);

  return (
    <div className="scratch-card-main-component">
      <div className="preview-card">
        {/* Show win/lose screens based on tab or scratch detection */}
        {(revealed || screenState === "win" || screenState === "lose") ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            {/* Tab-based display takes priority, then scratch detection */}
            {screenState === "win" ? (
              <Won data={resultItem} extraProps={props} />
            ) : screenState === "lose" ? (
              <LosingScreen message={props?.['losing-text1-title'] || "Sorry, You didn't win anything"} extraProps={props} />
            ) : revealed && resultItem?.loseOption === 'on' ? (
              <LosingScreen message={props?.['losing-text1-title'] || "Sorry, You didn't win anything"} extraProps={props} />
            ) : (
              <Won data={resultItem} extraProps={props} />
            )}
          </div>
        ) : (
            <div style={{ position: 'relative', display: 'inline-block', width: '400px', height: '300px', ...getSpinScreenMarginStyle(props, 'scratch-card-default')}}>
            {/* Prize layer BELOW */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '12px',
              overflow: 'hidden',
              zIndex: 0
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f8f9fa',
                color: '#6c757d',
                fontSize: '14px',
                fontWeight: 'bold',
              }}>
                {items.length > 0 ? (
                  <div style={{ textAlign: 'center' }}>
                    <div>🎁</div>
                    <div>Scratch to reveal</div>
                    <div style={{ fontSize: '12px', marginTop: '4px' }}>
                      {items.some(item => item.loseOption === 'on') ? 'Win or Lose' : 'Prize'}
                    </div>
                  </div>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div>🎫</div>
                    <div>No items configured</div>
                  </div>
                )}
              </div>
            </div>
            {/* Scratch mask ABOVE */}
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                borderRadius: '12px',
                cursor: isFormMode ? 'default' : 'crosshair',
                zIndex: 1,
                display: 'block',
                width: '100%',
                height: '100%',
                touchAction: 'none',   // <-- FIX: Disable browser touch gestures
                userSelect: 'none',    // <-- FIX: Disable text/image selection
                backgroundColor: props?.["scratch-card-default-bg-color"] || 'transparent',
                ...getSpinScreenPaddingStyle(props, 'scratch-card-default') 
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};