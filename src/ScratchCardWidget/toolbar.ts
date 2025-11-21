import { ToolbarConfig, ToolbarGetter } from "@brizy/core";

type GetToolbar = (props: ToolbarGetter) => ToolbarConfig[];

export const getToolbar: GetToolbar = ({ t }) => {
  return [
    {
      selector: ".scratch-card-main-component",
      toolbar: [
        {
          id: "toolbarCurrentElement",
          type: "popover",
          config: {
            icon: "nc-styling-all",
            title: "Spin",
          },
          position: 90,
          options: [
            {
              id: "grid-control",
              type: "grid",
              columns: [
                {
                  id: "grid-settings",
                  size: 1,
                  options: [
                    {
                      id: "button",
                      type: "sidebarTabsButton",
                      config: {
                        icon: "nc-settings",
                        text: "Settings"
                      }
                    }
                  ]
                },
                {
                  id: "grid-sectors",
                  size: 1,
                  options: [
                    {
                      id: "scratchCardItems",
                      type: "addable",
                      config: {
                        title: "Scratch card",
                        showCount: true,
                      },
                      shape: [
                        {
                          id: "score",
                          label: t("Set win %"),
                          type: "number",
                          default: 0
                        },
                        {
                          id: "title",
                          label: t("Title"),
                          type: "inputText",
                          default: ""
                        },
                        {
                          id: "couponCode",
                          label: t("Coupon code"),
                          type: "inputText",
                          default: ""
                        },
                        {
                          id: 'looseOption',
                          label: t('Lose option'),
                          type: 'switch',
                        }
                      ],
                    }
                  ]
                }
              ]
            }
          ],
        }
      ],
      sidebar: [
        {
          id: "sidebarTabs",
          type: "sidebarTabs",
          tabs: [
            {
              id: "scratch-card",
              title: "Scratch card",
              label: "Scratch card",
              devices: "all",
              options: [
                {
                  id: "scratch-card-settingsTabs",
                  type: "tabs",
                  default: {
                    value: "default"
                  },
                  config: { saveTab: true },
                  tabs: [
                    {
                      id: "scratch-card-default-tab",
                      label: "Default",
                      options: [
                        {
                          id: "scratch-card-default-bg-color",
                          type: "inputText",
                          label: "Bg color",
                          default: {
                            value: "#FFFFFF"
                          }
                        },
                        {
                          id: "scratch-card-default-image",
                          label: "Upload image",
                          type: "imageUpload",
                          default: { src: "", fileName: "" }
                        },
                        {
                          id: "scratch-card-box-is-form",
                          label: "Use with form",
                          type: "switch"
                        },
                        { id: "scratch-card-default-margin", label: "Margin", type: "margin" },
                        {
                          id: "scratch-card-default-padding", label: "Padding", type: "padding",
                          config: {
                            units: ["px", "%"],
                            disableUngrouped: true // <- custom flag to hide ungrouped mode in UI
                          },
                          default: {
                            type: "grouped",
                            value: 30,
                            suffix: "px"
                          }
                        },
                      ],
                    },
                    {
                      id: "scratch-card-winning-screen-tab",
                      label: "Winning Screen",
                      options: [
                        {
                          id: "scratch-card-winning-inner-tabs",
                          type: "tabs",
                          // config: { align: "start" },
                          tabs: [
                            {
                              id: "scratch-card-winning-image-customization",
                              label: "Image",
                              options: [
                                {
                                  id: "scratch-card-winning-img-image",
                                  type: "imageUpload",
                                  label: "Upload image",
                                },
                                {
                                  id: "scratch-card-winning-img-border-color",
                                  type: "inputText",
                                  label: "Border color",
                                  default: {
                                    value: "#FFFFFF"
                                  }
                                },
                                {
                                  id: "scratch-card-winning-card-bg-color",
                                  type: "inputText",
                                  label: "Card bg color",
                                  default: {
                                    value: "#FFFFFF"
                                  }
                                },
                                { id: "scratch-card-winning-img-margin", label: "Margin", type: "margin" },
                                { id: "scratch-card-winning-img-padding", label: "Padding", type: "padding" },
                                { id: "scratch-card-winning-img-border-width", label: "Border width", type: "padding" }
                              ],
                            },
                            {
                              id: "scratch-card-winning-text-customization",
                              label: "Text",
                              options: [
                                {
                                  id: "scratch-card-winning-text1-settingsTabs",
                                  type: "tabs",
                                  tabs: [
                                    {
                                      id: "scratch-card-winning-text1",
                                      label: "Text1",

                                      options: [
                                        {
                                          id: "scratch-card-winning-text1-title",
                                          type: "textarea",
                                          label: "Title",
                                          default: { value: "You won!" },
                                        },
                                        {
                                          id: "scratch-card-winning-text1-fontsize",
                                          type: "number",
                                          label: "Font size",
                                          default: {
                                            value: 20
                                          }
                                        },
                                        {
                                          id: "scratch-card-winning-text1-fontcolor",
                                          type: "inputText",
                                          label: "Font color",
                                          default: {
                                            value: "#1E1E1E"
                                          }
                                        },
                                        {
                                          id: "scratch-card-winning-text1-bg-color",
                                          type: "inputText",
                                          label: "Bg color",
                                          default: {
                                            value: "#FFFFFF"
                                          }
                                        },
                                        {
                                          id: "scratch-card-winning-text1-margin", label: "Margin", type: "margin",
                                          default: {
                                            type: "grouped",
                                            value: 10,
                                            suffix: "px"
                                          }
                                        },
                                        { id: "scratch-card-winning-text1-padding", label: "Padding", type: "padding" },
                                        { id: "scratch-card-winning-text1-border-width", label: "Border width", type: "padding" },
                                        { id: "scratch-card-winning-text1-border-radius", label: "Border radius", type: "padding" },
                                        {
                                          id: "scratch-card-winning-text1-bordercolor",
                                          type: "inputText",
                                          label: "Border color",
                                          default: {
                                            value: "#FFFFFF"
                                          }
                                        }
                                      ],
                                    },
                                  ],
                                },
                              ],
                            },
                            {
                              id: "scratch-card-coupon-box-customization",
                              label: "Coupon box",
                              options: [
                                {
                                  id: "scratch-card-winning-couponbox-size",
                                  label: "Box size",
                                  type: "radioGroup",
                                  default: { value: 'medium' },
                                  choices: [
                                    { value: "small", icon: "nc-small" },
                                    { value: "medium", icon: "nc-medium" },
                                    { value: "large", icon: "nc-large" },
                                  ]
                                },
                                {
                                  id: "scratch-card-winning-couponbox-type",
                                  type: "select",
                                  label: "Box type",
                                  default: { value: 'dashed' },
                                  choices: [
                                    {
                                      value: "dashed",
                                      title: "Dashed"
                                    },
                                    {
                                      value: "solid",
                                      title: "Solid"
                                    },
                                    {
                                      value: "dotted",
                                      title: "Dotted"
                                    },
                                    {
                                      value: "double",
                                      title: "Double"
                                    },

                                  ]
                                },
                                {
                                  id: "scratch-card-winning-coupon-box-fontsize",
                                  type: "number",
                                  label: "Font size",
                                  default: {
                                    value: 16
                                  }
                                },
                                {
                                  id: "scratch-card-winning-coupon-box-fontcolor",
                                  type: "inputText",
                                  label: "Font color",
                                  default: {
                                    value: "#3D5695"
                                  }
                                },
                                {
                                  id: "scratch-card-winning-coupon-box-color",
                                  type: "inputText",
                                  label: "Box color",
                                  default: {
                                    value: "#A1D1DF29"
                                  }
                                },
                                {
                                  id: "scratch-card-winning-coupon-box-give-icon-color",
                                  type: "inputText",
                                  label: "Icon color",
                                  default: {
                                    value: "#3D5695"
                                  }
                                },
                                {
                                  id: "scratch-card-winning-coupon-box-give-icon",
                                  label: "Give copy icon",
                                  default: {
                                    value: "on"
                                  },
                                  type: "switch"
                                },
                                {
                                  id: "scratch-card-winning-coupon-box-margin", label: "Margin", type: "margin",
                                  default: {
                                    type: "grouped",
                                    value: 10,
                                    suffix: "px"
                                  }
                                },
                                {
                                  id: "scratch-card-winning-coupon-box-padding", label: "Padding", type: "padding",
                                  default: {
                                    type: "grouped",
                                    value: 12,
                                    suffix: "px"
                                  }
                                },
                                {
                                  id: "scratch-card-winning-coupon-box-border-width", label: "Border width", type: "padding",
                                  default: {
                                    type: "grouped",
                                    value: 2,
                                    suffix: "px"
                                  }
                                },
                                {
                                  id: "scratch-card-winning-coupon-box-border-radius", label: "Border radius", type: "padding",
                                  default: {
                                    type: "grouped",
                                    value: 8,
                                    suffix: "px"
                                  }
                                },
                                {
                                  id: "scratch-card-winning-coupon-box-border-color",
                                  type: "inputText",
                                  label: "Border color",
                                  default: {
                                    value: "#3D5695"
                                  }
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: "scratch-card-losing-screen-tab",
                      label: "Losing Screen",
                      options: [
                        {
                          id: "scratch-card-losing-inner-tabs",
                          type: "tabs",
                          // config: { align: "start" },
                          tabs: [
                            {
                              id: "scratch-card-image-lose-customization",
                              label: "Image",
                              options: [
                                {
                                  id: "scratch-card-losing-img-image",
                                  type: "imageUpload",
                                  label: "Upload image"
                                },
                                {
                                  id: "scratch-card-losing-img-border-color",
                                  type: "inputText",
                                  label: "Border color",
                                  default: {
                                    value: "#FFFFFF"
                                  }
                                },
                                {
                                  id: "scratch-card-losing-bg-color",
                                  type: "inputText",
                                  label: "Card bg color",
                                  default: {
                                    value: "#FFFFFF"
                                  }
                                },
                                { id: "scratch-card-losing-img-margin", label: "Margin", type: "margin" },
                                { id: "scratch-card-losing-img-padding", label: "Padding", type: "padding" },
                                { id: "scratch-card-losing-img-border-width", label: "Border width", type: "padding" }
                              ],
                            },
                            {
                              id: "scratch-card-text-lose-customization",
                              label: "Text",
                              options: [
                                {
                                  id: "scratch-card-losing-text1-title",
                                  type: "textarea",
                                  label: "Title",
                                  default: { value: "Better luck next time" }
                                },
                                {
                                  id: "scratch-card-losing-text1-fontsize",
                                  type: "number",
                                  label: "Font size",
                                  default: { value: 16 }
                                },
                                {
                                  id: "scratch-card-losing-text1-fontcolor",
                                  type: "inputText",
                                  label: "Font color",
                                  default: {
                                    value: "#1E1E1E"
                                  }
                                },
                                {
                                  id: "scratch-card-losing-text1-bg-color",
                                  type: "inputText",
                                  label: "Bg color",
                                  default: {
                                    value: "#FFFFFF"
                                  }
                                },
                                {
                                  id: "scratch-card-losing-text1-margin", label: "Margin", type: "margin",
                                  default: {
                                    type: "grouped",
                                    value: 10,
                                    suffix: "px"
                                  }
                                },
                                { id: "scratch-card-losing-text1-padding", label: "Padding", type: "padding" },
                                { id: "scratch-card-losing-text1-border-width", label: "Border width", type: "padding" },
                                { id: "scratch-card-losing-text1-border-radius", label: "Border radius", type: "padding" },
                                {
                                  id: "scratch-card-losing-text1-bordercolor",
                                  type: "inputText",
                                  label: "Border color",
                                  default: {
                                    value: "#FFFFFF"
                                  }
                                }
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: "settingsStyling",
                      label: "Basic",
                      options: [
                        { id: "margin", type: "margin", disabled: true },
                        { id: "padding", type: "padding", disabled: true },
                        { id: "showOnDevice", type: "switch", disabled: true },
                      ],
                    },
                    {
                      id: "moreSettingsAdvanced",
                      label: "Advanced",
                      options: [
                        { id: "zIndex", type: "slider", disabled: true },
                        { id: "customID", type: "inputText", disabled: true },
                        { id: "customClassName", type: "inputText", disabled: true },
                      ],
                    }
                  ],
                },
              ],
            }
          ],
        },
      ],
    },
  ];
};
