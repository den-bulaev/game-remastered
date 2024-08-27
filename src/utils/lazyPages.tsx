import { lazy } from "react";

export const LazyAuthorization = lazy(() => import("../pages/Authorization"));
export const LazyGreeting = lazy(() => import("../pages/Greeting"));
export const LazyGame = lazy(() => import("../pages/Game"));
