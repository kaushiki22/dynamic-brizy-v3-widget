import { Brizy } from "@brizy/core";
import { Editor } from "./Editor";
import { View } from "./View";
import "./index.scss";
import { getToolbar } from "./toolbar";

const Map = { Editor, View };

export default Map;

Brizy.registerComponent({
  id: "Brizy.ThirdParty.1Spin",
  component: {
    editor: Editor,
    view: View,
  },
  title: "1Spin",
  icon: "nc-counter-outline",
  category: "custom",
  options: getToolbar,
});
