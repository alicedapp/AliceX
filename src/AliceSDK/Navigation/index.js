import { NativeModules } from "react-native";

const goBack = () => NativeModules.NativeVCModule.popBack();

const goHome = () => NativeModules.NativeVCModule.popToRootVC();

export const Navigation = {
  goBack,
  goHome
};
