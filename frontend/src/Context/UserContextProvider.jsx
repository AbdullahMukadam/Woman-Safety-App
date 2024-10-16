import { useEffect, useState } from "react";
import { AuthContext, AuthProvider } from "./AuthContext";
import { Config } from "../../API/Config";
import axios from "axios";
import api from "../../API/CustomApi";


const UserContextProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userEmail, setUserEmail] = useState("")

    const getUserInfo = async () => {
        try {
            const response = await api.get(Config.GETDATAUrl, {
                email: userEmail
            })
            if (response) {
                localStorage.setItem("UserInfo", response.data)
                setUser({
                    id: response.data._id,
                    email: response.data.email,
                    username: response.data.username,
                    profilePhoto: response.data.profilePhoto,
                    reviews: response.data.reviews,
                    contacts: response.data.contacts
                })
            }
        } catch (error) {
            console.error("Error in getting Data", error)
        }
    }


    const checkAuth = async () => {
        try {
            const response = await api.get(`${Config.baseUrl}/auth-check`);

            if (response.data.authenticated) {
                setUserEmail(response.data.user.email)
                await getUserInfo()
                setAuth(true);                
            }
        } catch (error) {
            setAuth(false);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const logout = async () => {
        try {
            const res = await api.post(Config.LogoutUrl);
            if (res) {
                localStorage.clear();
                setAuth(false);
                setUser(null);
            }

        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthProvider value={{ auth, setAuth, user, setUser, logout, loading, checkAuth }}>
            {children}
        </AuthProvider>
    )
}


export default UserContextProvider