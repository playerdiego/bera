import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { applyActionCode, getAuth } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { updateProfileInfo } from '../../actions/authActions';
import { Credits } from './Credits';


export const VerifiyScreen = ({code}) => {

    const dispatch = useDispatch();

    const auth = getAuth();
    auth.languageCode = 'es';

    const [message, setMessage] = useState({
        title: '...',
        text: '...',
        error: false
    });
    
    useEffect(() => {
        applyActionCode(auth, code)
            .then(() => {
                setMessage({
                    title: 'Se ha verificado la cuenta',
                    text: 'Estás siendo redirigido a la aplicación...',
                    error: false
                });
                dispatch(updateProfileInfo({emailVerified: true}));
            })
            .catch(err => {
                setMessage({
                    title: 'Ha ocurrido un error',
                    text: err.message,
                    error: true
                });
            })
    }, [auth, code, dispatch])

    return (
        <div className="auth__container">
            <div className='auth__box actions__box'>
                <h1 className='auth__box-title verified'>{message.title}</h1>
                <p className='shadow-text verified'>{message.text}</p>
                {
                    !message.error &&
                    <Link className='auth__link' to='/'>Volver a la aplicación</Link>
                }
            </div>
            <Credits />
        </div>
    )
}
