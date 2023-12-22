import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { startRegisterWithEmail } from '../../actions/authActions'
import { useForm } from '../../hooks/useForm'
import { ErrorForm } from '../ui/ErrorForm'
import Logo from '../../assets/logo.png';
import { Credits } from './Credits'
import { PasswordInput } from '../ui/PasswordInput'
import { useNavigate } from 'react-router-dom';


export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [error, setError] = useState();

    const [{name, email, password, confirmPassword}, handleInputChange, reset] = useForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleRegister = (e) => {
        e.preventDefault();

        if(checkForm()) {
            dispatch(startRegisterWithEmail(name, email, password, navigate));
            reset();
        }

    }

    const checkForm = () => {
        
        if(name === '' || email === '' || password === '' || confirmPassword === '') {
            setError('Todos los campos son obligatorios');
            return false;
        } else if(password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return false;
        } else if (password < 5) {
            setError('Tu contraseña debe tener mas de 5 carácteres');
        }

        setError(false);
        return true;

    };

    return (
        <>
        <div className='auth__box'>
            {
                error && 
                <ErrorForm msg={error} />
            }
            <img className='auth__logo' src={Logo} alt='Bera' />
            <h1 className='auth__box-title'>Crea una nueva cuenta</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    className="auth__input"
                    name="name"
                    placeholder='Nombre del usuario'
                    onChange={handleInputChange}
                    value={name}
                />
                <input
                    type="email"
                    className="auth__input"
                    name="email"
                    placeholder='Email del usuario'
                    onChange={handleInputChange}
                    value={email}
                />
                
                <PasswordInput
                    handleInputChange={handleInputChange} 
                    password={password}
                    hint='Contraseña del usuario'
                    name='password'
                />

                <PasswordInput
                    handleInputChange={handleInputChange} 
                    password={confirmPassword}
                    hint='Repite la Contraseña'
                    name='confirmPassword'
                />

                <button className='auth__login-button btn'><i className="far fa-user"></i> Crear cuenta nueva</button>

                <Link className='auth__link' to='/auth/login'>¿Terminaste? Inicia Sesión aquí <i className="far fa-user"></i></Link>
            </form>
        </div>
        <Credits />
        </>
    )
}
