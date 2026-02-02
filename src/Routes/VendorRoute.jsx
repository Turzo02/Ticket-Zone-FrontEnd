import React from 'react';
import useRole from '../Hooks/useRole';
import SwappingDotLoader from '../Components/Loading/SwappingDotLoader';
import Forbidden from "../Pages/Forbidden/Forbidden"
import LoadingSpinner from '../Components/Loading/LoadingSpinner';
const VendorRoute = ({children}) => {
    const {role,roleLoading} = useRole();
    if(roleLoading){
        return <LoadingSpinner></LoadingSpinner>
    }
    if(role !== "vendor"){
        return <Forbidden></Forbidden>
    }
    return children;
};

export default VendorRoute;