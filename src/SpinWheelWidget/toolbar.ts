import { ToolbarConfig, ToolbarGetter } from "@brizy/core";

type GetToolbar = (props: ToolbarGetter) => ToolbarConfig[];

export const getToolbar: GetToolbar = ({ t }) => {
  return [
    {
      selector: ".spin-wheel-container",
       toolbar: [
          {
            id: "toolbarCurrentElement",
            type: "popover",
            config: {
              icon: "nc-uncheck",
              title: "Spin",
            },
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
                          text: "Settings",
                        },
                      },
                    ],
                  },
                  {
                    id: "grid-sectors",
                    size: 1,
                    options: [
                      {
                        id: "spinItems",
                        type: "addable",
                        config: {
                          title: "Sectors",
                          showCount: false,
                          extraLabel: `items`,
                        },
                        shape: [
                          {
                            id: "score",
                            label: "Set win %",
                            type: "number",
                            default: 0,
                          },
                          {
                            id: "title",
                            label: "Title",
                            type: "inputText",
                            default: "",
                          },
                          {
                            id: "fontSize",
                            label: "Font size",
                            type: "number",
                            default: 14,
                          },
                          {
                            id: "fontColor",
                            label: "Font color",
                            type: "inputText",
                            default: "#FFFFFF",
                          },
                          {
                            id: "sectorColor",
                            label: "Sector color",
                            type: "inputText",
                            default: "#FFFFFF",
                          },
                          {
                            id: "couponCode",
                            label: "Coupon code",
                            type: "inputText",
                            default: "",
                          },
                          {
                            id: "uploadImage",
                            label: "Upload image",
                            type: "imageUpload",
                            default: {
                              src: "",
                              fileName: "",
                            },
                          },
                          {
                            id: "looseOption",
                            label: "Loose option",
                            type: "switch",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      sidebar: [
        {
          id: "sidebarTabs",
          type: "sidebarTabs",
          tabs: [
            {
              id: "spin",
              title: "Spin",
              label: "Spin",
              devices: "all",
              options: [
                {
                  id: "settingsTabs",
                  type: "tabs",
                  default: {
                    value: "default"
                  },
                  config: { saveTab: true },
                  tabs: [
                    {
                      id: "default",
                      label: "Default",
                      options: [
                        {
                          id: "Wheel-pointer-size",
                          label: "Wheel pointer size",
                          type: "radioGroup",
                          default: { value: 'medium' },
                          choices: [
                            { value: "small", icon: "nc-small" },
                            { value: "medium", icon: "nc-medium" },
                            { value: "large", icon: "nc-large" },
                          ]
                        },
                        {
                          id: "spin-wheel-box-is-form",
                          label: "Use with form",
                          type: "switch"
                        },
                        {
                          id: "pointer-position",
                          type: "select",
                          label: "Pointer position",
                          default: { value: 'top' },
                          choices: [
                            {
                              value: "top",
                              title: "Top"
                            },
                            {
                              value: "bottom",
                              title: "Bottom"
                            },
                            {
                              value: "left",
                              title: "Left"
                            },
                            {
                              value: "right",
                              title: "Right"
                            },
                          ]
                        },
                        {
                          id: "default-bg-color",
                          type: "inputText",
                          label: "Bg color",
                          default: {
                            value: "#FFFFFF"
                          }
                        },
                        {
                          id: "default-pointer-color",
                          type: "inputText",
                          label: "Pointer color",
                          default: {
                            value: "#EF4444"
                          }
                        },
                        {
                          id: "default-border-color",
                          type: "inputText",
                          label: "Border color",
                          default: {
                            value: "#FFFFFF"
                          }
                        },
                        {
                          id: "default-spin-btn-color",
                          type: "inputText",
                          label: "Spin button color",
                          default: {
                            value: "#ef4444"
                          }
                        },
                        {
                          id: "default-spin-btn-text",
                          type: "inputText",
                          label: "Spin button text",
                          default: {
                            value: "SPIN"
                          }
                        },
                        { id: "spin-screen-margin", label: "Margin", type: "margin" },
                        {
                          id: "spin-screen-padding", label: "Padding", type: "padding",
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
                        { id: "spin-screen-border-width", label: "Border width", type: "padding" }
                      ],
                    },
                    {
                      id: "winning-screen",
                      label: "Winning Screen",
                      options: [
                        {
                          id: "winning-inner-tabs",
                          type: "tabs",
                          // config: { align: "start" },
                          tabs: [
                            {
                              id: "image-customization",
                              label: "Image",
                              options: [
                                {
                                  id: "winning-img-image",
                                  type: "imageUpload",
                                  label: "Upload image",
                                },
                                {
                                  id: "winning-img-border-color",
                                  type: "inputText",
                                  label: "Border color",
                                  default: {
                                    value: "#FFFFFF"
                                  }
                                },
                                { id: "winning-img-margin", label: "Margin", type: "margin" },
                                { id: "winning-img-padding", label: "Padding", type: "padding" },
                                { id: "winning-img-border-width", label: "Border width", type: "padding" }
                              ],
                            },
                            {
                              id: "text-customization",
                              label: "Text",
                              options: [
                                {
                                  id: "winning-text1-settingsTabs",
                                  type: "tabs",
                                  tabs: [
                                    {
                                      id: "text1",
                                      label: "Text1",

                                      options: [
                                        {
                                          id: "winning-text1-title",
                                          type: "textarea",
                                          label: "Title",
                                          default: { value: "Congratulations, you won" },
                                        },
                                        {
                                          id: "winning-text1-fontsize",
                                          type: "number",
                                          label: "Font size",
                                          default: {
                                            value: 16
                                          }
                                        },
                                        {
                                          id: "winning-text1-fontcolor",
                                          type: "inputText",
                                          label: "Font color",
                                          default: {
                                            value: "#1E1E1E"
                                          }
                                        },
                                        {
                                          id: "winning-text1-bg-color",
                                          type: "inputText",
                                          label: "Bg color",
                                          default: {
                                            value: "#FFFFFF"
                                          }
                                        },
                                        {
                                          id: "winning-text1-margin", label: "Margin", type: "margin",
                                          default: {
                                            type: "grouped",
                                            value: 10,
                                            suffix: "px"
                                          }
                                        },
                                        { id: "winning-text1-padding", label: "Padding", type: "padding" },
                                        { id: "winning-text1-border-width", label: "Border width", type: "padding" },
                                        { id: "winning-text1-border-radius", label: "Border radius", type: "padding" },
                                        {
                                          id: "winning-text1-bordercolor",
                                          type: "inputText",
                                          label: "Border color",
                                          default: {
                                            value: "#FFFFFF"
                                          }
                                        }
                                      ],
                                    },
                                    {
                                      id: "text2",
                                      label: "Text2",
                                      options: [
                                        {
                                          id: "winning-text2-title",
                                          type: "textarea",
                                          label: "Title",
                                          default: { value: "copy this code and use during checkout" },
                                        },
                                        {
                                          id: "winning-text2-fontsize",
                                          type: "number",
                                          label: "Font size",
                                          default: { value: 12 }
                                        },
                                        {
                                          id: "winning-text2-fontcolor",
                                          type: "inputText",
                                          label: "Font color",
                                          default: {
                                            value: "#333333"
                                          }
                                        },
                                        {
                                          id: "winning-text2-bg-color",
                                          type: "inputText",
                                          label: "Bg color",
                                          default: {
                                            value: "#FFFFFF"
                                          }
                                        },
                                        {
                                          id: "winning-text2-margin", label: "Margin", type: "margin", default: {
                                            type: "grouped",
                                            value: 10,
                                            suffix: "px"
                                          }
                                        },
                                        { id: "winning-text2-padding", label: "Padding", type: "padding" },
                                        { id: "winning-text2-border-width", label: "Border width", type: "padding" },
                                        { id: "winning-text2-border-radius", label: "Border radius", type: "padding" },
                                        {
                                          id: "winning-text2-bordercolor",
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
                              id: "coupon-box-customization",
                              label: "Coupon box",
                              options: [
                                {
                                  id: "winning-couponbox-size",
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
                                  id: "winning-couponbox-type",
                                  type: "select",
                                  label: "Box type",
                                  default: { value: 'solid' },
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
                                  id: "winning-coupon-box-fontsize",
                                  type: "number",
                                  label: "Font size",
                                  default: {
                                    value: 16
                                  }
                                },
                                {
                                  id: "winning-coupon-box-fontcolor",
                                  type: "inputText",
                                  label: "Font color",
                                  default: {
                                    value: "#333333"
                                  }
                                },
                                {
                                  id: "winning-coupon-box-color",
                                  type: "inputText",
                                  label: "Box color",
                                  default: {
                                    value: "#F6E9FF"
                                  }
                                },
                                {
                                  id: "winning-coupon-box-bg-color",
                                  type: "inputText",
                                  label: "Bg color",
                                  default: {
                                    value: "#FFFFFF"
                                  }
                                },
                                {
                                  id: "winning-coupon-box-give-icon-color",
                                  type: "inputText",
                                  label: "Icon color",
                                  default: {
                                    value: "#9B6FBA"
                                  }
                                },
                                {
                                  id: "winning-coupon-box-give-icon",
                                  label: "Give copy icon",
                                  default: {
                                    value: "on"
                                  },
                                  type: "switch"
                                },
                                {
                                  id: "winning-coupon-box-margin", label: "Margin", type: "margin",
                                  default: {
                                    type: "grouped",
                                    value: 10,
                                    suffix: "px"
                                  }
                                },
                                {
                                  id: "winning-coupon-box-padding", label: "Padding", type: "padding",
                                  default: {
                                    type: "grouped",
                                    value: 12,
                                    suffix: "px"
                                  }
                                },
                                {
                                  id: "winning-coupon-box-border-width", label: "Border width", type: "padding",
                                  default: {
                                    type: "grouped",
                                    value: 2,
                                    suffix: "px"
                                  }
                                },
                                {
                                  id: "winning-coupon-box-border-radius", label: "Border radius", type: "padding",
                                  default: {
                                    type: "grouped",
                                    value: 8,
                                    suffix: "px"
                                  }
                                },
                                {
                                  id: "winning-coupon-box-border-color",
                                  type: "inputText",
                                  label: "Border color",
                                  default: {
                                    value: "#A879CB"
                                  }
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: "losing-screen",
                      label: "Losing Screen",
                      options: [
                        {
                          id: "losing-inner-tabs",
                          type: "tabs",
                          // config: { align: "start" },
                          tabs: [
                            {
                              id: "image-lose-customization",
                              label: "Image",
                              options: [
                                {
                                  id: "losing-img-image",
                                  type: "imageUpload",
                                  label: "Upload image"
                                },
                                {
                                  id: "losing-img-border-color",
                                  type: "inputText",
                                  label: "Border color",
                                  default: {
                                    value: "#FFFFFF"
                                  }
                                },
                                { id: "losing-img-margin", label: "Margin", type: "margin" },
                                { id: "losing-img-padding", label: "Padding", type: "padding" },
                                { id: "losing-img-border-width", label: "Border width", type: "padding" }
                              ],
                            },
                            {
                              id: "text-lose-customization",
                              label: "Text",
                              options: [
                                {
                                  id: "losing-text1-title",
                                  type: "textarea",
                                  label: "Title",
                                  default: { value: "Sorry, You didn't win anything" }
                                },
                                {
                                  id: "losing-text1-fontsize",
                                  type: "number",
                                  label: "Font size",
                                  default: { value: 16 }
                                },
                                {
                                  id: "losing-text1-fontcolor",
                                  type: "inputText",
                                  label: "Font color",
                                  default: {
                                    value: "#1E1E1E"
                                  }
                                },
                                {
                                  id: "losing-text1-bg-color",
                                  type: "inputText",
                                  label: "Bg color",
                                  default: {
                                    value: "#FFFFFF"
                                  }
                                },
                                {
                                  id: "losing-text1-margin", label: "Margin", type: "margin",
                                  default: {
                                    type: "grouped",
                                    value: 10,
                                    suffix: "px"
                                  }
                                },
                                { id: "losing-text1-padding", label: "Padding", type: "padding" },
                                { id: "losing-text1-border-width", label: "Border width", type: "padding" },
                                { id: "losing-text1-border-radius", label: "Border radius", type: "padding" },
                                {
                                  id: "losing-text1-bordercolor",
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