import { createBrowserRouter } from "react-router-dom";
import { LazyAuthorization, LazyGame, LazyGreeting } from "./lazyPages";

export enum ERoutes {
  ROOT = "/",
  MAIN = "/main",
  GREETING = "/greeting",
}

export const getRoute = (route: ERoutes) => {
  return `${import.meta.env.VITE_BASE_URL}${route}`;
};

export const router = createBrowserRouter([
  {
    path: getRoute(ERoutes.ROOT),
    element: <LazyAuthorization />,
  },
  {
    path: getRoute(ERoutes.GREETING),
    element: <LazyGreeting />,
  },
  {
    path: getRoute(ERoutes.MAIN),
    element: <LazyGame />,
  },
]);
