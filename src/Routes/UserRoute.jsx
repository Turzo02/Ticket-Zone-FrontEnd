import React from 'react';
import useRole from '../Hooks/useRole';
import SwappingDotLoader from '../Components/Loading/SwappingDotLoader';
import Forbidden from "../Pages/Forbidden/Forbidden"
import LoadingSpinner from '../Components/Loading/LoadingSpinner';
const UserRoute = ({children}) => {
    const {role,roleLoading} = useRole();
    if(roleLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    if(role !== "user"){
        return <Forbidden></Forbidden>
    }
    return children;
};

export default UserRoute;