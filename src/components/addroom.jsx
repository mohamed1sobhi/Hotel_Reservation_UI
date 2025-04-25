// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { fetchHotelRoomsType, addRoom } from '../store/slices/rooms';
// import { editRoom } from '../store/slices/rooms';

// const AddRoom = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { HotelId } = useParams();
//   const { hotelRoomTypes, loadin, erro } = useSelector((state) => state.rooms);

//   const [roomData, setRoomData] = useState({
//     hotel: HotelId,
//     room_type: "",
//     price_per_night: "",
//     // available_rooms: "",
//     total_rooms: "",
//     amenities: ""
//   });

//   useEffect(() => {
//     dispatch(fetchHotelRoomsType(HotelId));
//   }, [dispatch, HotelId]);

//   const handleChange = (e) => {
//     setRoomData({ ...roomData, [e.target.name]: e.target.value });
//     console.log("changed", e.target.name, e.target.value);
//     console.log("Room Data:", roomData);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(addRoom(roomData));
//     navigate('/');
//   };

//   const selectedRoomTypeName = hotelRoomTypes.find(
//     (type) => type.id.toString() === roomData.room_type
//   )?.room_type;

//   return (
//     <div>
//       <h1>Add Room</h1>
//       <form onSubmit={handleSubmit}>
//         <label >price per night </label>
//         <input
//           type="number"
//           name="price_per_night"
//           placeholder="Price per Night"
//           value={roomData.price_per_night}
//           onChange={handleChange}
//         />
//         <label >Total Rooms</label>
//         <input
//           type="number"
//           name="total_rooms"
//           placeholder="Total Rooms"
//           value={roomData.total_rooms}
//           onChange={handleChange}
//         />
//         <label >Amenities</label>
//         <input
//           type="text"
//           name="amenities"
//           placeholder="Amenities"
//           value={roomData.amenities}
//           onChange={handleChange}
//         />
//         {/* <label >available_rooms</label>
//         <input
//         type="number"
//         name="available_rooms"
//         placeholder="Available Rooms"
//         value={roomData.available_rooms}
//         onChange={handleChange}
//         /> */}
//         <label htmlFor="roomType">Room Type:</label>
//         <select
//           name="room_type"
//           value={roomData.room_type}
//           onChange={handleChange}
//         >
//           <option value="">----</option>
//           {hotelRoomTypes.map((type) => (
//             <option key={type.id} value={type.id}>
//               {type.room_type}
//             </option>
//           ))}
//         </select>
//         {/* {roomData.room_type && (
//           <p>Selected Room Type: <strong>{selectedRoomTypeName}</strong></p>
//         )} */}

//         <button type="submit">Add Room</button>
//       </form>
//     </div>
//   );
// };

// export default AddRoom;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  addRoom,
  editRoom,
  fetchRoomDetail,
  fetchHotelRoomsType,
} from '../store/slices/rooms';

const AddRoom = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {HotelId, roomId } = useParams(); // Get roomId from URL
  const isEdit = !!roomId;

  const {roomDetail,hotelRoomTypes ,loading } = useSelector((state) => state.rooms);
  console.log("roomDetail", roomDetail);
  const [roomData, setRoomData] = useState({
    hotel: HotelId,
    room_type: "",
    price_per_night: "",
    total_rooms: "",
    amenities: ""
  });

  useEffect(() => {
    dispatch(fetchRoomDetail(roomId));
    dispatch(fetchHotelRoomsType(HotelId));
    if (isEdit && roomDetail) {
      dispatch(fetchHotelRoomsType(roomDetail.hotel));
      setRoomData({
        hotel: roomDetail.hotel,
        room_type: roomDetail.room_type,
        price_per_night: roomDetail.price_per_night,
        total_rooms: roomDetail.total_rooms,
        amenities: roomDetail.amenities
      });
    }
  }, [dispatch, HotelId, isEdit]);

  const handleChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(editRoom({ id: roomId, data: roomData }));
    } else {
      dispatch(addRoom(roomData));
    }
    navigate('/');
  };

  return (
    <div>
      <h1>{isEdit ? "Edit Room" : "Add Room"}</h1>
      <form onSubmit={handleSubmit}>
        <label>Price per Night</label>
        <input
          type="number"
          name="price_per_night"
          placeholder="Price per Night"
          value={roomData.price_per_night}
          onChange={handleChange}
        />

        <label>Total Rooms</label>
        <input
          type="number"
          name="total_rooms"
          placeholder="Total Rooms"
          value={roomData.total_rooms}
          onChange={handleChange}
        />

        <label>Amenities</label>
        <input
          type="text"
          name="amenities"
          placeholder="Amenities"
          value={roomData.amenities}
          onChange={handleChange}
        />

        <label>Room Type:</label>
        <select
          name="room_type"
          value={roomData.room_type}
          onChange={handleChange}
        >
          <option value="">----</option>
          {hotelRoomTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.room_type}
            </option>
          ))}
        </select>

        <button type="submit">{isEdit ? "Update Room" : "Add Room"}</button>
      </form>
    </div>
  );
};

export default AddRoom;

