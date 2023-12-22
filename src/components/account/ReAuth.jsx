import { getAuth, reauthenticateWithCredential, reauthenticateWithPopup } from '@firebase/auth';
import 'firebase/compat/auth';
import React from 'react'
import 'firebase/compat/firestore';
import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from '../../firesbase/firebase-config';
import { useForm } from '../../hooks/useForm';
import { swalLoading } from '../../helpers/swalLoading';

export const ReAuth = ({action, setter}) => {

    const auth= getAuth();
    auth.languageCode = 'es';

    const [{password}, handleInputChange, reset] = useForm({
        password: ''
    });


    const handleLogin = (e) => {
        e.preventDefault();
        swalLoading('Se estan obteniendo las credenciales', 'Por favor, espere')
        const credentials = firebase.auth.EmailAuthProvider.credential(
            auth.currentUser.email,
            password
        )

        reauthenticateWithCredential(auth.currentUser, credentials).then(() => {
            action();
        }).catch(err => {
            Swal.fire('Error', err.message, 'error');
            setter(false);
        })
        
        reset();
    }

    const handleGoogleLogin = () => {

        reauthenticateWithPopup(auth.currentUser, googleAuthProvider)
            .then(() => {
                action();
            }).catch(err => {
                Swal.fire('Error', err.message, 'error');
                // setter(false);
            });
            

    }

    return (
        <div className='auth__box'>
            {
                auth.currentUser.providerData[0].providerId === 'password'
                ? (
                    <>
                    <h3 className='auth__box-title'>Vuelve a ingresar tu contraseña para continuar</h3>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            className="auth__input"
                            name="password"
                            placeholder='Tu Contraseña'
                            onChange={handleInputChange}
                            value={password}
                        />

                        <button className='auth__login-button btn'>Continuar <i className="far fa-arrow-right"></i></button>

                    </form>
                    </>
                ) : (
                    <>
                    <h3 className='auth__box-subtitle'>Vuelve Inicia Sesión para continuar</h3>
                    <div className="auth__social-login">
                        
                    {
                        auth.currentUser.providerData[0].providerId === 'google.com'
                        ?? (
                            <button className="btn google" type="button" onClick={handleGoogleLogin}>
                                <i className="fab fa-google"></i>
                            </button>
                        )
                    }

                    </div>
                    </>
                )
            }
        </div>
    )
}
