import { Props } from "../types";
import { camelCase } from "./string";

interface Data {
  score: number;
  title: string;
  couponCode: string;
  sectorColor: string,
  image: string,
  loseOption: string,
  fontColor: string;
  fontSize: number;
}

export function getItems(props: Props): Array<Data> {
  const items = props.spinItems || [];
  return items.map((item) => {
    const groupId = item.id;
    const titleKey = camelCase(["spinItems", groupId, "title"]);
    const scoreKey = camelCase(["spinItems", groupId, "score"]);
    const fontSizeKey = camelCase(["spinItems", groupId, "fontSize"]);
    const fontColorKey = camelCase(["spinItems", groupId, "fontColor"]);
    const sectorColorKey = camelCase(["spinItems", groupId, "sectorColor"]);
    const couponCodeKey = camelCase(["spinItems", groupId, "couponCode"]);
    const uploadImageKey = camelCase(["spinItems", groupId, "UploadImageImageSrc"]);
    const looseOptionKey = camelCase(["spinItems", groupId, "looseOption"]);

    // Handle image data structure properly
    const imageData = props[uploadImageKey];
    let imageSrc = "";
    if (imageData && typeof imageData === "object" && "src" in imageData) {
      imageSrc = String(imageData.src || "");
    } else if (typeof imageData === "string") {
      imageSrc = imageData;
    }

    return {
      title: String(props[titleKey] ?? ""),
      score: typeof props[scoreKey] === "number" ? props[scoreKey] : 0,
      fontSize: typeof props[fontSizeKey] === "number" ? props[fontSizeKey] : 16,
      fontColor: String(props[fontColorKey] ?? "#000"),
      sectorColor: String(props[sectorColorKey] ?? "#fff"),
      couponCode: String(props[couponCodeKey] ?? ""),
      image: imageSrc,
      loseOption: String(props[looseOptionKey] ?? ""),
    };
  });
}
