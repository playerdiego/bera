import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { closeSidebar } from '../../actions/uiActions';
import { useForm } from '../../hooks/useForm';
import { Form } from '../ui/Form';
import { scrolltoTop } from '../../helpers/scrollToTop';
import { startDeleteAccount, startUpdateEmail, startUpdateProfile } from '../../actions/authActions';
import { getAuth } from '@firebase/auth';
import { Delete } from '../ui/Delete';
import { swalConfirm } from '../../helpers/swalConfirm';
import { ChangePassword } from './ChangePassword';
import { ReAuth } from './ReAuth';

export const AccountScreen = () => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth();
    auth.languageCode = 'es';
    
    const {displayName, email, role} = useSelector(state => state.auth);
    const files = useSelector(state => state.files);

    const [userValues, handleInputChange] = useForm({displayName, email});

    const [editUser, setEditUser] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    const [reAuth, setReAuth] = useState({
        status: false,
        action: null
    });

    useEffect(() => {
        dispatch(closeSidebar());
        scrolltoTop();
    }, [dispatch]);

    const handleUpdateUsername = (e) => {
        e.preventDefault();
        dispatch(startUpdateProfile({displayName: userValues.displayName, role}, setEditUser));
    };

    const handleUpdateEmail = (e) => {
        e.preventDefault();

        setReAuth({
            status: true,
            action: () => dispatch(startUpdateEmail(userValues.email, setEditEmail, setReAuth))
        });
    };

    const handleBack = () => {
        navigate(-1);
    }

    const handleDeleteAccount = () => {
        swalConfirm('¿Quieres eliminar tu cuenta?', 'Todos los datos se eliminarán', () => {
            setReAuth({
                status: true,
                action: () => dispatch(startDeleteAccount(files))
            });
        });
    }

    return (
        <>
            <div className="account__header">
                <button
                    className="btn btn-less-deep auth__button-back project__back"
                    onClick={handleBack}
                >
                    <i className="fas fa-arrow-left"></i>
                </button>
                <h1 className='shadow-text main__title'>Mi Cuenta</h1>
            </div>

            <div className="account__main">
                {
                    reAuth.status ? <ReAuth action={reAuth.action} setter={setReAuth} /> :
                    editPassword ? <ChangePassword setter={setEditPassword} />
                    : (
                        <>

                        {
                            !editUser
                            ? (
                                <div className="account__field">
                                    <strong>Username:</strong> {userValues.displayName}
                                    <i
                                        className={!editUser && !editEmail ? 'fas fa-pencil' : 'hidden'}
                                        onClick={() => setEditUser(true)}
                                        >
                                    </i>
                                </div>
                            )
                            : (
                                <Form
                                    className='password__form'
                                    handleSubmit={handleUpdateUsername}
                                    handleInputChange={handleInputChange}
                                    name='displayName'
                                    value={userValues.displayName}
                                    setter={setEditUser}
                                    />
                            )
                        }

                        {
                            !editEmail
                            ? (
                                <div className="account__field">
                                    <strong>Email:</strong> {email}
                                    {
                                        auth.currentUser.providerData[0].providerId === 'password' ?
                                        (
                                            <i
                                            className={!editUser && !editEmail ? 'fas fa-pencil' : 'hidden'}
                                            onClick={() => setEditEmail(true)}
                                            ></i>
                                        ) : auth.currentUser.providerData[0].providerId === 'google.com' ? (
                                            <i className='fab fa-google'></i>
                                        ) : (
                                            <i className='fab fa-github'></i>
                                        )
                                    }
                                </div>
                            )
                            : (
                                <Form
                                    className='password__form'
                                    handleSubmit={handleUpdateEmail}
                                    handleInputChange={handleInputChange}
                                    name='email'
                                    value={userValues.email}
                                    setter={setEditEmail}
                                    />
                            )
                        }

                        {
                            auth.currentUser.providerData[0].providerId === 'password' &&
                            <button onClick={() => setEditPassword(true)}>Cambiar Contraseña <i className="fas fa-unlock-alt"></i></button>
                        }

                        <Delete action={() => handleDeleteAccount()} />
                        </>
                    )
                }

            </div>
        </>
    )
}
