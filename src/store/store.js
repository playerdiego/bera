import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/authReducer";
import { filesReducer } from "../reducers/filesReducer";
import { uiReducer } from "../reducers/uiReducer";
import { projectsReducer } from "../reducers/projectsReducer";
import { clientsReducer } from "../reducers/clientsReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    ui: uiReducer,
    auth: authReducer,
    files: filesReducer,
    clients: clientsReducer,
    projects: projectsReducer,
});

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
);