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

const Authorization = lazy(() => import("../pages/Authorization"));
const Greeting = lazy(() => import("../pages/Greeting"));
const Game = lazy(() => import("../pages/Game"));

export const router = createBrowserRouter([
  {
    path: getRoute(ERoutes.ROOT),
    element: <Authorization />,
  },
  {
    path: getRoute(ERoutes.GREETING),
    element: <Greeting />,
  },
  {
    path: getRoute(ERoutes.MAIN),
    element: <Game />,
  },
]);
