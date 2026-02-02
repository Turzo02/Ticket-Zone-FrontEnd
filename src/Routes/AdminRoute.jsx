import React from 'react';
import useRole from '../Hooks/useRole';
import SwappingDotLoader from '../Components/Loading/SwappingDotLoader';
import Forbidden from "../Pages/Forbidden/Forbidden"
import LoadingSpinner from '../Components/Loading/LoadingSpinner';
const AdminRoute = ({children}) => {
    const {role,roleLoading} = useRole();
    if(roleLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    if(role !== "admin"){
        return <Forbidden></Forbidden>
    }
    return children;
};

export default AdminRoute;