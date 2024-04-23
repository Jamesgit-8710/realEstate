import { createAsyncThunk } from "@reduxjs/toolkit";
import { addProperty, propertyList } from "../../services/property.service";
import { getPropertyListType, listPropertyType } from "./property.type";
import { buildQuery } from "../../utils";

export const getPropertyList = createAsyncThunk(
    getPropertyListType,
    async (data) => {
        try {
            const query = buildQuery(data);
            const response = await propertyList(query);
            return response.data;
        } catch (error) {
            // console.error("Error while fetching property list:", error);
            if(error.code==='ERR_NETWORK')
            throw 500

            if(error.code==='EREFUSED')
            throw 500

            throw error.response.status;
        }
    }
);

export const listProperty = createAsyncThunk(
    listPropertyType,
    async (data) => {
        try {
            const response = await addProperty(data);
            return response.data;
        } catch (error) {
            // console.error("Error while listing property :", error);
            if(error.code==='ERR_NETWORK')
            throw 500

            if(error.code==='EREFUSED')
            throw 500
        
            throw error.response.status;
        }
    }
);