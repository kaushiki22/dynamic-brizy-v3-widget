import React, { useEffect, useRef, useState } from "react";
import { getItems } from "../utils/getItems";
import "../index.scss";


interface EditorProps {
  couponData?: string;
  winScreen?: string;
  loseScreen?: string;
  label?: string;
}

export const Editor: React.FC<EditorProps> = (props) => {
  const items = getItems(props);
  const { label } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [resultText, setResultText] = useState("");
  const rawCoupons = items || [];
  const couponSignature = JSON.stringify(rawCoupons || []);

  console.log("CHECK PROPS IN EDITOR", { props, items })
  const pickWinner = () => {
    const rand = Math.random() * 100;
    let sum = 0;
    for (const item of rawCoupons) {
      sum += item.couponWeight;
      if (rand <= sum) return item;
    }
    return rawCoupons[rawCoupons.length - 1];
  };

  const revealResult = () => {
    const { winScreen, loseScreen } = props;
    const winner = pickWinner();
    if (winner.couponWin === "yes") {
      setResultText(`🎉 ${winScreen || 'You won'}: ${winner.couponName}`);
    } else {
      setResultText(`😢 ${loseScreen || 'Better luck next time!'}`);
    }
    setRevealed(true);
  };

  useEffect(() => {
    setRevealed(false);
    setResultText("");
    // canvas setup logic
  }, [couponSignature]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Always reset state and canvas
    setRevealed(false);
    setResultText("");

    // Reset canvas content
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#CCCCCC";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

    canvas.addEventListener("mousemove", scratch as EventListener);
    canvas.addEventListener("touchmove", scratch as EventListener);
    return () => {
      canvas.removeEventListener("mousemove", scratch as EventListener);
      canvas.removeEventListener("touchmove", scratch as EventListener);
    };

  }, [items]);


  return (
    <div key={couponSignature + revealed} className="scratch-card-main-component">
      <div className="preview-card">
        <h3>{label || 'Scratch & Win'}</h3>
        {revealed ? (
          <div className="result-card">{resultText}</div>
        ) : (
          <canvas ref={canvasRef} width={200} height={150}></canvas>
        )}
      </div>
    </div>
  );
};