import React from 'react';
import queryString from 'query-string';
import { ResetPassword } from './ResetPassword';
import { RecoverEmail } from './RecoverEmail';
import { VerifiyScreen } from './VerifyScreen';
import { Navigate, useLocation } from 'react-router';

export const ActionEmailScreen = () => {

    const location = useLocation();
    const params = queryString.parse( location.search );

    if(!params.mode) {
        return <Navigate to='/' />
    }
    
    return (
        
        params.mode === 'verifyEmail' ? <VerifiyScreen code={params.oobCode} />
        : params.mode === 'resetPassword' ? <ResetPassword code={params.oobCode} />
        : params.mode === 'recoverEmail' && <RecoverEmail code={params.oobCode} />

        

    )
}
