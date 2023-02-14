import {useContext} from "react";
import IAuthenticationContext, {AuthenticationContext} from "../provider";

const useAuth = () => useContext(AuthenticationContext) as IAuthenticationContext;

export default useAuth;