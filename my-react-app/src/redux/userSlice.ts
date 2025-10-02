// src/redux/slices/userSlice.ts
import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import type {
  User,
  RegisterUserInput,
  LoginUserInput,
  UpdateUserInput,
} from "./userTypes";
import { clearComplaints } from "./complaintSlice";

const API_URL = "https://ecodrive-rentals.onrender.com/api/users";

// ------------------ ASYNC THUNKS ------------------ //

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: RegisterUserInput, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<User>(`${API_URL}/register`, userData);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: LoginUserInput, { rejectWithValue }) => {
    try {
      const { data } = await axios.post<User>(`${API_URL}/login`, credentials);
      // ✅ Save token separately for authHeader()
      if (data?.token) localStorage.setItem("token", data.token);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async (
    {
      id,
      updates,
      token,
    }: { id: string; updates: UpdateUserInput; token: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.put<User>(`${API_URL}/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ NEW: Logout thunk (to clear complaints too)
export const logoutUser = createAsyncThunk("user/logoutUser", async (_, { dispatch }) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  dispatch(clearComplaints());
  return null;
});

// ------------------ SLICE ------------------ //

interface UserState {
  userInfo: User | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
}

const initialState: UserState = {
  userInfo: null,
  loading: false,
  error: null,
  success: false,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetAuthStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
        state.success = true;
        state.message = "Registration successful!";
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      }
    );
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
        state.success = true;
        state.message = "Login successful!";
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });

    // Update
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      updateUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.error = null;
        state.success = true;
        state.message = "Profile updated successfully!";
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      }
    );
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });

    // Delete
    builder.addCase(deleteUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.userInfo = null;
      state.error = null;
      state.loading = false;
      state.success = true;
      state.message = "Account deleted successfully!";
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
    });
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });

    // ✅ Logout thunk handled here
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.userInfo = null;
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    });
  },
});

export const { resetAuthStatus } = userSlice.actions;
export default userSlice.reducer;
