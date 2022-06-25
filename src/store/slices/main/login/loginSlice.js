import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../config/api/apiConfig";

const loginSlice = createSlice({
    name: "login",
    initialState: {
        status: "idle",
        user: {},
        error: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                if (action.payload.token) {
                    state.status = "success"
                    state.user = action.payload
                } else {
                    state.status = "fail"
                    state.error = action.payload
                }
            })
    }
})

export const loginUser = createAsyncThunk(
    "login/loginUser",
    async (data) => {
        const res = await api.post("http://localhost:8085/api/signin", data)
            .then((res) => {
                localStorage.setItem("auth", JSON.stringify(res));
                return res
            })
            .catch((error) => {
                return error.response.data
            })
        console.log(res);
        return res;
    }

)

export default loginSlice;