import * as Linking from "expo-linking";
import { ToastHelper } from "./ToastHelpers";

export class LinkingHelper {
  static open = async (url: string) => {
    if (!Linking.canOpenURL(url)) {
      ToastHelper.error("Cannot perform this action");
      return;
    }
    await Linking.openURL(url);
    console.log("here");
  };
}
