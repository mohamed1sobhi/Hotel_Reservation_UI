import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomDetail } from "../store/slices/rooms";
import { fetchRoomImages } from "../store/slices/room_images";

const RoomDetails = () => {
    const { _id } = useParams();
    const dispatch = useDispatch();
    const { roomDetail, loading, error } = useSelector((state) => state.rooms);
    const { images } = useSelector((state) => state.roomImages);

    useEffect(() => {
        if (_id) {
            dispatch(fetchRoomDetail(_id));
            dispatch(fetchRoomImages(_id));
        }
    }, [dispatch, _id]);

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
            <h1 className="text-center fw-bold mb-4">Room Details</h1>
            <div className="card mb-4 shadow-sm">
                <div className="card-body">
                    <h5 className="card-title fw-bold">
                        {roomDetail?.room_type?.room_type || "Room Type"}
                    </h5>
                    <p className="card-text text-muted">
                        Price per night: {roomDetail.price_per_night} EGP
                    </p>
                    <p className="card-text text-muted">
                        Available rooms: {roomDetail.available_rooms}
                    </p>
                    <p className="card-text text-muted">
                        Total rooms: {roomDetail.total_rooms}
                    </p>
                    <p className="card-text text-muted">
                        Amenities: {roomDetail.amenities}
                    </p>
                </div>
            </div>

            <h2 className="text-center fw-bold mb-4">Room Images</h2>
            <div className="row g-4">
                {images.map((image) => (
                    <div key={image.id} className="col-md-6 col-lg-4">
                        <img
                            src={`http://127.0.0.1:8000${image.image}`}
                            alt={`Room Image ${image.id}`}
                            className="img-fluid rounded"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomDetails;
