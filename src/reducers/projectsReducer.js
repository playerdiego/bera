import { types } from "../types/types";

const initialState = [];

export const projectsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.addProject: {
            return [
                action.payload,
                ...state,
            ]
        }
        case types.updateProject: {
            return state.map(project => project.id !== action.payload.projectID ? project : {
                ...project,
                ...action.payload.project
            });
        }
        case types.deleteProject: {
            return state.filter(project => project.id !== action.payload);
        }
        case types.loadProjects: {
            return [
                ...action.payload
            ]
        }
        // eslint-disable-next-line
        case types.cleanProjects: {
            return []
        }
        default:
            return state;
    }
}