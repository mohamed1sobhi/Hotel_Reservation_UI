import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoomsByHotel } from "../../store/slices/rooms";
import { useParams } from "react-router-dom";

export default function RoomsPage() {
    const { hotelId } = useParams();
    const dispatch = useDispatch();
    const { rooms, loading, error } = useSelector((state) => state.rooms);
    const { roomImages  } = useSelector((state) => state.roomImages);
    useEffect(() => {
        dispatch(fetchRoomsByHotel(hotelId));
    }, [dispatch, hotelId]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container py-4">
                <div className="alert alert-danger">
                    <p>Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container py-4">
            <h1 className="text-center fw-bold mb-4">Available Rooms</h1>
            {!rooms || rooms.length === 0 ? (
                <div className="text-center py-5">
                    <h2 className="text-muted">No rooms available</h2>
                </div>
            ) : (
                <div className="row g-4">
                    {rooms.map((room) => (
                        <div key={room.id} className="col-md-6 col-lg-4">
                            <div className="card h-100 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title fw-bold">{room.room_type}</h5>
                                    <p className="card-text text-muted">
                                        Price per night: {room.price_per_night} EGP
                                    </p>
                                    <p className="card-text text-muted">
                                        Available rooms: {room.available_rooms}
                                    </p>
                                    <p className="card-text text-muted">
                                        Amenities: {room.amenities || "N/A"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}