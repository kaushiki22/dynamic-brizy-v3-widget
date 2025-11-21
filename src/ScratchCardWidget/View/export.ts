
// Initialize scratch card functionality
const init = () => {
  // Wait for DOM to be ready
  const scratchCards = document.querySelectorAll<HTMLDivElement>(".scratch-card-container");
  scratchCards.forEach((scratchCard) => {
    const scratchImage = scratchCard.getAttribute("data-scratch-card-image") || '';
    const itemsData = scratchCard.getAttribute("data-scratch-items");
    const items = itemsData ? JSON.parse(itemsData) : [];
    const isFormMode = scratchCard.dataset.scratchCardBoxIsForm === "on";

    if (!scratchCard.querySelector("canvas")) {
      // Get the preview card container
      const previewCard = scratchCard.querySelector(".preview-card") as HTMLElement;
      if (!previewCard) return;

      // Create canvas for scratch card
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = 300;
      const defaultBgColor = scratchCard.dataset.scratchCardDefaultBgColor || 'transparent';
      const defaultPadding = scratchCard.dataset.scratchCardDefaultPadding || '0';
      canvas.style.cssText = `position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 12px; cursor: crosshair; z-index: 2; background-color: ${defaultBgColor};${defaultPadding};`;

      // Append canvas inside the preview card, not the main container
      previewCard.appendChild(canvas);

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Load and draw the scratch image (for both form mode and normal mode)
      const imageUrl = scratchImage 
        ? `https://image-staging-ap1.moengage.com/${scratchImage}`
        : 'https://image-staging-ap1.moengage.com/zaininappmoengage/20250821090931604372S5VUFCcheck1pngzaininappmoengage.png';

      const img = new Image();
      img.crossOrigin = "anonymous";

      // Scratch functionality (only for non-form mode)
      if (!isFormMode) {
        let isDrawing = false;
        let lastX = 0, lastY = 0;
        let hasScratched = false;
        let originalImageData: ImageData | null = null;
        let selectedWinner: any = null;

        img.onload = () => {
          // Calculate aspect ratio to maintain image proportions
          const imgAspect = img.width / img.height;
          const canvasAspect = 400 / 300;

          let drawWidth, drawHeight, drawX, drawY;

          if (imgAspect > canvasAspect) {
            // Image is wider - fit to width
            drawWidth = 400;
            drawHeight = 400 / imgAspect;
            drawX = 0;
            drawY = (300 - drawHeight) / 2;
          } else {
            // Image is taller - fit to height
            drawHeight = 300;
            drawWidth = 300 * imgAspect;
            drawX = (400 - drawWidth) / 2;
            drawY = 0;
          }

          // Draw the image maintaining aspect ratio
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
          // Store original image data for scratch progress checking
          originalImageData = ctx.getImageData(0, 0, 400, 300);
        };

        img.onerror = () => {
          ctx.fillStyle = "#CCCCCC";
          ctx.fillRect(0, 0, 400, 300);
          // Store original image data even on error
          originalImageData = ctx.getImageData(0, 0, 400, 300);
        };

        const getXY = (e: MouseEvent | TouchEvent) => {
          const rect = canvas.getBoundingClientRect();
          let x = 0, y = 0;
          if (e instanceof MouseEvent) {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
          } else {
            const touch = e.touches[0];
            x = touch.clientX - rect.left;
            y = touch.clientY - rect.top;
          }
          x *= 400 / rect.width;
          y *= 300 / rect.height;
          return { x, y };
        };

        const checkScratchProgress = () => {
          if (!hasScratched) return;

          // If originalImageData is not set yet, try to set it now
          if (!originalImageData) {
            try {
              originalImageData = ctx.getImageData(0, 0, 400, 300);
            } catch (e) {
              // If we can't get image data, reveal after a delay to ensure user has scratched enough
              setTimeout(() => {
                if (!selectedWinner) {
                  revealResult();
                }
              }, 100);
              return;
            }
          }

          const currentImageData = ctx.getImageData(0, 0, 400, 300);
          let scratchedPixels = 0;

          for (let i = 0; i < currentImageData.data.length; i += 4) {
            const originalAlpha = originalImageData.data[i + 3];
            const currentAlpha = currentImageData.data[i + 3];

            if (originalAlpha > 0 && currentAlpha === 0) {
              scratchedPixels++;
            }
          }

          const percent = (scratchedPixels / (400 * 300)) * 100;

          // If 10% is scratched, reveal result
          if (percent > 10) {
            revealResult();
          }
        };

        const revealResult = () => {
          // Only pick winner once
          if (selectedWinner) {
            return;
          }

          // Pick a random winner
          const randomIndex = Math.floor(Math.random() * items.length);
          selectedWinner = items[randomIndex];

          // Hide the entire preview card container completely
          const previewCard = scratchCard.querySelector(".preview-card") as HTMLElement;
          if (previewCard) {
            previewCard.style.cssText = "display: none !important;";

            // Hide all child elements including canvas
            const allChildren = previewCard.querySelectorAll('*');
            allChildren.forEach((child) => {
              if (child instanceof HTMLElement) {
                child.style.cssText = "display: none !important;";
              }
            });
          }

          // Also hide any canvas elements anywhere in the container
          const canvases = scratchCard.querySelectorAll("canvas");
          canvases.forEach((canvas) => {
            if (canvas) {
              (canvas as HTMLElement).style.cssText = "display: none !important;";
            }
          });

          // Create result content
          let resultHTML = '';

          if (selectedWinner.loseOption === "on") {
            const losingImgSrc = scratchCard.dataset.scratchCardLosingImgImageimagesrc 
              ? `https://image-staging-ap1.moengage.com/${scratchCard.dataset.scratchCardLosingImgImageimagesrc}` 
              : 'https://image-staging-ap1.moengage.com/zaininappmoengage/20250813082112920973515LXRVectorpngzaininappmoengage.png';

            const losingImgMargin = scratchCard.dataset.scratchCardLosingImgMargin || '';
            const losingImgPadding = scratchCard.dataset.scratchCardLosingImgPadding || '';
            const losingImgBorder = scratchCard.dataset.scratchCardLosingImgBorder || '';
            const losingText1Margin = scratchCard.dataset.scratchCardLosingText1Margin || '';
            const losingText1Padding = scratchCard.dataset.scratchCardLosingText1Padding || '';
            const losingText1Border = scratchCard.dataset.scratchCardLosingText1Border || '';
            const losingText1BorderRadius = scratchCard.dataset.scratchLosingText1BorderRadius || '';

            resultHTML = `
              <div style="background-color: ${scratchCard.dataset.scratchCardLosingBgColor || 'transparent'}; padding: 15px 10px; border-radius: 12px; text-align: center; width: 270px; display: flex; flex-direction: column; align-items: center;">
                <img src="${losingImgSrc}" alt="Lose" style="width: 80px; height: 80px; ${losingImgMargin};${losingImgPadding} ;${losingImgBorder}" />
                <h2 style="font-size: ${scratchCard.dataset.scratchCardLosingText1Fontsize}px; color: ${scratchCard.dataset.scratchCardLosingText1Fontcolor}; background-color: ${scratchCard.dataset.scratchCardLosingText1BgColor}; ${losingText1Margin}; ${losingText1Padding}; ${losingText1Border}; ${losingText1BorderRadius}">
                  ${scratchCard.dataset.scratchCardLosingText1Title}
                        </h2>
                    </div>
                `;
            } else {
            const winImageSrc = scratchCard.dataset.scratchCardWinningImgImageimagesrc 
              ? `https://image-staging-ap1.moengage.com/${scratchCard.dataset.scratchCardWinningImgImageimagesrc}` 
              : 'https://image-staging-ap1.moengage.com/zaininappmoengage/20250813082208174819U7VY3E3667fd08188e527bc564e165889218d63e9ddb29pngzaininappmoengage.png';

            const winningImgMargin = scratchCard.dataset.scratchCardWinningImgMargin || '';
            const winningImgPadding = scratchCard.dataset.scratchCardWinningImgPadding || '';
            const winningImgBorder = scratchCard.dataset.scratchCardWinningImgBorder || '';
            const winningText1Margin = scratchCard.dataset.scratchCardWinningText1Margin || '';
            const winningText1Padding = scratchCard.dataset.scratchCardWinningText1Padding || '';
            const winningText1Border = scratchCard.dataset.scratchCardWinningText1Border || '';
            const winningText1BorderRadius = scratchCard.dataset.scratchCardWinningText1BorderRadius || '';
            const winningCouponBoxMargin = scratchCard.dataset.scratchCardWinningCouponBoxMargin || '';
            const winningCouponBoxPadding = scratchCard.dataset.scratchCardWinningCouponBoxPadding || '';
            const winningCouponBoxBorder = scratchCard.dataset.scratchCardWinningCouponBoxBorder || '';
            const winningCouponBoxBorderRadius = scratchCard.dataset.scratchCardWinningCouponBoxBorderRadius || '';

            const couponBoxSizes = { small: '180px', medium: '200px', large: '220px' };
            const couponBoxSize = couponBoxSizes[scratchCard.dataset.scratchCardWinningCouponboxSize as keyof typeof couponBoxSizes] || '200px';
            const showCopyIcon = scratchCard.dataset.scratchCardWinningCouponBoxGiveIcon === 'on';

            resultHTML = `
              <div style="background-color: ${scratchCard.dataset.scratchCardWinningCardBgColor || 'transparent'}; padding: 15px 10px; border-radius: 12px; text-align: center; width: 270px; display: flex; flex-direction: column; align-items: center;">
                        <div>
                  <img src="${winImageSrc}" alt="Win" style="width: 80px; height: 80px; ${winningImgMargin}; ${winningImgPadding}; ${winningImgBorder};" />
              <div style="background-color: ${scratchCard.dataset.scratchCardWinningText1BgColor || 'transparent'}; ${winningText1Margin}; ${winningText1Padding}; ${winningText1Border}; ${winningText1BorderRadius}">
                  <p style="font-size: ${scratchCard.dataset.scratchCardWinningText1Fontsize}px; color: ${scratchCard.dataset.scratchCardWinningText1Fontcolor || '#333'};">
                    ${scratchCard.dataset.scratchCardWinningText1Title}
                  </p>
                  <p style="font-size: ${scratchCard.dataset.scratchCardWinningText1Fontsize}px; font-weight: bold; color: ${scratchCard.dataset.scratchCardWinningText1Fontcolor || '#333'}">
                    ${selectedWinner.title}
                  </p>
                  </div>
                </div>
                <div onclick="MoeOsm.copyText('.copy-code');navigator.clipboard.writeText('${selectedWinner.couponCode}');MoeOsm.trackClick('scratch-copy-code');" style="display: flex; justify-content: ${showCopyIcon ? 'space-between' : 'center'}; align-items: center; cursor: pointer; background: ${scratchCard.dataset.scratchCardWinningCouponBoxColor}; ${winningCouponBoxMargin} ;${winningCouponBoxPadding}; ${winningCouponBoxBorder}; ${winningCouponBoxBorderRadius};width: ${couponBoxSize};">
                  <span class="copy-code" style="color: ${scratchCard.dataset.scratchCardWinningCouponBoxFontcolor || '#333'}; font-weight: bold; font-size: ${scratchCard.dataset.scratchCardWinningCouponBoxFontsize || '16'}px; letter-spacing: 1px; margin: 0; margin-right: ${showCopyIcon ? '40px' : '0'};">
                    ${selectedWinner.couponCode}
                            </span>
                  ${showCopyIcon ? `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="${scratchCard.dataset.scratchCardWinningCouponBoxGiveIconColor || '#333'}"><path d="M0 0h24v24H0z" fill="none" /><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>` : ''}
                        </div>
                    </div>
                `;
          }

          // Replace preview card with result
          if (previewCard) {
            previewCard.insertAdjacentHTML('afterend', resultHTML);
          }
        };

        const start = (e: MouseEvent | TouchEvent) => {
          e.preventDefault();
          isDrawing = true;
          hasScratched = true;
          const { x, y } = getXY(e);
          lastX = x;
          lastY = y;
          ctx.globalCompositeOperation = "destination-out";
          ctx.beginPath();
          ctx.arc(x, y, 15, 0, Math.PI * 2);
          ctx.fill();
          checkScratchProgress();
        };

        const move = (e: MouseEvent | TouchEvent) => {
          if (!isDrawing) return;
          e.preventDefault();
          const { x, y } = getXY(e);
          ctx.globalCompositeOperation = "destination-out";
          ctx.lineJoin = "round";
          ctx.lineCap = "round";
          ctx.lineWidth = 30;
          ctx.beginPath();
          ctx.moveTo(lastX, lastY);
          ctx.lineTo(x, y);
          ctx.stroke();
          lastX = x;
          lastY = y;
          checkScratchProgress();
        };

        const end = () => {
          isDrawing = false;
        };

        canvas.addEventListener("mousedown", start);
        canvas.addEventListener("mousemove", move);
        canvas.addEventListener("mouseup", end);
        canvas.addEventListener("mouseleave", end);
        canvas.addEventListener("touchstart", start);
        canvas.addEventListener("touchmove", move);
        canvas.addEventListener("touchend", end);
      } else {
        // Form mode: just load and display the image without scratch functionality
        img.onload = () => {
          // Calculate aspect ratio to maintain image proportions
          const imgAspect = img.width / img.height;
          const canvasAspect = 400 / 300;

          let drawWidth, drawHeight, drawX, drawY;

          if (imgAspect > canvasAspect) {
            // Image is wider - fit to width
            drawWidth = 400;
            drawHeight = 400 / imgAspect;
            drawX = 0;
            drawY = (300 - drawHeight) / 2;
          } else {
            // Image is taller - fit to height
            drawHeight = 300;
            drawWidth = 300 * imgAspect;
            drawX = (400 - drawWidth) / 2;
            drawY = 0;
          }

          // Draw the image maintaining aspect ratio
          ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        };

        img.onerror = () => {
          ctx.fillStyle = "#CCCCCC";
          ctx.fillRect(0, 0, 400, 300);
        };
      }

      img.src = imageUrl;
    }
  });
};

// Global function to trigger scratch card programmatically
(window as any).triggerScratchCard = (containerId?: string) => {
  const scratchCards = containerId
    ? [document.getElementById(containerId)]
    : document.querySelectorAll<HTMLDivElement>(".scratch-card-container");

  scratchCards.forEach((scratchCard) => {
    if (!scratchCard) return;

    const isFormMode = scratchCard.dataset.scratchCardBoxIsForm === "on";
    if (!isFormMode) return; // Only trigger in form mode

    const previewCard = scratchCard.querySelector(".preview-card") as HTMLElement;
    if (!previewCard) return;

    // Check if already revealed
    if (previewCard.style.display === "none") {
      return; // Already revealed
    }

    // Get winner data
    const itemsData = scratchCard.getAttribute("data-scratch-items");
    const items = itemsData ? JSON.parse(itemsData) : [];
    const randomIndex = Math.floor(Math.random() * items.length);
    const selectedWinner = items[randomIndex];

    // Hide the existing preview and canvas
    const existingCanvas = scratchCard.querySelector<HTMLCanvasElement>("canvas");
    if (existingCanvas) {
      existingCanvas.style.display = "none";
    }

    // Get the scratch image
    const scratchImage = scratchCard.getAttribute("data-scratch-card-image") || '';
    const imageUrl = scratchImage 
      ? `https://image-staging-ap1.moengage.com/${scratchImage}`
      : 'https://image-staging-ap1.moengage.com/zaininappmoengage/20250821090931604372S5VUFCcheck1pngzaininappmoengage.png';

    // Get background color
    const defaultBgColor = scratchCard.dataset.scratchCardDefaultBgColor || 'transparent';
    const defaultPadding = scratchCard.dataset.scratchCardDefaultPadding || '';

    // Create a new canvas for auto-scratch animation
    const newCanvas = document.createElement("canvas");
    newCanvas.width = 400;
    newCanvas.height = 300;
    newCanvas.style.cssText = `position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 12px; z-index: 2; background-color: ${defaultBgColor};${defaultPadding};`;

    previewCard.appendChild(newCanvas);

    const ctx = newCanvas.getContext("2d");
    if (!ctx) return;

    let originalImageData: ImageData | null = null;

    // Load and draw the scratch image
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const imgAspect = img.width / img.height;
      const canvasAspect = 400 / 300;

      let drawWidth, drawHeight, drawX, drawY;

      if (imgAspect > canvasAspect) {
        drawWidth = 400;
        drawHeight = 400 / imgAspect;
        drawX = 0;
        drawY = (300 - drawHeight) / 2;
      } else {
        drawHeight = 300;
        drawWidth = 300 * imgAspect;
        drawX = (400 - drawWidth) / 2;
        drawY = 0;
      }

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      originalImageData = ctx.getImageData(0, 0, 400, 300);

      // Start auto-scratch animation
      startAutoScratch();
    };
    img.src = imageUrl;

    const startAutoScratch = () => {
      let scratched = false;

      // Auto-scratch animation with realistic scratch patterns
      const animateScratch = () => {
        if (!originalImageData) return;

        ctx.globalCompositeOperation = "destination-out";
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        // Create 3-5 realistic scratches per frame
        const numScratches = 3 + Math.floor(Math.random() * 3);

        for (let i = 0; i < numScratches; i++) {
          // Random starting point
          const startX = Math.random() * 400;
          const startY = Math.random() * 300;

          // Random direction (angle in radians)
          const angle = Math.random() * Math.PI * 2;

          // Random scratch length (30-80 pixels)
          const length = 30 + Math.random() * 50;

          // Calculate end point
          const endX = startX + Math.cos(angle) * length;
          const endY = startY + Math.sin(angle) * length;

          // Random line width (8-20 pixels) to simulate different scratch sizes
          const lineWidth = 8 + Math.random() * 12;

          // Draw the scratch line
          ctx.lineWidth = lineWidth;
          ctx.beginPath();
          ctx.moveTo(startX, startY);

          // Add some slight curve or variation to make it look more realistic
          const midX = startX + (endX - startX) * 0.5 + (Math.random() - 0.5) * 15;
          const midY = startY + (endY - startY) * 0.5 + (Math.random() - 0.5) * 15;

          ctx.quadraticCurveTo(midX, midY, endX, endY);
          ctx.stroke();

          // Sometimes add a shorter secondary scratch nearby for more realism
          if (Math.random() > 0.7) {
            const secondaryStartX = startX + (Math.random() - 0.5) * 20;
            const secondaryStartY = startY + (Math.random() - 0.5) * 20;
            const secondaryLength = 15 + Math.random() * 25;
            const secondaryEndX = secondaryStartX + Math.cos(angle + (Math.random() - 0.5) * 0.5) * secondaryLength;
            const secondaryEndY = secondaryStartY + Math.sin(angle + (Math.random() - 0.5) * 0.5) * secondaryLength;

            ctx.lineWidth = lineWidth * 0.6;
            ctx.beginPath();
            ctx.moveTo(secondaryStartX, secondaryStartY);
            ctx.lineTo(secondaryEndX, secondaryEndY);
            ctx.stroke();
          }
        }

        // Check how much is scratched
        const currentImageData = ctx.getImageData(0, 0, 400, 300);
        let scratchedPixels = 0;

        for (let i = 0; i < currentImageData.data.length; i += 4) {
          const originalAlpha = originalImageData.data[i + 3];
          const currentAlpha = currentImageData.data[i + 3];

          if (originalAlpha > 0 && currentAlpha === 0) {
            scratchedPixels++;
          }
        }

        const percent = (scratchedPixels / (400 * 300)) * 100;

        if (percent < 20 && !scratched) {
          // Slower animation with setTimeout for better visibility
          setTimeout(() => {
            requestAnimationFrame(animateScratch);
          }, 50); // 50ms delay between frames
        } else {
          scratched = true;
          // Wait a bit then reveal result
          setTimeout(() => {
            revealResult();
          }, 500);
        }
      };

      animateScratch();
    };

    const revealResult = () => {
      // Hide the entire preview card container
      previewCard.style.cssText = "display: none !important;";

      // Hide the canvas
      newCanvas.style.cssText = "display: none !important;";

      // Create result HTML
      let resultHTML = '';

      if (selectedWinner.loseOption === "on") {
        const losingImgSrc = scratchCard.dataset.scratchCardLosingImgImageimagesrc 
          ? `https://image-staging-ap1.moengage.com/${scratchCard.dataset.scratchCardLosingImgImageimagesrc}` 
          : 'https://image-staging-ap1.moengage.com/zaininappmoengage/20250813082112920973515LXRVectorpngzaininappmoengage.png';

        const losingImgMargin = scratchCard.dataset.scratchCardLosingImgMargin || '';
        const losingImgPadding = scratchCard.dataset.scratchCardLosingImgPadding || '';
        const losingImgBorder = scratchCard.dataset.scratchCardLosingImgBorder || '';
        const losingText1Margin = scratchCard.dataset.scratchCardLosingText1Margin || '';
        const losingText1Padding = scratchCard.dataset.scratchCardLosingText1Padding || '';
        const losingText1Border = scratchCard.dataset.scratchCardLosingText1Border || '';
        const losingText1BorderRadius = scratchCard.dataset.scratchLosingText1BorderRadius || '';

        resultHTML = `
          <div style="background-color: ${scratchCard.dataset.scratchCardLosingBgColor || 'transparent'}; padding: 15px 10px; border-radius: 12px; text-align: center; width: 270px; display: flex; flex-direction: column; align-items: center;">
            <img src="${losingImgSrc}" alt="Lose" style="width: 80px; height: 80px; ${losingImgMargin};${losingImgPadding} ;${losingImgBorder}" />
            <h2 style="font-size: ${scratchCard.dataset.scratchCardLosingText1Fontsize}px; color: ${scratchCard.dataset.scratchCardLosingText1Fontcolor}; background-color: ${scratchCard.dataset.scratchCardLosingText1BgColor}; ${losingText1Margin}; ${losingText1Padding}; ${losingText1Border}; ${losingText1BorderRadius}">
              ${scratchCard.dataset.scratchCardLosingText1Title}
            </h2>
          </div>
        `;
      } else {
        const winImageSrc = scratchCard.dataset.scratchCardWinningImgImageimagesrc 
          ? `https://image-staging-ap1.moengage.com/${scratchCard.dataset.scratchCardWinningImgImageimagesrc}` 
          : 'https://image-staging-ap1.moengage.com/zaininappmoengage/20250813082208174819U7VY3E3667fd08188e527bc564e165889218d63e9ddb29pngzaininappmoengage.png';

        const winningImgMargin = scratchCard.dataset.scratchCardWinningImgMargin || '';
        const winningImgPadding = scratchCard.dataset.scratchCardWinningImgPadding || '';
        const winningImgBorder = scratchCard.dataset.scratchCardWinningImgBorder || '';
        const winningText1Margin = scratchCard.dataset.scratchCardWinningText1Margin || '';
        const winningText1Padding = scratchCard.dataset.scratchCardWinningText1Padding || '';
        const winningText1Border = scratchCard.dataset.scratchCardWinningText1Border || '';
        const winningText1BorderRadius = scratchCard.dataset.scratchCardWinningText1BorderRadius || '';
        const winningCouponBoxMargin = scratchCard.dataset.scratchCardWinningCouponBoxMargin || '';
        const winningCouponBoxPadding = scratchCard.dataset.scratchCardWinningCouponBoxPadding || '';
        const winningCouponBoxBorder = scratchCard.dataset.scratchCardWinningCouponBoxBorder || '';
        const winningCouponBoxBorderRadius = scratchCard.dataset.scratchCardWinningCouponBoxBorderRadius || '';

        const couponBoxSizes = { small: '180px', medium: '200px', large: '220px' };
        const couponBoxSize = couponBoxSizes[scratchCard.dataset.scratchCardWinningCouponboxSize as keyof typeof couponBoxSizes] || '200px';
        const showCopyIcon = scratchCard.dataset.scratchCardWinningCouponBoxGiveIcon === 'on';

        resultHTML = `
          <div style="background-color: ${scratchCard.dataset.scratchCardWinningCardBgColor || 'transparent'}; padding: 15px 10px; border-radius: 12px; text-align: center; width: 270px; display: flex; flex-direction: column; align-items: center;">
            <div>
              <img src="${winImageSrc}" alt="Win" style="width: 80px; height: 80px; ${winningImgMargin}; ${winningImgPadding}; ${winningImgBorder};" />
              <div style="background-color: ${scratchCard.dataset.scratchCardWinningText1BgColor || 'transparent'}; ${winningText1Margin}; ${winningText1Padding}; ${winningText1Border}; ${winningText1BorderRadius}">
                <p style="font-size: ${scratchCard.dataset.scratchCardWinningText1Fontsize}px; color: ${scratchCard.dataset.scratchCardWinningText1Fontcolor || '#333'};">
                  ${scratchCard.dataset.scratchCardWinningText1Title}
                </p>
                <p style="font-size: ${scratchCard.dataset.scratchCardWinningText1Fontsize}px; font-weight: bold; color: ${scratchCard.dataset.scratchCardWinningText1Fontcolor || '#333'}">
                  ${selectedWinner.title}
                </p>
              </div>
            </div>
            <div onclick="MoeOsm.copyText('.copy-code');navigator.clipboard.writeText('${selectedWinner.couponCode}');MoeOsm.trackClick('scratch-copy-code');" style="display: flex; justify-content: ${showCopyIcon ? 'space-between' : 'center'}; align-items: center; cursor: pointer; background: ${scratchCard.dataset.scratchCardWinningCouponBoxColor}; ${winningCouponBoxMargin} ;${winningCouponBoxPadding}; ${winningCouponBoxBorder}; ${winningCouponBoxBorderRadius};width: ${couponBoxSize};">
              <span class="copy-code" style="color: ${scratchCard.dataset.scratchCardWinningCouponBoxFontcolor || '#333'}; font-weight: bold; font-size: ${scratchCard.dataset.scratchCardWinningCouponBoxFontsize || '16'}px; letter-spacing: 1px; margin: 0; margin-right: ${showCopyIcon ? '40px' : '0'};">
                ${selectedWinner.couponCode}
              </span>
              ${showCopyIcon ? `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="${scratchCard.dataset.scratchCardWinningCouponBoxGiveIconColor || '#333'}"><path d="M0 0h24v24H0z" fill="none" /><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" /></svg>` : ''}
            </div>
          </div>
        `;
      }

      previewCard.insertAdjacentHTML('afterend', resultHTML);
    };
  });
};

// Store scratch instances for form mode
(window as any).__scratchCardInstances = new Map();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
