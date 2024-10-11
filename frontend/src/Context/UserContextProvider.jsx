import { useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "./AuthContext";
import { Config } from "../../API/Config";
import axios from "axios";


const UserContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${Config.baseUrl}/auth-check`);

                if (response.data.authenticated) {
                    setAuth(true);
                    setUser(response.data.user);
                }
            } catch (error) {
                setAuth(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const logout = async () => {
        try {
            const res = await axios.post(Config.LogoutUrl);
            if (res) {
                setAuth(false);
                setUser(null);
            }

        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthProvider value={{ auth, setAuth, user, setUser, logout, loading }}>
            {children}
        </AuthProvider>
    )
}


export default UserContextProvider