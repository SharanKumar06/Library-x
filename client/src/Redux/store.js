import { configureStore } from "@reduxjs/toolkit";
import { loaderSlice } from "./loaderslice";
import { usersSlice } from "./usersSlice";


export const store= configureStore({
    reducer: {
        loader: loaderSlice.reducer,
        users: usersSlice.reducer
    },
});