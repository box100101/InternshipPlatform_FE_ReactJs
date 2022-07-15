import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "src/config/api/apiConfig";

const baseURL = process.env.REACT_APP_API;

const ratingSlice = createSlice({
  name: "rating",
  initialState: {
    rating: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRatingCompany.fulfilled, (state, action) => {
      state.rating = action.payload;
    });
  },
});

export const getRatingCompany = createAsyncThunk(
  "rating/getRatingCompany",
  async (idCompany) => {
    return axios
      .get(`${baseURL}/api/rate/${idCompany}`)
      .then((res) => {
        return res.data.score;
      })
      .catch((error) => {
        return error.response.data;
      });
  }
);

export default ratingSlice;
