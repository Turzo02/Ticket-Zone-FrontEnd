import React from 'react';
import useRole from '../Hooks/useRole';
import SwappingDotLoader from '../Components/Loading/SwappingDotLoader';
import Forbidden from '../Pages/forbidden/Forbidden';
const UserRoute = ({children}) => {
    const {role,roleLoading} = useRole();
    if(roleLoading){
        return <SwappingDotLoader></SwappingDotLoader>
    }
    if(role !== "user"){
        return <Forbidden></Forbidden>
    }
    return children;
};

export default UserRoute;