import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser } from "../../services/user.service";
import axiosInstance from "../../config/axios_conf"; // Keep for login/logout actions if not fully moved yet

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCurrentUser();
      return response.data; // User data
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/accounts/login/", {
        username,
        password,
      });
      console.log("Login Response:", response.data);
      // The backend should set the cookie.
      // We might still get tokens in body, but we ignore them for storage given the plan.
      // But we need to return user or fetch user. 
      // If login response includes user, good.
      const { user } = response.data; 
      return { user };
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
    isInitialized: false, // To prevent redirect before checkAuth is done
  },
  reducers: {
    logout(state) {
      // localStorage cleanup not needed with cookies, 
      // but if we used to set them, we can clear them for safety (optional)
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
      
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = "Username or password are not correct";
        state.isAuthenticated = false;
      })
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        // We probably don't want to set global loading here if we handle it in App.jsx
        // state.loading = true; 
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isInitialized = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isInitialized = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
