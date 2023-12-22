import { getAuth, sendEmailVerification, signInWithPopup } from "@firebase/auth";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "../firesbase/firebase-config";

import Swal from "sweetalert2";
import { login } from "../actions/authActions";
import { swalLoading } from "./swalLoading";

export const signInPopup = (dispatch, provider, verifyEmail) => {
    swalLoading('Iniciando Sesión', 'Por favor, espere');
    const auth = getAuth();
    auth.languageCode = 'es';
    signInWithPopup(auth, provider)
        .then(({user}) => {
            dispatch(login(user.displayName, user.email, user.uid, user.photoURL, user.emailVerified));

            addDoc(collection(db, 'roles'), {'role': 'admin'});

            Swal.close();

            if(verifyEmail && !user.emailVerified) {
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    Swal.fire('Se ha enviado el enlace de verificación', `Revisa tu correo ${user.email}`, 'success');
                });
            }
        }).catch(err => {
            Swal.fire('Error', err.message, 'error');
        })
}