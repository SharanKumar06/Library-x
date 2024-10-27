import {createSlice} from '@reduxjs/toolkit';

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        isLoading: false,
    },
    reducers: {
       showLoader: state => {
           state.isLoading = true;
       },
         hideLoader: state => {
              state.isLoading = false;
         },

    },
    });

    export const { showLoader, hideLoader } = loaderSlice.actions;