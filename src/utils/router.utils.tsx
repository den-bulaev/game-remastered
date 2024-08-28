/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

export enum ERoutes {
  ROOT = "/",
  MAIN = "/main",
  GREETING = "/greeting",
}

export const getRoute = (route: ERoutes) => {
  return `${import.meta.env.VITE_BASE_URL}${route}`;
};

const LazyAuthorization = lazy(() => import("../pages/Authorization"));
const LazyGreeting = lazy(() => import("../pages/Greeting"));
const LazyGame = lazy(() => import("../pages/Game"));

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
