import { getItems } from "../utils/getItems";
import "../index.scss"

interface Props {
  couponData?: string;
  winScreen?: string;
  loseScreen?: string;
  label?: string;
}

export default {
  name: "Scratch Card",
  description: "Scratch to reveal exciting prizes!",
  author: "Your Name or Brand",
  showInLibrary: true,

  View: (props: Props) => {
    const items = getItems(props);
    const { label, winScreen, loseScreen } = props;
    const couponSignature = JSON.stringify(items);

    return (
      <div
        key={couponSignature}
        className="scratch-card-main-component"
        data-coupons={JSON.stringify(items)}
      >
        <div className="preview-card">
          <h3>{label || "Scratch & Win"}</h3>
          <canvas width={200} height={150}></canvas>
          <div className="result-card" style={{ display: "none" }}></div>
        </div>
      </div>
    );
  },
};