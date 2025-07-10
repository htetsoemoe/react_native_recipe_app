// import { Stack } from "expo-router";
import { Slot } from "expo-router"
import { Provider } from "react-redux";
import store from "../redux/store";
import Toast from 'react-native-toast-message';
import SafeScreen from '@/components/SafeScreen';
import AuthRouter from '../components/AuthRouter';
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

function Root() {
  useAuthRedirect(); // works only after token loaded by AuthLoader
  return (
    <SafeScreen>
      <Slot />
      <Toast />
    </SafeScreen>
  )
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <AuthRouter>
        <Root />
      </AuthRouter>
    </Provider>
  )
}

/*
AuthLoader waits for the token to load from AsyncStorage and sets it in Redux.
Once loaded, useAuthRedirect triggers redirect based on whether token exists.
Slot will render the current route once redirection is resolved.
*/