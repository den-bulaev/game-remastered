import { RouterProvider } from "react-router-dom";
import { router } from "./utils/router.utils";
import { UserContext } from "./contexts";
import { useState } from "react";
import { IUser } from "./interfaces";

function App() {
  const [user, setUser] = useState<IUser>({ name: "" });

  return (
    <main>
      <UserContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </UserContext.Provider>
    </main>
  );
}

export default App;
