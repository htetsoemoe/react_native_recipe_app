import { useRouter } from 'expo-router';

let globalRouter = null;

export const setGlobalRouter = (router) => {
    globalRouter = router;
};

export function navigate(name) {
    if (globalRouter) {
        globalRouter.push(name);
    } else {
        console.warn('Router is not initialized yet.');
    }
}