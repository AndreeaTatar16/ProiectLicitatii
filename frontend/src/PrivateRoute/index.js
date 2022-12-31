import React from 'react';
import {useLocalState} from "../util/useLocalStorage";
import {Navigate} from "react-router-dom";

//oricare view care are ca si parinte un private route va avea nevoie de jwt, implicit de login ca sa acceseze resursa
const PrivateRoute = ({children}) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    return jwt ? children : <Navigate to={"/login"}/>;
};

export default PrivateRoute;
