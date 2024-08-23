import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router.utils";
import AppContext from "./context";

function App() {
  return (
    <main>
      <AppContext>
        <RouterProvider router={router} />
      </AppContext>
    </main>
  );
}

export default App;
