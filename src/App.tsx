import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";

import Loader from "./components/Loader";

import { router } from "./utils/router.utils";
import AppContext from "./context";

function App() {
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
