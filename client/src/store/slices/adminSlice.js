import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

export const createStudent = createAsyncThunk("createStudent", async(data, thunkAPI) => {
  try {
    const res = await axiosInstance.post("/admin/create-student",data);
    toast.success(res.data.message || "Student created successfully");
    return res.data.data.user;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create Student");
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
})
export const updateStudent = createAsyncThunk("updateStudent", async({id,data}, thunkAPI) => {
  try {
    const res = await axiosInstance.put(`/admin/update-student/${id}`,data);
    toast.success(res.data.message || "Student updated successfully");
    return res.data.data.user;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update Student");
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
})
export const deleteStudent = createAsyncThunk("deleteStudent", async(id, thunkAPI) => {
  try {
    const res = await axiosInstance.delete(`/admin/delete-student/${id}`);
    toast.success(res.data.message || "Student deleted successfully");
    return id;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete Student");
    return thunkAPI.rejectWithValue(error.response?.data?.message);
  }
})
export const getAllUsers = createAsyncThunk("getAllUsers", async(id, thunkAPI) => {
  try {
    const res = await axiosInstance.get(`/admin/users`);
    return res.data.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to retreived Users");
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
  extraReducers: (builder) => {
    
  },
});

export default adminSlice.reducer;
