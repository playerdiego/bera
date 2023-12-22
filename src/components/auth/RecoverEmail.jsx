import React, { useEffect, useState } from 'react';
import { checkActionCode, applyActionCode, sendPasswordResetEmail, getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';
import { swalLoading } from '../../helpers/swalLoading';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../actions/authActions';
import { Credits } from './Credits';

export const RecoverEmail = ({code}) => {

    const auth = getAuth();
    auth.languageCode = 'es';
    const dispatch = useDispatch();
    
    const [message, setMessage] = useState({
        title: '...',
        text: '...',
        error: false
    });

    const [email, setEmail] = useState();

    useEffect(() => {
        checkActionCode(auth, code)
            .then((info) => {
                setEmail(info['data']['email']);
                setMessage({
                    title: `El correo electrónico de tu cuenta ha sido reestablecido a: ${info['data']['email']}`,
                    text: 'Para mayor seguridad puedes cambiar tu contraseña'
                })

                applyActionCode(auth, code);
                dispatch(startLogout());

            }).catch(err => {
                setMessage({
                    title: 'Ha ocurrido un error',
                    text: err.message,
                    error: true
                });
            })
    }, [auth, code, dispatch])


    const handleSubmitPasswordChange = () => {
        swalLoading('Se está enviando el correo de verificación', 'Por favor, espera');
        sendPasswordResetEmail(auth, email)
            .then(() => {
                Swal.close();
                Swal.fire('Se ha enviado el enlace de recuperación', `Revisa tu correo ${email}`, 'success');
            })
            .catch((err) => {
                Swal.fire('Error', err.message, 'error');
            });
    }
    

    return (
        <div className="auth__container">
            <div className='auth__box actions__box'>
                <h1 className='auth__box-title verified'>{message.title}</h1>
                <p className='shadow-text verified'>{message.text}</p>
                {
                    !message.error &&
                    <button className='auth__link' onClick={handleSubmitPasswordChange}>Cambiar contraseña</button>
                    
                }
                <Link className='auth__link' to='/'>Volver a la aplicación</Link>
            </div>
        <Credits />
        </div>
    )
}
