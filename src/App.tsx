import { Suspense, useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import Loader from "./components/Loader";

import { router } from "./utils/router.utils";
import AppContext from "./context";
import { ELocalStorageKeys } from "./utils/localStorageKeys";

function App() {
  useEffect(() => {
    localStorage.removeItem(ELocalStorageKeys.IS_FULLSCREEN);
  }, []);

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
