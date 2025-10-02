import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { ComplaintFormData } from "./userTypes";

export interface Complaint {
  _id?: string;
  name?: string;
  email?: string;
  subject: string;
  message: string;
  status?: string;
  priority?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ComplaintState {
  complaints: Complaint[];
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ComplaintState = {
  complaints: [],
  loading: false,
  success: false,
  error: null,
};

// ✅ Base API URL – matches your Express router
const API_URL = "https://ecodrive-rentals.onrender.com/api/contacts";

// ✅ Centralized auth header helper
const authHeader = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("User not authenticated — please log in.");
  return {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  };
};

// 📩 POST - Submit a complaint
export const submitComplaint = createAsyncThunk(
  "complaints/submitComplaint",
  async (data: ComplaintFormData, { rejectWithValue }) => {
    try {
      const res = await axios.post(API_URL, data, authHeader());
      return res.data as Complaint;
    } catch (err: any) {
      console.error("❌ Complaint submission failed:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || "Failed to submit complaint"
      );
    }
  }
);

// 📜 GET - Fetch complaints
export const fetchComplaints = createAsyncThunk(
  "complaints/fetchComplaints",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(API_URL, authHeader());
      return res.data as Complaint[];
    } catch (err: any) {
      console.error("❌ Fetch complaints failed:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch complaints"
      );
    }
  }
);

// ✏️ PUT - Update a complaint
export const updateComplaint = createAsyncThunk(
  "complaints/updateComplaint",
  async (
    { id, updatedData }: { id: string; updatedData: Partial<Complaint> },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, updatedData, authHeader());
      dispatch(fetchComplaints()); // refresh list
      return res.data as Complaint;
    } catch (err: any) {
      console.error("❌ Update complaint failed:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || "Failed to update complaint"
      );
    }
  }
);


// 🗑️ DELETE - Remove a complaint
export const deleteComplaint = createAsyncThunk(
  "complaints/deleteComplaint",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, authHeader());
      // 🔄 Refresh list after delete
      dispatch(fetchComplaints());
      return id;
    } catch (err: any) {
      console.error("❌ Delete complaint failed:", err.response?.data || err.message);
      return rejectWithValue(
        err.response?.data?.message || "Failed to delete complaint"
      );
    }
  }
);

const complaintSlice = createSlice({
  name: "complaints",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    clearComplaints: (state) => {
      state.complaints = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // 📩 Submit
      .addCase(submitComplaint.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitComplaint.fulfilled, (state, action: PayloadAction<Complaint>) => {
        state.loading = false;
        state.success = true;
        state.complaints.push(action.payload);
      })
      .addCase(submitComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 📜 Fetch
      .addCase(fetchComplaints.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComplaints.fulfilled, (state, action: PayloadAction<Complaint[]>) => {
        state.loading = false;
        state.complaints = action.payload;
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ✏️ Update
      .addCase(updateComplaint.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(updateComplaint.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // 🗑️ Delete
      .addCase(deleteComplaint.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(deleteComplaint.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteComplaint.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStatus, clearComplaints } = complaintSlice.actions;
export default complaintSlice.reducer;
