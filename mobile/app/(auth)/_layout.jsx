import { Stack, Redirect } from 'expo-router';
import { useAuthRedirect } from '../../hooks/useAuthRedirect';

const _layout = () => {
    useAuthRedirect() ? <Redirect href="/" /> : null;
    return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    );
}

export default _layout