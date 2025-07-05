// import { Stack } from "expo-router";
import { Slot } from "expo-router"
import { Provider } from "react-redux";
import store from "../redux/store";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Slot />
      <Toast />
    </Provider>
  )
}
