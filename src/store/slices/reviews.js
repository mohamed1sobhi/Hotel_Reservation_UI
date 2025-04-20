import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllReviews, createReview, getReviewDetail, getHotelReviews } from "../../services/api";

// Fetch all reviews
export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllReviews();
      return response;
    } catch (error) {
      console.error('Fetch Reviews Error:', error);
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

// Create a new review
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createReview(data);
      return response;
    } catch (error) {
      console.error('Create Review Error:', error);
      return rejectWithValue(error.response?.data?.message || "Failed to create review");
    }
  }
);

// Get details of a specific review
export const fetchReviewDetail = createAsyncThunk(
  "reviews/fetchReviewDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getReviewDetail(id);
      return response;
    } catch (error) {
      console.error('Fetch Review Detail Error:', error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch review details");
    }
  }
);

// Get all reviews for a specific hotel
export const fetchHotelReviews = createAsyncThunk(
  "reviews/fetchHotelReviews",
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await getHotelReviews(hotelId);
      return response;
    } catch (error) {
      console.error('Fetch Hotel Reviews Error:', error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch hotel reviews");
    }
  }
);

// Initial state
const initialState = {
  reviews: [],
  loading: false,
  error: null,
  reviewDetail: null,
  hotelReviews: [],
};

// Slice
const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Review
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload); // ✅ add new review to the list
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Review Detail
      .addCase(fetchReviewDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewDetail = action.payload;
      })
      .addCase(fetchReviewDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Hotel Reviews
      .addCase(fetchHotelReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHotelReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.hotelReviews = action.payload;
      })
      .addCase(fetchHotelReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewsSlice.reducer;
