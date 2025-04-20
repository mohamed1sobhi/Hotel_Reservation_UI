import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createBooking, getBookingDetail } from "../../services/api";

// Create a new booking
export const addBooking = createAsyncThunk(
  "bookings/addBooking",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createBooking(data);
      return response;
    } catch (error) {
      console.error('Create Booking Error:', error);
      return rejectWithValue(error.response?.data?.message || "Failed to create booking");
    }
  }
);

// Fetch booking details
export const fetchBookingDetail = createAsyncThunk(
  "bookings/fetchBookingDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getBookingDetail(id);
      return response;
    } catch (error) {
      console.error('Fetch Booking Detail Error:', error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch booking detail");
    }
  }
);

// Initial State
const initialState = {
  bookings: [],
  bookingDetail: null,
  loading: false,
  error: null,
};

// Slice
const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Booking
      .addCase(addBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings.push(action.payload);
      })
      .addCase(addBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Booking Detail
      .addCase(fetchBookingDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookingDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingDetail = action.payload;
      })
      .addCase(fetchBookingDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default bookingsSlice.reducer;
