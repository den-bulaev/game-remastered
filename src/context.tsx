import { createContext, useState } from "react";
import { IUser } from "./interfaces";

interface IUserContext {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export const UserContext = createContext<IUserContext | null>(null);

const AppContext: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser>({ name: "" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default AppContext;
