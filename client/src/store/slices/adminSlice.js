import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

export const createStudent = createAsyncThunk("createStudent", async(Data, thunkAPI) => {
  try {
    const res = await axiosInstance.post("",data);
    toast.success(res.data.message || "Student created successfully");
    return res.data.data.user;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create Student");
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
})
export const updateStudent = createAsyncThunk("updateStudent", async({id,data}, thunkAPI) => {
  try {
    const res = await axiosInstance.put(``,data);
    toast.success(res.data.message || "Student updated successfully");
    return res.data.data.user;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update Student");
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
})
const adminSlice = createSlice({
  name: "admin",
  initialState: {
    students: [],
    teachers: [],
    projects: [],
    users: [],
    stats: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export default adminSlice.reducer;
