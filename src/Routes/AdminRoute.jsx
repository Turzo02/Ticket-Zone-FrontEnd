import React from 'react';
import useRole from '../Hooks/useRole';
import SwappingDotLoader from '../Components/Loading/SwappingDotLoader';
import Forbidden from '../Pages/forbidden/Forbidden';
const AdminRoute = ({children}) => {
    const {role,roleLoading} = useRole();
    if(roleLoading){
        return <SwappingDotLoader></SwappingDotLoader>
    }
    if(role !== "admin"){
        return <Forbidden></Forbidden>
    }
    return children;
};

export default AdminRoute;