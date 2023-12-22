import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RecoverScreen } from '../components/auth/RecoverScreen'
import { RegisterScreen } from '../components/auth/RegisterScreen'
import { SearchScreen } from '../components/auth/SearchScreen'

export const AuthRouter = () => {
    return (
        
            <Routes>
                <Route path='*' element={<Navigate to='/auth/login' />} />

                <Route path='/login' element={<LoginScreen/>} />
                <Route path='/register' element={<RegisterScreen/>} />
                <Route path='/recover' element={<RecoverScreen/>} />
                <Route path='/busqueda' element={<SearchScreen/>} />

            </Routes>
    )
}
