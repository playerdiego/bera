import { types } from "../types/types";
import { startLoading, stopLoading } from "./uiActions";
import axios from "axios";
import { getAuth } from "firebase/auth";

const _baseUrlRealTime = 'https://bera-fadiku-ref-default-rtdb.firebaseio.com/';

export const startLoadClients = (uid) => {
    return async (dispatch) => {
        
        dispatch(startLoading());
        const usersData = await axios.get(`${_baseUrlRealTime}/users-data.json?auth=${await getAuth().currentUser.getIdToken()}`);

        let users = [];
        
        for (const [key, value] of Object.entries(usersData.data)) {
            let userValue = {};
            for (const [, value2] of Object.entries(value)) {
                userValue = {...value2}
            }
            users.push({
                ...userValue, id: key
            });
        }        
        dispatch(stopLoading());
        dispatch(loadClients(users));
    }
}


export const loadClients = (users) => ({
    type: types.loadClients,
    payload: users
});

export const cleanClients = () => ({
    type: types.cleanClients
});
