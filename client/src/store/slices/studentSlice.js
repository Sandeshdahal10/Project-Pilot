import {
  createSlice,
  createAsyncThunk,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";
import { act } from "react";

export const submitProjectProposal = createAsyncThunk(
  "student/submitProjectProposal",
  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/student/project-proposal", data);
      toast.success("Project Proposal submitted Successfully");
      return res.data.data?.project || res.data.data || res.data;
    } catch (error) {
      toast.error(error.response.data.message || "Failed to submit project proposal");
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchProject = createAsyncThunk("student/fetchProject", async(__, thunkAPI) => {
  try {
    const res = await axiosInstance.get("student/project");
    return res.data.data?.project
  } catch (error) {
    toast.error(error.response.data.message || "Failed to fetch project");
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
export const getSupervisor = createAsyncThunk("student/getSupervisor", async(__, thunkAPI) => {
  try {
    const res = await axiosInstance.get("student/supervisors");
    return res.data.data?.supervisor;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to fetch supervisor");
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
export const fetchAllSupervisors = createAsyncThunk("student/fetchSupervisors", async(__, thunkAPI) => {
  try {
    const res = await axiosInstance.get("student/fetch-supervisors");
    return res.data.data?.supervisors;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to fetch available supervisors");
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});
export const requestSupervisor = createAsyncThunk("student/requestSupervisor", async(data, thunkAPI) => {
  try {
    const res = await axiosInstance.post("student/request-supervisor", data);
    return res.data.data?.request;
  } catch (error) {
    toast.error(error.response.data.message || "Failed to request supervisors");
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const studentSlice = createSlice({
  name: "student",
  initialState: {
    project: null,
    files: [],
    supervisors: [],
    dashboardStats: [],
    supervisor: null,
    deadlines: [],
    feedback: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitProjectProposal.fulfilled,(state,action)=>{
      state.project = action.payload?.project || action.payload;
    });
    builder.addCase(fetchProject.fulfilled,(state,action)=>{
      state.project = action.payload?.project || action.payload || null;
    });
    builder.addCase(getSupervisor.fulfilled,(state,action)=>{
      state.supervisor = action.payload?.supervisor || action.payload || null;
    });
    builder.addCase(fetchAllSupervisors.fulfilled,(state,action)=>{
      state.supervisors = action.payload?.supervisors || action.payload || [];
    });
  },
});

export default studentSlice.reducer;
