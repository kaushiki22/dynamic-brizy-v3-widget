import { ToolbarConfig, ToolbarGetter } from "@brizy/core";

type GetToolbar = (props: ToolbarGetter) => ToolbarConfig[];

export const getToolbar: GetToolbar = ({ t }) => {
  return [
    {
      selector: ".scratch-card-main-component",
      toolbar: [
        {
          id: "settings",
          type: "popover",
          config: { icon: "nc-palette", title: "Scratch Card Settings" },
          position: 90,
          options: [
            {
              id: "winScreen",
              label: "Win message",
              type: "inputText",
              default: {
                value: "Congratulations! You won a coupon!",
              }
            },
            {
              id: "loseScreen",
              label: "Lose message",
              type: "inputText",
              default: {
                value: "Sorry, better luck next time!",
              }
            },
            {
              id: "label",
              label: "Label",
              type: "inputText",
              default: {
                value: "Scratch and Win!",
              }
            }
          ]
        },
        {
          id: "toolbarCurrentElement",
          type: "popover",
          config: {
            icon: "nc-counter-outline",
            title: "Scratch Card Settings",
          },
          // Only for desktop devices
          devices: "desktop",
          position: 90,
          options: [
            {
              id: "couponItem",
              type: "addable",
              config: {
                title: "couponItem",
                showCount: true,
              },
              shape: [
                {
                  id: "coupon name",
                  label: t("Coupon name"),
                  type: "inputText",
                },
                {
                  id: "coupon weight",
                  label: t("Coupon weight"),
                  type: "number",
                },
                {
                  id: "coupon win",
                  label: t("Coupon win"),
                  type: "inputText",
                  default: { value: "yes" },
                },
              ],
            },
          ],
        },
      ],
    },
  ];
};
