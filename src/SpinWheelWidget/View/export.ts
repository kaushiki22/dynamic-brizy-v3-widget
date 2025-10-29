
// Global function to trigger spin wheel programmatically
(window as any).triggerSpinWheel = (containerId?: string) => {
    const spinWheels = containerId 
        ? [document.getElementById(containerId)] 
        : document.querySelectorAll<HTMLDivElement>(".spin-wheel-container");
    
    spinWheels.forEach((spinWheel) => {
        if (!spinWheel) return;
        
        const spinButton = spinWheel.querySelector<HTMLButtonElement>(".spin-button");
        const wheel = spinWheel.querySelector<HTMLDivElement>(".spin-wheel");
        const resultDisplay = spinWheel.querySelector<HTMLDivElement>(".result");
        const wheelItems = spinWheel.querySelectorAll<HTMLDivElement>(".wheel-item");

        if (!spinButton || !wheel || !resultDisplay) {
            console.error("One or more elements not found");
            return;
        }

        // Trigger the spin function
        (window as any).__spinWheelInstances?.get(spinWheel)?.();
    });
};

// Store spin functions for each wheel instance
(window as any).__spinWheelInstances = new Map();

const init = () => {
    // Wait for DOM to be ready
    const spinWheels = document.querySelectorAll<HTMLDivElement>(".spin-wheel-container");
    spinWheels.forEach((spinWheel) => {
        const spinButton = spinWheel.querySelector<HTMLButtonElement>(".spin-button");
        const wheel = spinWheel.querySelector<HTMLDivElement>(".spin-wheel");
        const resultDisplay = spinWheel.querySelector<HTMLDivElement>(".result");
        const wheelItems = spinWheel.querySelectorAll<HTMLDivElement>(".wheel-item");
        const wheelContainer = spinWheel.querySelector<HTMLDivElement>(".spin-wheel");

        if (!spinButton || !wheel || !resultDisplay || !wheelContainer) {
            console.error("One or more elements not found");
            return;
        }

        let spinning = false;
        let rotation = 0;

        // Create the spin function
        const spinFunction = () => {
            if (spinning) {
                return;
            }

            spinning = true;
            spinButton.disabled = true;
            spinButton.textContent = "Spinning...";

            // Hide any existing result
            resultDisplay.style.display = "none";
            resultDisplay.textContent = "";

            const sectorAngle = 360 / wheelItems.length;

            // 1️⃣ Find highest score winner(s) - same logic as Editor
            const items = Array.from(wheelItems).map(item => ({
                score: parseInt(item.dataset.score || '0'),
                loseOption: item.dataset.loseOption || 'off',
                title: item.dataset.title || '',
                couponCode: item.dataset.couponCode || ''
            }));

            // Debug: Log all items to see their data
            console.log('All wheel items data:', items);

            const highestScore = Math.max(...items.map(item => item.score));
            const winners = items
                .map((item, index) => ({ ...item, index }))
                .filter(s => s.score === highestScore);

            const chosen = winners[Math.floor(Math.random() * winners.length)];
            const winnerIndex = chosen.index;

            // 2️⃣ Pointer position offsets
            const pointerOffsets: Record<string, number> = {
                top: 0,
                right: 90,
                bottom: 180,
                left: 270
            };

            // Get pointer position from container data or default to top
            const pointerPos = spinWheel.dataset.pointerPosition || "top";
            const pointerOffset = pointerOffsets[pointerPos] || 0;

            // 3️⃣ EXTRA full spins for animation
            const extraSpins = 5 * 360;

            // 4️⃣ Winner's center angle from wheel origin (0° at top)
            const winnerCenterFromTop =
                (items.length - winnerIndex) * sectorAngle - sectorAngle / 2;

            // 5️⃣ Apply pointerOffset so winner center matches pointer pos
            const targetAngle = winnerCenterFromTop + pointerOffset;

            // Normalize to 0–360
            const normalizedTarget =
                ((targetAngle % 360) + 360) % 360;

            // 6️⃣ Final rotation
            const finalRotation = rotation + extraSpins + normalizedTarget;

            // Apply rotation with CSS transition
            wheel.style.transition = "transform 3s ease-out";
            wheel.style.transform = `rotate(${finalRotation}deg)`;

            rotation = finalRotation;

            // 7️⃣ Countdown for spin animation, then decode winner
            setTimeout(() => {
                spinning = false;

                // Only try to reset button if it still exists
                if (spinButton) {
                    spinButton.disabled = false;
                    spinButton.textContent = "Spin";
                }

                // Adjust rotation so pointer is treated as top
                const adjusted = (finalRotation - pointerOffset + 360) % 360;

                // Index of winning sector
                let landedIndex =
                    Math.floor((items.length - adjusted / sectorAngle) % items.length);

                if (landedIndex < 0) landedIndex += items.length;

                const landedItem = items[landedIndex];

                // Get dynamic values from container data attributes
                const winningImgSrc = spinWheel.dataset.winningImgImageimagesrc || '';
                const winningText1Title = spinWheel.dataset.winningText1Title || 'Congratulations, you won';
                const winningText1Fontcolor = spinWheel.dataset.winningText1Fontcolor || '#333';
                const winningText1Fontsize = spinWheel.dataset.winningText1Fontsize || '16';
                const winningText1BgColor = spinWheel.dataset.winningText1BgColor || 'transparent';
                const winningText2Title = spinWheel.dataset.winningText2Title || 'copy this code and use during checkout';
                const winningText2Fontcolor = spinWheel.dataset.winningText2Fontcolor || '#666';
                const winningText2Fontsize = spinWheel.dataset.winningText2Fontsize || '14';
                const winningText2BgColor = spinWheel.dataset.winningText2BgColor || 'transparent';
                const winningCouponboxSize = spinWheel.dataset.winningCouponboxSize || 'medium';
                const winningCouponBoxColor = spinWheel.dataset.winningCouponBoxColor || '#f8f0ff';
                const winningCouponBoxFontcolor = spinWheel.dataset.winningCouponBoxFontcolor || '#333';
                const winningCouponBoxFontsize = spinWheel.dataset.winningCouponBoxFontsize || '16';
                const winningCouponBoxBgColor = spinWheel.dataset.winningCouponBoxBgColor || 'white';
                const winningCouponBoxGiveIcon = spinWheel.dataset.winningCouponBoxGiveIcon || 'on';
                const winningCouponBoxGiveIconColor = spinWheel.dataset.winningCouponBoxGiveIconColor || '#333';
                const losingText1Title = spinWheel.dataset.losingText1Title || 'Sorry, You didn\'t win anything';
                const losingText1Fontcolor = spinWheel.dataset.losingText1Fontcolor || '#dc2626';
                const losingImgSrc = spinWheel.dataset.losingImgImageImageSrc || '';
                const losingText1Fontsize = spinWheel.dataset.losingText1Fontsize || '22';
                const losingText1BgColor = spinWheel.dataset.losingText1BgColor || 'transparent';
                const losingImgMargin = spinWheel.dataset.losingImgMargin || '';
                const losingImgPadding = spinWheel.dataset.losingImgPadding || '';
                const losingImgBorder = spinWheel.dataset.losingImgBorder || '';
                const losingText1Margin = spinWheel.dataset.losingText1Margin || '';
                const losingText1Padding = spinWheel.dataset.losingText1Padding || '';
                const losingText1Border = spinWheel.dataset.losingText1Border || '';
                const losingText1BorderRadius = spinWheel.dataset.losingText1BorderRadius || '';

                // Get CSS strings from data attributes
                const winningImgMargin = spinWheel.dataset.winningImgMargin || '';
                const winningImgPadding = spinWheel.dataset.winningImgPadding || '';
                const winningImgBorder = spinWheel.dataset.winningImgBorder || '';
                const winningText1Margin = spinWheel.dataset.winningText1Margin || '';
                const winningText1Padding = spinWheel.dataset.winningText1Padding || '';
                const winningText1Border = spinWheel.dataset.winningText1Border || '';
                const winningText2Margin = spinWheel.dataset.winningText2Margin || '';
                const winningText2Padding = spinWheel.dataset.winningText2Padding || '';
                const winningText2Border = spinWheel.dataset.winningText2Border || '';
                const winningCouponBoxMargin = spinWheel.dataset.winningCouponBoxMargin || '';
                const winningCouponBoxPadding = spinWheel.dataset.winningCouponBoxPadding || '';
                const winningCouponBoxBorder = spinWheel.dataset.winningCouponBoxBorder || '';
                const winningCouponBoxBorderRadius = spinWheel.dataset.winningCouponBoxBorderRadius || '';
                const winningText1BorderRadius = spinWheel.dataset.winningText1BorderRadius || '';
                const winningText2BorderRadius = spinWheel.dataset.winningText2BorderRadius || '';

                // Hide the entire wheel section including button and pointer when showing result
                const wheelSection = spinWheel.querySelector<HTMLElement>('div[style*="position: relative"]');
                if (wheelSection) {
                    wheelSection.style.display = "none";
                }

                // Also hide the spin button and pointer specifically
                const spinButtonElement = spinWheel.querySelector<HTMLElement>('.spin-button');
                const pointerElement = spinWheel.querySelector<HTMLElement>('.pointer');
                if (spinButtonElement) spinButtonElement.style.display = "none";
                if (pointerElement) pointerElement.style.display = "none";

                // Remove background-color and box-shadow from spin-wheel-container
                spinWheel.style.backgroundColor = "transparent";
                spinWheel.style.boxShadow = "none";

                // 8️⃣ Win / Lose screen - exact styles from components
                if (landedItem.loseOption === "on") {
                    // Show lose screen with exact LosingScreen component styles
                    const losingImageSrcLink = losingImgSrc ? `https://image-staging-ap1.moengage.com/${losingImgSrc}` : "https://campaign-assets-pp.moengage.com/inbound/inapp/html_inapp/campaigns/zain_inapp/17522326677815583_r7jgi7/17522337977649086_mrli8k/assets/1752234344573518_msc/loose-icon.png";

                    resultDisplay.style.display = "block";
                    resultDisplay.innerHTML = `
                    <div style="
                        background-color: white;
                        padding: 15px 10px;
                        border-radius: 12px;
                        text-align: center;
                        width: 320px;
                        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                        margin: 0px;
                        font-family: Arial, sans-serif;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    ">
                        <img
                            src="${losingImageSrcLink}"
                            alt="Empty box"
                            style="width: 80px; height: 80px; ${losingImgMargin}; ${losingImgPadding}; ${losingImgBorder};"
                        />
                        <h2 style="
                            font-size: ${losingText1Fontsize}px;
                            font-weight: bold;
                            color: ${losingText1Fontcolor};
                            background-color: ${losingText1BgColor};
                            margin: 10px 0;
                            ${losingText1Margin};
                            ${losingText1Padding};
                            ${losingText1Border};
                            ${losingText1BorderRadius};
                        ">
                            ${losingText1Title}
                        </h2>
                    </div>
                `;
                } else {
                    // Show win screen with exact Won component structure and styling
                    const couponBoxSizeMap = { small: '180px', medium: '200px', large: '220px' };
                    const couponBoxWidth = couponBoxSizeMap[winningCouponboxSize as keyof typeof couponBoxSizeMap] || '200px';
                    const winningImageSrcLink = winningImgSrc ? `https://image-staging-ap1.moengage.com/${winningImgSrc}` : "https://cdn.moengage.com/inapp/html-template5/assets/img/win-icon.png";

                    // CSS strings are already formatted, use them directly
                    console.log('Style values:', {
                        winningImgMargin,
                        winningImgPadding,
                        winningImgBorder,
                        winningText1Margin,
                        winningText1Padding,
                        winningText1Border,
                        winningText1BorderRadius,
                        winningText2Margin,
                        winningText2Padding,
                        winningText2Border,
                        winningText2BorderRadius,
                        winningCouponBoxMargin,
                        winningCouponBoxPadding,
                        winningCouponBoxBorder,
                        winningCouponBoxBorderRadius,
                        losingImgMargin,
                        losingImgPadding,
                        losingImgBorder,
                        losingText1Margin,
                        losingText1Padding,
                        losingText1Border,
                        losingText1BorderRadius
                    });
                    resultDisplay.style.display = "block";
                    resultDisplay.innerHTML = `
                    <div style="
                        background-color: ${winningCouponBoxBgColor};
                        padding: 15px 10px;
                        border-radius: 12px;
                        text-align: center;
                        width: 320px;
                        // box-shadow: 0 10px 25px rgba(0,0,0,0.1);
                        font-family: Arial, sans-serif;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    ">
                        <div>
                            <img
                                src="${winningImageSrcLink}"
                                alt="Gift box prize"
                                style="width: 80px; height: 80px; ${winningImgMargin}; ${winningImgPadding}; ${winningImgBorder};"
                            />
                            <p style="
                                font-size: ${winningText1Fontsize}px;
                                color: ${winningText1Fontcolor};
                                background-color: ${winningText1BgColor};
                                margin: 10px 0 5px 0;
                                ${winningText1Margin};
                                ${winningText1Padding};
                                ${winningText1Border};
                                ${winningText1BorderRadius};
                            ">
                                ${winningText1Title}
                            </p>
                            <p style="
                                font-size: 22px;
                                font-weight: bold;
                                color: #222;
                                margin: 0 0 15px 0;
                            ">
                                ${landedItem.title || '20% OFF'}
                            </p>
                        </div>
                        <div style="
                            border-radius: 8px;
                            padding: 12px;
                            display: flex;
                            justify-content: ${winningCouponBoxGiveIcon !== 'on' ? 'end' : 'space-between'};
                            align-items: center;
                            cursor: pointer;
                            background-color: ${winningCouponBoxColor};
                            border: 1px solid #e6d4f7;
                            transition: background-color 0.3s;
                            width: ${couponBoxWidth};
                            margin-bottom: 10px;
                            ${winningCouponBoxMargin};
                            ${winningCouponBoxPadding};
                            ${winningCouponBoxBorder};
                            ${winningCouponBoxBorderRadius};
                        " onclick="MoeOsm.copyText('.copy-code');navigator.clipboard.writeText('${landedItem.couponCode}');MoeOsm.trackClick('spin-copy-code');">
                            <span class="copy-code" style="
                                color: ${winningCouponBoxFontcolor};
                                font-weight: bold;
                                font-size: ${winningCouponBoxFontsize}px;
                                letter-spacing: 1px;
                                margin: 0;
                                margin-right: 40px;
                            ">
                                ${landedItem.couponCode}
                            </span>
                            ${winningCouponBoxGiveIcon === 'on' ? `
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="${winningCouponBoxGiveIconColor}">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
                            </svg>
                            ` : ''}
                        </div>
                        <p style="
                            font-size: ${winningText2Fontsize}px;
                            color: ${winningText2Fontcolor};
                            background-color: ${winningText2BgColor};
                            margin: 0;
                            ${winningText2Margin};
                            ${winningText2Padding};
                            ${winningText2Border};
                            ${winningText2BorderRadius};
                        ">
                            ${winningText2Title}
                        </p>
                    </div>
                `;
                }

                console.log(
                    `Pointer: ${pointerPos}, index: ${landedIndex}, sector: ${landedItem.title}, score: ${landedItem.score}`
                );
            }, 3000); // match CSS transition duration
        };

        // Store the spin function for this wheel instance
        (window as any).__spinWheelInstances.set(spinWheel, spinFunction);

        // Check if spin-wheel-box-is-form is "on" - if so, don't add click listener
        const isFormMode = spinWheel.dataset.spinWheelBoxIsForm === "on";

        if (!isFormMode) {
            spinButton.addEventListener("click", spinFunction);
        }
    });
}

if (document.readyState === "complete") {
    init();
} else {
    document.addEventListener("DOMContentLoaded", init, false);
} 

export {};
