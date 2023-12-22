import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { startLoginWithEmail } from '../../actions/authActions';
import { useForm } from '../../hooks/useForm'
import { ErrorForm } from '../ui/ErrorForm';
import Logo from '../../assets/logo.png';
import { Credits } from './Credits';
import { PasswordInput } from '../ui/PasswordInput';


export const LoginScreen = () => {

    const dispatch = useDispatch();

    
    const [{email, password}, handleInputChange, reset] = useForm({
        email: '',
        password: ''
    });
    
    const [error, setError] = useState(false);


    const handleLogin = (e) => {
        e.preventDefault();

        if(checkForm()) {
            dispatch(startLoginWithEmail(email, password));
            reset();
        }
    }

    const checkForm = () => {

        if(email === '' || password === '') {
            setError('Todos los campos son obligatorios');
            return false;
        }

        return true;

    }

    return (
        <div className='auth__container'>
        <div className='auth__box'>
            {
                error &&
                <ErrorForm msg={error} />
            }
            <img className='auth__logo' src={Logo} alt='Bera' />
            <h1 className='auth__box-title'>Iniciar Sesión</h1>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    className="auth__input"
                    name="email"
                    placeholder='Tu Email'
                    onChange={handleInputChange}
                    value={email}
                />
                <PasswordInput
                    handleInputChange={handleInputChange} 
                    password={password}
                    hint='Tu contraseña'
                    name='password'
                />

                <button className='auth__login-button btn'><i className="far fa-lock"></i> Iniciar Sesión</button>
            </form>
        </div>
        <Credits />
        </div>
    )
}
