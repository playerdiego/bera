import { createUserWithEmailAndPassword, deleteUser, getAuth, sendEmailVerification, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from "@firebase/auth";
import { collection, deleteDoc, doc, getDocs} from "@firebase/firestore";
import Swal from "sweetalert2";
import { db, storage, } from "../firesbase/firebase-config";
import { swalLoading } from "../helpers/swalLoading";
import { types } from "../types/types";
import { cleanFiles } from "./filesActions";
import axios from "axios";
import { deleteObject, ref } from "firebase/storage";
import emailjs from '@emailjs/browser';
import { cleanClients } from "./clientsActions";
emailjs.init("1Bi0wWtBNTAysykPC");

// Login

const _baseUrlRealTime = 'https://bera-ref-default-rtdb.firebaseio.com/';

export const startLoginWithEmail = (email, password) => {
    
    return (dispatch) => {
        swalLoading('Iniciando Sesión', 'Por favor, espere');
        
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then(async ({user}) => {
            console.log(user);
            const roleData = await axios.get(
                `${_baseUrlRealTime}/users-data/${user.uid}.json?auth=${await getAuth().currentUser.getIdToken()}`
            );
            let role = '';
            // eslint-disable-next-line no-unused-vars
            for (const [_, value] of Object.entries(roleData.data)) {
                role = value.role;
            }
            dispatch(login(user.displayName, user.email, user.uid, user.photoURL, user.emailVerified, role));
            Swal.close();
        }).catch(err => {
            Swal.fire('Error', err.message, 'error');
        })
    }
};

// Register
export const startRegisterWithEmail = (name, email, password, navigate) => {
    return (dispatch) => {
        swalLoading('Creando Cuenta', 'Por favor, espere');
        const auth = getAuth();
        auth.languageCode = 'es';
        createUserWithEmailAndPassword(auth, email, password)
            .then(async ({user}) => {

                await updateProfile(user, {
                    displayName: name
                });

                // addDoc(collection(db, user.uid), {'role': 'admin'});
                
                await axios.post(`${_baseUrlRealTime}/users-data/${user.uid}.json?auth=${await getAuth().currentUser.getIdToken()}`, {
                    'role': 'user',
                    'name': name,
                    'email': email
                });

                dispatch(login(user.displayName, user.email, user.uid, user.photoURL, user.emailVerified, 'user'));
                

                sendEmailVerification(auth.currentUser)
                .then(() => {
                    Swal.fire({
                        title: `Se ha enviado el enlace de verificación. Avisa a ${name} que revise su correo ${user.email}`,
                        showDenyButton: true,
                        confirmButtonText: 'Crear otra cuenta',
                        denyButtonText: 'Iniciar Sesión',
                        denyButtonColor: '#35b6b3',
                        confirmButtonColor: '#35b6b3'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            dispatch(startLogout(() => navigate('/auth/register')));
                        } else if (result.isDenied) {
                            dispatch(startLogout(() => navigate('/auth/login')));
                        }
                    })
                })
                 
                emailjs.send('service_mx9loiu', 'template_oidj487', {name, email});

                Swal.close();                
            }).catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
    }
}

// Logout
export const startLogout = (redirect) => {
    return (dispatch) => {
        
        swalLoading('Cerrando Sesión', 'Por favor, espere');

        const auth = getAuth();
        auth.languageCode = 'es';
        signOut(auth).then(() => {
            dispatch(logout());
            Swal.close();
            dispatch(cleanFiles());
            dispatch(cleanClients());
            if(redirect) redirect();
        }).catch(err => {
            Swal.fire('Error', err.message, 'error');
        })
    }
}

// Updates

export const startUpdateProfile = (user, setter) => {
    return (dispatch) => {

        swalLoading('Actualizando Perfil', 'Por favor, espere');

        const auth = getAuth();
        auth.languageCode = 'es';
        updateProfile(auth.currentUser, user)
            .then(async () => {
                dispatch(updateProfileInfo(user));
                await axios.delete(`${_baseUrlRealTime}/users-data/${getAuth().currentUser.uid}.json?auth=${await getAuth().currentUser.getIdToken()}`);
                await axios.post(`${_baseUrlRealTime}/users-data/${getAuth().currentUser.uid}.json?auth=${await getAuth().currentUser.getIdToken()}`, {
                    name: user.displayName,
                    email: getAuth().currentUser.email,
                    role: user.role
                });
                Swal.close();
                Swal.fire('Se ha actualizado el nombre de usuario', '', 'success');
                setter(false);
            }).catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
    }
}

export const startUpdateEmail = (email, role, setter, setReAuth) => {
    return (disptach) => {
        swalLoading('Actualizando Email', 'Por favor, espere');
        const auth = getAuth();
        auth.languageCode = 'es';
        updateEmail(auth.currentUser, email)
            .then(async () => {
                disptach(updateProfileInfo({email, emailVerified: false}));

                await axios.delete(`${_baseUrlRealTime}/users-data/${getAuth().currentUser.uid}.json?auth=${await getAuth().currentUser.getIdToken()}`);
                await axios.post(`${_baseUrlRealTime}/users-data/${getAuth().currentUser.uid}.json?auth=${await getAuth().currentUser.getIdToken()}`, {
                    name: getAuth().currentUser.displayName,
                    email: email,
                    role
                });

                Swal.close();
                setter(false);
                setReAuth({status: false, action: null});
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    Swal.fire('Se ha enviado el enlace de verificación', `Revisa tu correo ${email}`, 'success');
                });
            }).catch(err => {
                Swal.fire('Error', err.message, 'error');
                setReAuth({status: false, action: null});
            })
    }
}

export const startUpdatePassword = (password, setter) => {
    return () => {
        const auth = getAuth();
        auth.languageCode = 'es';
        swalLoading('Actualizando Contraseña', 'Por favor, espere');
        updatePassword(auth.currentUser, password)
            .then(() => {
                Swal.close();
                Swal.fire('Se ha actualizado la contraseña', '', 'success');
                setter(false);
            }).catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
    }
}

export const startDeleteAccount = (files) => {
    return async (dispatch) => {
        swalLoading('Eliminando Cuenta', 'Por favor, espere');

        const auth = getAuth();
        auth.languageCode = 'es';
        const filesSnap = await getDocs(collection(db, 'data', auth.currentUser.uid, 'files'));
        
        filesSnap.docs.forEach(snap => {
            deleteDoc(doc(db, 'data', auth.currentUser.uid, 'files', snap.id))
                .catch(err => Swal.fire('Error', err.message, 'error'));
        });
        
        await axios.delete(`${_baseUrlRealTime}/users-data/${getAuth().currentUser.uid}.json?auth=${await getAuth().currentUser.getIdToken()}`);
        if(files.length > 0) {
            files.forEach(file =>  {
                const fileRef = ref(storage, `files/${getAuth().currentUser.uid}/${file.fileName}`);
                deleteObject(fileRef);
            })
        }

        emailjs.send('service_mx9loiu', 'template_cybj5jx', {name: auth.currentUser.displayName, email: auth.currentUser.email});

        deleteUser(auth.currentUser)
            .then(() => {
                dispatch(logout());
                dispatch(cleanFiles());


                Swal.close();
            }).catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
    }
}

// Normal Actions

export const login = (displayName, email, uid, photoURL, emailVerified, role) => ({
    type: types.login,
    payload: {displayName, email, uid, photoURL, emailVerified, role}
});

export const logout = () => ({
    type: types.logout
});

export const updateProfileInfo = (user) => ({
    type: types.updateProfile,
    payload: user
});