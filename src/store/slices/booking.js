// src/store/bookingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createBooking, getAllBookings } from '../../services/api'; // Adjust the import path as necessary
import axios from 'axios';

// Initial state for the booking slice
const initialState = {
  bookings: [],
  loading: false,
  error: null,
};

// Thunks for async actions
export const fetchAllBookings = createAsyncThunk('bookings/fetchAll', async () => {
  const response = await getAllBookings();
  return response.data;
});

export const addBooking = createAsyncThunk('bookings/add', async (data) => {
  const response = await createBooking(data);
  return response.data;
});

export const deleteBooking = createAsyncThunk('bookings/delete', async (id) => {
  await axios.delete(`/api/bookings/${id}/`);
  return id;
});



// Create the slice
const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetching all bookings
    builder.addCase(fetchAllBookings.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllBookings.fulfilled, (state, action) => {
      state.loading = false;
      state.bookings = action.payload;
    });
    builder.addCase(fetchAllBookings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Adding a new booking
    builder.addCase(addBooking.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addBooking.fulfilled, (state, action) => {
      state.loading = false;
      state.bookings.push(action.payload);
    });
    builder.addCase(addBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    
    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      state.bookings = state.bookings.filter((b) => b.id !== action.payload);
    });

  },
});

// Export actions
export default bookingSlice.reducer;
