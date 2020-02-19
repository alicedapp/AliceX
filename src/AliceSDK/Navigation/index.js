import { NativeModules } from "react-native";

const goBack = () => NativeModules.NativeVCModule.popBack();

const goHome = () => NativeModules.NativeVCModule.popToRootVC();

const minimizeApp = () => NativeModules.NativeVCModule.minimizeApp();

export const Navigation = {
  goBack,
  goHome,
  minimizeApp
};
