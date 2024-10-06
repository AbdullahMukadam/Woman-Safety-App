import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const ProtectedRoute = ({ children }) => {
   const {auth} = useContext(AuthContext)
    
    if (!auth) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;