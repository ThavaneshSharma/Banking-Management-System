import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showSpinner: false,
    TIMEOUT_DELAY: 8000,
    openNavbar: false
}

export const pageSlice = createSlice({
    name: 'pages',
    initialState,
    reducers: {
        openSpinner: (state) => {
            state.showSpinner = true;
        },
        closeSpinner: (state) => {
            state.showSpinner = false;
        },
        toggleNavbar: (state) => {
            state.openNavbar = !state.openNavbar;
        }
    }
})

export const { openSpinner, closeSpinner, toggleNavbar } = pageSlice.actions
export const showSpinner = (state) => state.page.showSpinner
export const TIMEOUT_DELAY = (state) => state.page.delay
export const openNavbar = (state) => state.page.openNavbar

export default pageSlice.reducer;