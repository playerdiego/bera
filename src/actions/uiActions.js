import { types } from "../types/types";

export const openSiderbar = () => ({
    type: types.openSidebar
});

export const closeSidebar = () => ({
    type: types.closeSidebar
});

export const startLoading = () => ({
    type: types.startLoading
});

export const stopLoading = () => ({
    type: types.stopLoading
});