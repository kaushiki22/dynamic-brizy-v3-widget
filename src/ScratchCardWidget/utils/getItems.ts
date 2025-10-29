import { camelCase } from "./string";
import { Data, Types } from "../types";

export function getItems(props: Types): Array<Data> {
  const items = props.scratchCardItems || [];
  return items.map((item: any) => {
    const groupId = item.id;
    const titleKey = camelCase(["scratchCardItems", groupId, "title"]);
    const couponCodeKey = camelCase(["scratchCardItems", groupId, "couponCode"]);
    const loseOptionKey = camelCase(["scratchCardItems", groupId, "LooseOption"]);
    const scoreKey = camelCase(["scratchCardItems", groupId, "score"]);

    return {
      id: groupId,
      title: String(props[titleKey] ?? ""),
      couponCode: String(props[couponCodeKey] ?? ""),
      loseOption: String(props[loseOptionKey] ?? ""),
      score: typeof props[scoreKey] === "number" ? props[scoreKey] : 0,
    };
  });
}
