import React, { useMemo, useState, useEffect } from "react";
import { Items } from "../controls/Items";
import { Won } from "../controls/Won";
import { LosingScreen } from "../controls/Lose";
import { Wrapper } from "../controls/Wrapper";
import { Props } from "../types";
import { getItems } from "../utils/getItems";

export const Editor = (props: Props): React.ReactElement => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [screenState, setScreenState] = useState<"wheel" | "win" | "lose">("wheel");

  const items = getItems(props);
  const activeTab = props["settingsTabs"] || "default";

  // 🔹 Reset screenState when changing tabs in the editor
  useEffect(() => {
    if (activeTab === "default") {
      setScreenState("wheel");
    } else if (activeTab === "winning-screen") {
      setScreenState("win");
    } else if (activeTab === "losing-screen") {
      setScreenState("lose");
    }
  }, [activeTab]);

  const spinWheel = () => {
    if (!items || items.length === 0) return;

    setSpinning(true);

    const sectorAngle = 360 / items.length;

    // 1️⃣ Find highest score winner(s)
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

    const pointerPos =
      typeof props["pointer-position"] === "string"
        ? props["pointer-position"]
        : "top";
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

    setRotation(finalRotation);

    // 7️⃣ Countdown for spin animation, then decode winner
    setTimeout(() => {
      setSpinning(false);

      // Adjust rotation so pointer is treated as top
      const adjusted = (finalRotation - pointerOffset + 360) % 360;

      // Index of winning sector
      let landedIndex =
        Math.floor((items.length - adjusted / sectorAngle) % items.length);

      if (landedIndex < 0) landedIndex += items.length;

      setSelectedIndex(landedIndex);

      // 8️⃣ Win / Lose screen
      if (items[landedIndex].loseOption === "on") {
        setScreenState("lose");
      } else {
        setScreenState("win");
      }

      console.log(
        `Pointer: ${pointerPos}, index: ${landedIndex}, sector: ${items[landedIndex].title}`
      );
    }, 5000); // match CSS transition
  };

  const style = useMemo(
    () => ({
      transform: `rotate(${rotation}deg)`,
      transition: spinning ? "transform 3s ease-out" : "none"
    }),
    [rotation, spinning]
  );
  return (
    <Wrapper>
      {activeTab === "default" && screenState === "wheel" && (
        <Items
          items={items}
          spinning={spinning}
          style={style}
          onSpinStart={props['spin-wheel-box-is-form'] === 'on' ? () => {} : spinWheel}
          extraProps={props}
        />
      )}

      {/* 🔹 Only show Won OR LosingScreen, never both */}
      {screenState === "win" && (
        <Won
          data={{
            title: selectedIndex !== undefined ? items[selectedIndex].title : "",
            couponCode:
              selectedIndex !== undefined ? items[selectedIndex].couponCode : ""
          }}
          extraProps={props}
        />
      )}

      {screenState === "lose" && (
        <LosingScreen
          message={
            typeof props["losing-text1-title"] === "string"
              ? props["losing-text1-title"]
              : "Sorry, You didn't win anything"
          }
          extraProps={props}
        />
      )}
    </Wrapper>
  );
};