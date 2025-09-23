
import { Brizy } from "@brizy/core";
import { Editor } from "./Editor";
import { View } from "./View";
import { getToolbar } from "./toolbar";
import "./index.scss";

Brizy.registerComponent({
  id: "Brizy.ThirdParty.MoScratchCard",
  component: {
    editor: Editor,
    view: View
  },
  title: "Scratch Card",
  category: "custom",
  options: getToolbar
});
