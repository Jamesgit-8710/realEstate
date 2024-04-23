import { createSlice } from '@reduxjs/toolkit';
import { loginUser, signupUser, verifyUser } from './user.action';

const initialState = {
    isLoggedIn: false,
    loading: false,
    type: '',
    message: '',
    currentTab: 1
}

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        deleteMessage: (state, action) => {
            state.type=""
            state.message=""
        },
        setTab: (state, action) => {
            state.currentTab=action.payload
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn=false
        },
        setLoading: (state, action) => {
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder

        .addCase(signupUser.fulfilled,(state,action) => {
            state.loading=false
            state.type='success'
            state.message="User registed successfully!"
        })
        .addCase(signupUser.pending,(state,action) => {
            state.loading=true
        })
        .addCase(signupUser.rejected,(state,action) => {
            state.loading=false
            if(action.error.message==409){
                state.message="User already exist with same email!"
                state.type='warning'
            }

            if(action.error.message==500){
                state.message="Something went wrong!"
                state.type='error'
            }
        })

        .addCase(loginUser.fulfilled,(state,action) => {
            localStorage.setItem('token',action.payload)
            state.isLoggedIn=true
            state.loading=false
        })
        .addCase(loginUser.pending,(state,action) => {
            state.loading=true
        })
        .addCase(loginUser.rejected,(state,action) => {
            state.loading=false
            if(action.error.message==401){
                state.message="Invalid email or password!"
                state.type='warning'
            }

            if(action.error.message==500){
                state.message="Something went wrong!"
                state.type='error'
            }
        })

        .addCase(verifyUser.fulfilled,(state,action) => {
            state.isLoggedIn=true
        })
        .addCase(verifyUser.pending,(state,action) => {
            
        })
        .addCase(verifyUser.rejected,(state,action) => {
            state.isLoggedIn=false
            if(action.error.message==500){
                state.message="Something went wrong!"
                state.type='error'
            }
        })
    }
});

export const { deleteMessage , setTab , setIsLoggedIn , setLoading } = userSlice.actions;
export default userSlice.reducer;