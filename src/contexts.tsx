import { createContext } from "react";
import { IUser } from "./interfaces";

interface IUserContext {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

export const UserContext = createContext<IUserContext | null>(null);
