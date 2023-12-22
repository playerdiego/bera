import { types } from "../types/types";

const initialState = {}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {   
        case types.login:
            return {
                ...state,
                ...action.payload
            }
        case types.logout:
            return {}
        case types.updateProfile: {
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state;
    }
};