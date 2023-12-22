import { types } from "../types/types";

const initialState = {
    open: false,
    loading: false
};

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.openSidebar:
            return {
                ...state,
                open: true
            }
        case types.closeSidebar:
            return {
                ...state,
                open: false
            }
        case types.startLoading: {
            return {
                ...state,
                loading: true
            }
        }
        case types.stopLoading: {
            return {
                ...state,
                loading: false
            }
        }
        default:
            return state;
    };
};