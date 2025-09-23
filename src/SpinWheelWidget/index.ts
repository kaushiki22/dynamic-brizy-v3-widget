import { Brizy } from "@brizy/core";
import { Editor } from "./Editor";
import { View } from "./View";
import "./index.scss";
import { getToolbar } from "./toolbar";

const Map = { Editor, View };

export default Map;

Brizy.registerComponent({
  id: "Brizy.ThirdParty.Spin",
  component: {
    editor: Editor,
    view: View,
  },
  title: "Spin check 123",
  icon: "nc-counter-outline",
  category: "custom",
  options: getToolbar,
});
