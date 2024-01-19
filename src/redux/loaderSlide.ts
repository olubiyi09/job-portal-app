import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false
}

const loaderSlide = createSlice({
    name: "loaders",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        }
    }
});

export const { setLoading } = loaderSlide.actions

export default loaderSlide.reducer