import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../config/axios_conf.js';

export const submitClientInfo = createAsyncThunk(
  'payments/submitClientInfo',
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/payments/client-info/', clientData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

export const submitPaymentMethod = createAsyncThunk(
  'payments/submitPaymentMethod',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/payments/payment-method/', paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'An error occurred');
    }
  }
);

const initialState = {
  clientInfoStatus: 'idle', 
  paymentMethodStatus: 'idle',
  paymentData: null,
  error: null,
  paymentSuccess: null,
};

const paymentSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    resetPaymentState: (state) => {
      state.clientInfoStatus = 'idle';
      state.paymentMethodStatus = 'idle';
      state.error = null;
      state.paymentSuccess = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitClientInfo.pending, (state) => {
        state.clientInfoStatus = 'loading';
        state.error = null;
      })
      .addCase(submitClientInfo.fulfilled, (state, action) => {
        state.clientInfoStatus = 'succeeded';
        state.paymentData = action.payload;
        state.error = null;
      })
      .addCase(submitClientInfo.rejected, (state, action) => {
        state.clientInfoStatus = 'failed';
        state.error = action.payload || 'Failed to submit client information';
      })

      .addCase(submitPaymentMethod.pending, (state) => {
        state.paymentMethodStatus = 'loading';
        state.error = null;
      })
      .addCase(submitPaymentMethod.fulfilled, (state, action) => {
        state.paymentMethodStatus = 'succeeded';
        state.paymentSuccess = action.payload;
        state.error = null;
      })
      .addCase(submitPaymentMethod.rejected, (state, action) => {
        state.paymentMethodStatus = 'failed';
        state.error = action.payload || 'Failed to process payment';
      });
  },
});

export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;

