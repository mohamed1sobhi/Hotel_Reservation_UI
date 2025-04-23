import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { 
  getAllRooms, 
  createRoom, 
  updateRoom, 
  deleteRoom, 
  getRoomDetail, 
  filterRoomsByType,
  getRoomsByHotel
} from "../../services/api";

// Fetch all rooms
export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllRooms();
      return response.data;
    } catch (error) {
      console.error('Fetch Rooms Error:', error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch rooms");
    }
  }
);

// Create a room
export const addRoom = createAsyncThunk(
  "rooms/addRoom",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createRoom(data);
      return response.data;
    } catch (error) {
      console.error('Create Room Error:', error);
      return rejectWithValue(error.response?.data?.message || "Failed to create room");
    }
  }
);

// Update a room
export const editRoom = createAsyncThunk(
  "rooms/editRoom",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateRoom(id, data);
      return response.data;
    } catch (error) {
      console.error('Update Room Error:', error);
      return rejectWithValue(error.response?.data?.message || "Failed to update room");
    }
  }
);

// Delete a room
export const removeRoom = createAsyncThunk(
  "rooms/removeRoom",
  async (id, { rejectWithValue }) => {
    try {
      await deleteRoom(id);
      return id;
    } catch (error) {
      console.error('Delete Room Error:', error);
      return rejectWithValue(error.response?.data?.message || "Failed to delete room");
    }
  }
);

// Get room details
export const fetchRoomDetail = createAsyncThunk(
  "rooms/fetchRoomDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await getRoomDetail(id);
      return response.data;
    } catch (error) {
      console.error('Fetch Room Detail Error:', error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch room details");
    }
  }
);

// Filter rooms by type
export const filterRooms = createAsyncThunk(
  "rooms/filterRooms",
  async (roomType, { rejectWithValue }) => {
    try {
      const response = await filterRoomsByType(roomType);
      return response.data;
    } catch (error) {
      console.error('Filter Rooms Error:', error);
      return rejectWithValue(error.response?.data?.message || "Failed to filter rooms");
    }
  }
);

// Fetch rooms by hotel ID
export const fetchRoomsByHotel = createAsyncThunk(
  "rooms/fetchRoomsByHotel",
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await getRoomsByHotel(hotelId);
      return response;
    } catch (error) {
      console.error("Fetch Rooms By Hotel Error:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch rooms for the hotel");
    }
  }
);
const initialState = {
  rooms: [],
  loading: false,
  error: null,
};
// Slice
const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch rooms
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add room
      .addCase(addRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms.push(action.payload);
      })
      .addCase(addRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Edit room
      .addCase(editRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editRoom.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.rooms.findIndex(room => room.id === action.payload.id);
        if (index !== -1) {
          state.rooms[index] = action.payload;
        }
      })
      .addCase(editRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Remove room
      .addCase(removeRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeRoom.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = state.rooms.filter(room => room.id !== action.payload);
      })
      .addCase(removeRoom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch room detail
      .addCase(fetchRoomDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.roomDetail = action.payload;
      })
      .addCase(fetchRoomDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Filter rooms
      .addCase(filterRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(filterRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch rooms by hotel
      .addCase(fetchRoomsByHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomsByHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload; // تحديث قائمة الغرف
      })
      .addCase(fetchRoomsByHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // تخزين الخطأ
      });
  },
});

 
export default roomsSlice.reducer;
