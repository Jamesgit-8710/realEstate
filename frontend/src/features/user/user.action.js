import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserType, signupUserType, verifyUserType } from "./user.type";
import { login, signup, verify } from "../../services/user.service";

export const loginUser = createAsyncThunk(
    loginUserType,
    async (data) => {
        try {
            const response = await login(data);
            return response.data;
        } catch (error) {
            // console.error("Error while login:", error);
            if(error.code==='ERR_NETWORK')
            throw 500

            if(error.code==='EREFUSED')
            throw 500
        
            throw error.response.status;
        }
    }
);

export const verifyUser = createAsyncThunk(
    verifyUserType,
    async () => {
        try {
            const response = await verify();
            return response.data;
        } catch (error) {
            // console.error("Error while verifing user:", error);

            if(error.code==='ERR_NETWORK')
            throw 500

            if(error.code==='EREFUSED')
            throw 500

            throw error.response.status;
        }
    }
);

export const signupUser = createAsyncThunk(
    signupUserType,
    async (data) => {
        try {
            const response = await signup(data);
            return response.data;
        } catch (error) {
            // console.error("Error while signup:", error);
            if(error.code==='ERR_NETWORK')
            throw 500

            if(error.code==='EREFUSED')
            throw 500
        
            throw error.response.status;
        }
    }
);