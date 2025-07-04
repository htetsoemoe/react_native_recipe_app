import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../redux/auth/authSelectors";

export const useAuthRedirect = () => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const router = useRouter();

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/(auth)/SignIn");
        }
    }, [isAuthenticated]);
}