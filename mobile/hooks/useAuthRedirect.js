import { use, useEffect } from "react";
import { useRouter, useSegments } from "expo-router";
import { useSelector } from "react-redux";
import { selectIsAuthenticated, selectToken, selectLoading } from "../redux/auth/authSelectors";

export const useAuthRedirect = () => {
    const token = useSelector(selectToken);
    const loading = useSelector(selectLoading);
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (loading) return; // Don't redirect while loading

        const inAuthGroup = segments[0] === "(auth)";
        // console.log(`segments: ${segments[0] === "(auth)"}`);

        if (!token && !inAuthGroup) {
            // Not logged in and trying to access a protected route
            router.replace("/(auth)/SignIn");
        } else if (token && inAuthGroup) {
            // Logged in and trying to access an auth screen
            router.replace("/(tabs)/");  
        }
    }, [token, segments, loading]);
}

// export const useAuthRedirect = () => {
//     const isAuthenticated = useSelector(selectIsAuthenticated);
//     const router = useRouter();

//     useEffect(() => {
//         if (!isAuthenticated) {
//             router.replace("/(auth)/SignIn");
//         }
//     }, [isAuthenticated]);
// }