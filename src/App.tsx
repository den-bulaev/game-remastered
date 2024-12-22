import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import Loader from "./components/Loader";

import { router } from "./utils/router.utils";
import AppContext from "./context";
import { ELocalStorageKeys } from "./utils/localStorageKeys";

function App() {
  useEffect(() => {
    document.addEventListener("fullscreenchange", changeFullscreen);
    document.addEventListener("keydown", keyDownF11);

    return () => {
      document.removeEventListener("fullscreenchange", changeFullscreen);
      document.removeEventListener("keydown", keyDownF11);
      localStorage.removeItem(ELocalStorageKeys.IS_FULLSCREEN);
    };
  }, []);

  const changeFullscreen = () => {
    if (document.fullscreenElement) {
      localStorage.setItem(ELocalStorageKeys.IS_FULLSCREEN, "true");
    } else {
      localStorage.removeItem(ELocalStorageKeys.IS_FULLSCREEN);
    }
  };

  const keyDownF11 = (e: KeyboardEvent) => {
    if (e.key === "F11") {
      e.preventDefault();
    }
  };

  return (
    <main>
      <AppContext>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </AppContext>
    </main>
  );
}

export default App;
