import React from 'react'
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startUpdatePassword } from '../../actions/authActions';
import { swalLoading } from '../../helpers/swalLoading';
import { useForm } from '../../hooks/useForm';
import { firebase } from '../../firesbase/firebase-config';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, reauthenticateWithCredential } from '@firebase/auth';
import 'firebase/compat/auth';
import { PasswordInput } from '../ui/PasswordInput';

export const ChangePassword = ({setter}) => {

    const dispatch = useDispatch();
    const auth = getAuth();
    auth.languageCode = 'es';

    const [{currentPassword, password, passwordConfirm}, handleInputChange, reset] = useForm({
        currentPassword: '',
        password: '',
        passwordConfirm: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        swalLoading('Se estan actualizando las credenciales', 'Por favor, espere');
        const credentials = firebase.auth.EmailAuthProvider.credential(
            auth.currentUser.email,
            currentPassword
        )

        reauthenticateWithCredential(auth.currentUser, credentials)
            .then(() => {
                
                if(checkForm()) {
                    dispatch(startUpdatePassword(password, setter));
                    reset();
                }   

            }).catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
        

    }

    const checkForm = () => {

        if(password !== passwordConfirm) {
            Swal.fire('Las contraseñas deben coincidir', '', 'error');
            return false;
        } else if (password.length < 5) {
            Swal.fire('Tu contraseña debe tener mas de 5 carácteres', '', 'error');
            return false;
        }

        return true;
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3 className='auth__box-title'>Cambia tu Contraseña</h3>

                <PasswordInput
                    handleInputChange={handleInputChange} 
                    password={currentPassword}
                    hint='Tu Contraseña Actual'
                    name='currentPassword'
                />

                <PasswordInput
                    handleInputChange={handleInputChange} 
                    password={password}
                    hint='Tu Nueva Contraseña'
                    name='password'
                />

                <PasswordInput
                    handleInputChange={handleInputChange} 
                    password={passwordConfirm}
                    hint='Repite Nueva Contraseña'
                    name='passwordConfirm'
                />
            

            <button className='btn' type='submit'><i className="far fa-lock"></i> Cambiar Contraseña</button>
            <button className='btn' onClick={() => setter(false)}><i className="far fa-times"></i> Cancelar</button>
        </form>
    )
}
