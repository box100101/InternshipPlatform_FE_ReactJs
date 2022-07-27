import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = process.env.REACT_APP_API;

const demandSlice = createSlice({
  name: "demand",
  initialState: {
    demandList: [],
    status: "fail",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDemandListByUniId.fulfilled, (state, { payload }) => {
      state.demandList = payload;
    });
    builder
      .addCase(addDemand.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDemand.fulfilled, (state, { payload }) => {
        state.status = "success";
        state.demand = payload;
      });
  },
});

export const addDemand = createAsyncThunk("demand/addDemand", async (data) => {
  let axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
    },
  };
  return axios
    .post(`${baseURL}/api/r2s/partner/demand`, data, axiosConfig)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return error.response.data;
    });
});

export const getDemandListByUniId = createAsyncThunk(
  "university/getDemandListByUniId",
  async (uniId) => {
    return await axios
      .get(`${baseURL}/api/demand/filter-university/${uniId}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  }
);

export default demandSlice;
