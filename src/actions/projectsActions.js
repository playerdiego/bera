import { getAuth } from "@firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc, Timestamp } from "@firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firesbase/firebase-config";
import { swalLoading } from "../helpers/swalLoading";
import { types } from "../types/types";
import { startLoading, stopLoading } from "./uiActions";

export const startLoadProjects = () => {
    return async (dispatch) => {
        
        dispatch(startLoading());
        const projectsSnap = await getDocs(query(collection(db, 'clients'), orderBy('date', 'desc')));
        const projects = [];
        
        projectsSnap.docs.forEach(snap => {
            projects.push({
                ...snap.data(),
                id: snap.id
            });
        });
        
        dispatch(stopLoading());
        dispatch(loadProjects(projects));
        console.log(projects);
    }
}

export const startAddProject = (project) => {
    return (dispatch) => {
        const auth = getAuth();
        swalLoading('Se esta añadiendo el cliente', 'Por favor, espere');
        addDoc(collection(db, 'clients'), project)
            .then(projectRef => {
                Swal.close();
                Swal.fire(`Se ha Agregado el cliente`, '', 'success');
                const createdProject = {
                    ...project,
                    id: projectRef.id
                }
                dispatch(addProject(createdProject));
            })
            .catch(err => Swal.fire('Error', err.message, 'error'))
    }
}
export const startUpdateProject = (projectID, project) => {
    return (dispatch) => {
        const auth = getAuth();
        swalLoading('Se esta actualizando la información del cliente', 'Por favor, espere');
        updateDoc(doc(db, 'clients', projectID), project)
            .then(() => {
                Swal.close();
                dispatch(updateProject(projectID, project));
            })
            .catch(err => Swal.fire('Error', err.message, 'error'));
    }
}

export const startAddRemuneration = (clientId, cliente, compra) => {
    return (dispatch) => {
        const updatedClient = {...cliente, remuneracion: cliente.remuneracion+20, historial: [...cliente.historial, compra]};
        swalLoading('Se esta actualizando la información del cliente', 'Por favor, espere');
        updateDoc(doc(db, 'clients', clientId), updatedClient)
            .then(() => {
                Swal.close();
                dispatch(updateProject(clientId, updatedClient));
            })
            .catch(err => Swal.fire('Error', err.message, 'error'));
    }
}

export const startPayRemuneration = (clientId, cliente) => {
    return (dispatch) => {
        const updatedClient = {...cliente, remuneracion: 0, pagos: [...cliente.pagos, {fecha: new Date(), pagado: cliente.remuneracion}]};
        swalLoading('Se esta actualizando la información del cliente', 'Por favor, espere');
        updateDoc(doc(db, 'clients', clientId), updatedClient)
            .then(() => {
                Swal.close();
                dispatch(updateProject(clientId, updatedClient));
            })
            .catch(err => Swal.fire('Error', err.message, 'error'))
    }
}

export const startDeleteProject = (projectID) => {
    return async (dispatch) => {
        const auth = getAuth();
        swalLoading('Se esta eliminando el cliente', 'Por favor, espere');

        const tasksSnap = await getDocs(collection(db, 'clients', projectID, 'tasks'));

        tasksSnap.docs.forEach(snap => {
            deleteDoc(doc(db, 'clients', projectID, 'tasks', snap.id))
                .catch(err => Swal.fire('Error', err.message, 'error'));
        });
        
        const passwordsSnap = await getDocs(collection(db, 'clients', projectID, 'passwords'));

        passwordsSnap.docs.forEach(snap => {
            deleteDoc(doc(db, 'clients', projectID, 'passwords', snap.id))
                .catch(err => Swal.fire('Error', err.message, 'error'));
        });
        

        deleteDoc(doc(db, 'clients', projectID))
            .then(() => {
                dispatch(deleteProject(projectID));
                Swal.fire('Se ha eliminado el cliente', '', 'success');
            })
            .catch(err => {
                Swal.fire('Error', err.message, 'error');
            })
    }
}


export const addProject = (project) => ({
    type: types.addProject,
    payload: project
});

export const updateProject = (projectID, project) => ({
    type: types.updateProject,
    payload: {
        projectID,
        project
    }
});

export const deleteProject = (projectID) => ({
    type: types.deleteProject,
    payload: projectID
})

export const loadProjects = (projects) => ({
    type: types.loadProjects,
    payload: projects
});

export const cleanProjects = () => ({
    type: types.cleanProjects
});