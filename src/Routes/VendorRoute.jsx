import React from 'react';
import useRole from '../Hooks/useRole';
import SwappingDotLoader from '../Components/Loading/SwappingDotLoader';
import Forbidden from '../Pages/forbidden/Forbidden';
const VendorRoute = ({children}) => {
    const {role,roleLoading} = useRole();
    console.log(role,"checking role")
    if(roleLoading){
        return <SwappingDotLoader></SwappingDotLoader>
    }
    if(role !== "vendor"){
        return <Forbidden></Forbidden>
    }
    return children;
};

export default VendorRoute;