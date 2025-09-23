document.addEventListener("DOMContentLoaded", () => {
    const scratchCards = document.querySelectorAll<HTMLDivElement>(".scratch-card-main-component");

    scratchCards.forEach((card) => {
        const canvas = card.querySelector<HTMLCanvasElement>("canvas");
        const resultDisplay = card.querySelector<HTMLDivElement>(".result-card");

        if (!canvas || !resultDisplay) {
            console.error("Canvas or result display not found for scratch card.");
            return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let revealed = false;

        const revealResult = () => {
            const options = card.getAttribute("data-coupons");
            let items: any[] = [];
            try {
                items = JSON.parse(options || "[]");
            } catch (e) {
                console.error("Invalid coupon data");
            }

            const rand = Math.random() * 100;
            let sum = 0;
            let winner = items[items.length - 1];

            for (const item of items) {
                sum += item.couponWeight;
                if (rand <= sum) {
                    winner = item;
                    break;
                }
            }

            if (winner.couponWin === "yes") {
                resultDisplay.textContent = `🎉 You won: ${winner.couponName}`;
            } else {
                resultDisplay.textContent = '😢 Better luck next time!';
            }

            revealed = true;
            resultDisplay.style.display = "block";
        };

        const scratch = (e: MouseEvent | TouchEvent) => {
            if (revealed) return;

            let x: number, y: number;
            if (e instanceof MouseEvent) {
                x = e.offsetX;
                y = e.offsetY;
            } else {
                const touch = e.touches[0];
                const rect = canvas.getBoundingClientRect();
                x = touch.clientX - rect.left;
                y = touch.clientY - rect.top;
            }

            ctx.globalCompositeOperation = "destination-out";
            ctx.beginPath();
            ctx.arc(x, y, 20, 0, 2 * Math.PI);
            ctx.fill();

            checkScratchProgress();
        };

        const checkScratchProgress = () => {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let scratched = 0;
            for (let i = 0; i < imageData.data.length; i += 4) {
                if (imageData.data[i + 3] < 128) scratched++;
            }
            const percent = (scratched / (canvas.width * canvas.height)) * 100;
            if (percent > 60 && !revealed) {
                revealResult();
            }
        };

        // Initialize scratch surface
        ctx.globalCompositeOperation = "source-over";
        ctx.fillStyle = "#CCCCCC";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        canvas.addEventListener("mousemove", scratch as EventListener);
        canvas.addEventListener("touchmove", scratch as EventListener);
    });
});

export { };