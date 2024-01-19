import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentUser: null,
    isLoggedIn: false,
    userRole: null
}

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
            state.isLoggedIn = true;
        },
        setUserRole: (state, action) => {
            state.userRole = action.payload
        }
    }
});

export const { setCurrentUser, setUserRole } = usersSlice.actions

export default usersSlice.reducer