import React from 'react';
import { Navigate } from 'react-router';
import { useSelector } from 'react-redux';

export const PublicRouter = ({children}) => {

    const auth = useSelector(state => state.auth);

    return auth.uid 
        ? <Navigate to ='/' />
        : children
    
}

