import { camelCase } from "./string";

export function getItems(props: {couponItem ?: { id: string }[] } & Record<string, any>){
    const items = props.couponItem || [];

  return items.map(({ id: groupId }: { id: string }) => {
      const couponTitleKey = camelCase(["couponItem", groupId, "Coupon name"]);
    const couponWeightKey = camelCase(["couponItem", groupId, "Coupon weight"]);
    const couponWinKey = camelCase(["couponItem", groupId, "Coupon win"]);
      const couponName = props[couponTitleKey];
    const couponWeight = props[couponWeightKey];
    const couponWin = props[couponWinKey];

    return {
        couponName: `${couponName}`,
        couponWeight: typeof couponWeight === "number" ? couponWeight : 0,
        couponWin: `${couponWin || 'yes'}`,
    };
  });
}
