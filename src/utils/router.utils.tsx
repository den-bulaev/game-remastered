import { createBrowserRouter } from "react-router-dom";
import Authorization from "../pages/Authorization";
import Game from "../pages/Game";
import Greeting from "../pages/Greeting";

export enum ERoutes {
  ROOT = "/",
  MAIN = "/main",
  GREETING = "/greeting",
}

export const router =createBrowserRouter([
  {
    path: ERoutes.ROOT,
    element: <Authorization />,
  },
  {
    path: ERoutes.GREETING,
    element: <Greeting />,
  },
  {
    path: ERoutes.MAIN,
    element: <Game />,
  },
]);
