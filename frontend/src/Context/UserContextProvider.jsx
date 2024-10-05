import { useState } from "react";
import { AuthContext, AuthProvider } from "./AuthContext";


const UserContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(false)
    return (
        <AuthProvider value={{ auth, setAuth }}>
            {children}
        </AuthProvider>
    )
}


export default UserContextProvider