import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersSlice";
import loaderReducer from "./loaderSlide";
import filterReducer from "./filterSlice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        loaders: loaderReducer,
        filter: filterReducer,
    }
})

export default store
