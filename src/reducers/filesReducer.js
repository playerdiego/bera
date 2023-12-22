import { types } from "../types/types";

const initialState = [];

export const filesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.addFile: {
            return [
                action.payload,
                ...state,
            ]
        }
        case types.deleteFile: {
            return state.filter(file => file.id !== action.payload);
        }
        case types.addView: {
            const {name, email, userID} = action.payload;
            return state.map(file => file.id === action.payload.id ? {...file, views: {name, email, userID}} : file);
        }
        case types.loadFiles: {
            return [
                ...action.payload
            ]
        }
        // eslint-disable-next-line
        case types.cleanFiles: {
            return []
        }
        default:
            return state;
    }
}