import { getAuth } from "@firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, arrayUnion } from "@firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Swal from "sweetalert2";
import { db, storage } from "../firesbase/firebase-config";
import { swalLoading } from "../helpers/swalLoading";
import { types } from "../types/types";
import { startLoading, stopLoading } from "./uiActions";

export const startLoadFiles = () => {
    return async (dispatch) => {
        
        dispatch(startLoading());
        const filesSnap = await getDocs(query(collection(db, 'files'), orderBy('date', 'desc')));
        
        const files = [];
        
        filesSnap.docs.forEach(snap => {
            files.push({
                ...snap.data(),
                id: snap.id
            });
        });

        console.log(files);
        
        
        dispatch(stopLoading());
        dispatch(loadFiles(files));
    }
}

export const startAddFile = (fileData) => {
    return async (dispatch) => {
        swalLoading('Se esta añadiendo el archivo', 'Por favor, espere');

        const fileRef = ref(storage, `files/${fileData.file.name}`);
        const snapshot = await uploadBytesResumable(fileRef, fileData.file);
        const fileURL = await getDownloadURL(snapshot.ref);

        const file = {name: fileData.name, file: fileURL, date: fileData.date, fileName: fileData.file.name, uploadedBy: getAuth().currentUser.displayName};

        addDoc(collection(db, 'files'), file)
            .then(fileRef => {
                Swal.close();
                Swal.fire(`Se ha Agregado el archivo`, '', 'success');
                const createdFile = {
                    ...file,
                    id: fileRef.id,

                }
                dispatch(addFile(createdFile));
            })
            .catch(err => Swal.fire('Error', err.message, 'error'))
    }
}

export const startDeleteFile = (fileID, fileName) => {
    return async (dispatch) => {
        swalLoading('Se esta eliminando el archivo', 'Por favor, espere');

        deleteDoc(doc(db, 'files', fileID))
            .then(() => {
                dispatch(deleteFile(fileID));
                const fileRef = ref(storage, `files/${fileName}`)
                deleteObject(fileRef);
                Swal.fire('Se ha eliminado el archivo', '', 'success');
            })
            .catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
    }
}

export const addViewFile = (fileID, name, email, userID) => {
    return async (dispatch) => {
        updateDoc(doc(db, 'files', fileID), {
            views: arrayUnion({name, email, userID})
        }).then(() => {
            dispatch(addView(name, email, userID));
        })
    }
}


export const addFile = (file) => ({
    type: types.addFile,
    payload: file
});

export const deleteFile = (fileID) => ({
    type: types.deleteFile,
    payload: fileID
})

export const loadFiles = (files) => ({
    type: types.loadFiles,
    payload: files
});

export const cleanFiles = () => ({
    type: types.cleanFiles
});

export const addView = (name, email, userID) => ({
    type: types.addView,
    payload: {name, email, userID}
})