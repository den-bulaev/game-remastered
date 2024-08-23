import { useContext } from "react";
import { UserContext } from "../context";

export const useGlobalContext = () => useContext(UserContext);
