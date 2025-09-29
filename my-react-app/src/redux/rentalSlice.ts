// src/redux/rentalSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "./store";

const API_URL = "http://localhost:5000/api/rentals";

// =================== TYPES ===================
export interface Rental {
  _id: string;
  carId: number;
  startDate: string;
  endDate: string;
  totalCost: number;
  status: "active" | "cancelled" | "completed";
  createdAt: string;
  updatedAt: string;
}

export interface CreateRentalInput {
  carId: number;
  startDate: string;
  endDate: string;
  pricePerDay: number;
}

export interface UpdateRentalInput {
  id: string;
  startDate: string;
  endDate: string;
  pricePerDay: number;
}

// =================== ASYNC ACTIONS ===================

// Create Rental
export const createRental = createAsyncThunk(
  "rentals/create",
  async (rentalData: CreateRentalInput, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<Rental>(API_URL, rentalData, {
        withCredentials: true,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch Rentals
export const fetchMyRentals = createAsyncThunk(
  "rentals/fetchMyRentals",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<Rental[]>(`${API_URL}/myrentals`, {
        withCredentials: true,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update Rental (within 12 hours)
export const updateRental = createAsyncThunk(
  "rentals/update",
  async (rentalData: UpdateRentalInput, { rejectWithValue }) => {
    try {
      const { id, ...updates } = rentalData;
      const { data } = await axios.put<Rental>(`${API_URL}/${id}`, updates, {
        withCredentials: true,
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Cancel Rental (within 12 hours)
export const cancelRental = createAsyncThunk(
  "rentals/cancel",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete<{ rental: Rental }>(`${API_URL}/${id}`, {
        withCredentials: true,
      });
      return data.rental;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// =================== SLICE ===================
interface RentalState {
  rentals: Rental[];
  loading: boolean;
  error: string | null;
}

const initialState: RentalState = {
  rentals: [],
  loading: false,
  error: null,
};

const rentalSlice = createSlice({
  name: "rentals",
  initialState,
  reducers: {
    resetRentalState: (state) => {
      state.rentals = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Rental
      .addCase(createRental.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRental.fulfilled, (state, action: PayloadAction<Rental>) => {
        state.loading = false;
        state.rentals.push(action.payload);
      })
      .addCase(createRental.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Rentals
      .addCase(fetchMyRentals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyRentals.fulfilled, (state, action: PayloadAction<Rental[]>) => {
        state.loading = false;
        state.rentals = action.payload;
      })
      .addCase(fetchMyRentals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Update Rental
      .addCase(updateRental.fulfilled, (state, action: PayloadAction<Rental>) => {
        state.loading = false;
        const index = state.rentals.findIndex((r) => r._id === action.payload._id);
        if (index !== -1) state.rentals[index] = action.payload;
      })
      .addCase(updateRental.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Cancel Rental
      .addCase(cancelRental.fulfilled, (state, action: PayloadAction<Rental>) => {
        state.loading = false;
        const index = state.rentals.findIndex((r) => r._id === action.payload._id);
        if (index !== -1) state.rentals[index] = action.payload;
      })
      .addCase(cancelRental.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { resetRentalState } = rentalSlice.actions;
export const selectRentals = (state: RootState) => state.rentals.rentals;
export const selectRentalLoading = (state: RootState) => state.rentals.loading;
export const selectRentalError = (state: RootState) => state.rentals.error;

export default rentalSlice.reducer;
