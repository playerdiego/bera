import { types } from "../types/types";

const initialState = [];

export const clientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.loadClients: {
            return [
                ...action.payload
            ]
        }
        case types.cleanClients: {
            return []
        }
        default:
            return state;
    }
}