import { createSlice } from '@reduxjs/toolkit';
import { getPropertyList, listProperty } from './property.action';

const initialState = {
    propertyList: [],
    loading: false,
    type: '',
    message: ''
}

export const propertySlice = createSlice({
    name: 'properties',
    initialState,
    reducers: {
        deleteMessage: (state, action) => {
            state.type=""
            state.message=""
        }
    },
    extraReducers: (builder) => {
        builder

        .addCase(getPropertyList.fulfilled,(state,action) => {
            state.propertyList=action.payload
            state.loading=false
        })
        .addCase(getPropertyList.pending,(state,action) => {
            state.loading=true
        })
        .addCase(getPropertyList.rejected,(state,action) => {
            state.loading=false
            if(action.error.message==500){
                state.message="Something went wrong!"
                state.type='error'
            }
        })

        .addCase(listProperty.fulfilled,(state,action) => {
            state.loading=false
            state.type='success'
            state.message='Property added successfully!'
        })
        .addCase(listProperty.pending,(state,action) => {
            state.loading=true
        })
        .addCase(listProperty.rejected,(state,action) => {
            state.loading=false
            if(action.error.message==500){
                state.message="Something went wrong!"
                state.type='error'
            }
        })

    }
});

export const { deleteMessage } = propertySlice.actions;
export default propertySlice.reducer;