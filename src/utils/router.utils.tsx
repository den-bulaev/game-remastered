import { createBrowserRouter } from "react-router-dom";

import Authorization from "../pages/Authorization";
import Game from "../pages/Game";
import Greeting from "../pages/Greeting";

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
