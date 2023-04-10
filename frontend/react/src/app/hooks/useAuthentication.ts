import { useContext } from "react";
import { AuthenticationContext, IAuthenticationContext } from "../provider";

const useAuth = () => useContext(AuthenticationContext) as IAuthenticationContext;

export default useAuth;