import React, { use, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from '../../components/Common/Loader';
import { fetchHotels, removeHotel ,fetchHotelDetail } from '../../store/slices/hotels';

import HotelHero from "../../components/HotelDetails/HotelHero";
import HotelInfo from "../../components/HotelDetails/HotelInfo";
import HotelActions from "../../components/HotelDetails/HotelActions";

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const {hotelDetail} = useSelector((state) => state.hotels);
  const hotel = useSelector(state =>
    state.hotels.hotels.find(hotel => hotel.id === parseInt(id))
  );
  useEffect(() => {
    if (!hotel) {
      dispatch(fetchHotels());
    }
    dispatch(fetchHotelDetail(id));
  }, [dispatch, hotel]);
console.log("the hotel detail is ", hotelDetail);

const handleDelete = () => {
  dispatch(removeHotel(id))
    .unwrap()
    .then(() => {
      setShowDeleteModal(false);
      navigate("/hotels");
    })
    .catch((error) => {
      console.error("Error deleting hotel:", error);
      alert("An error occurred while deleting the hotel. Please try again.");
    });
};
  if (!hotel) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
          < Loader type="hotels" />
      </div>
    );
  }

  return (
    <div>
      <HotelHero hotel={hotel} />
      
      {/* Breadcrumb Navigation */}
      <nav aria-label="breadcrumb" className="bg-light py-2 px-3 rounded mt-4">
        <ol className="breadcrumb mb-0">
          <li className="breadcrumb-item">
            <a href="/" className="text-decoration-none text-primary">
              Home
            </a>

          </li>
          <li className="breadcrumb-item">
            <a href="/hotels" className="text-decoration-none text-primary">
              {hotel.name} 
            </a>
            
          </li>
          <li
            className="breadcrumb-item active text-secondary"
            aria-current="page"
          >
            Details
          </li>
        </ol>
      </nav>
      <div className="container py-4">
        <HotelInfo hotel={hotel} />

        <HotelActions 
            hotel={hotel} 
            navigate={navigate} 
            onDelete={() => setShowDeleteModal(true)} 
        />

      </div>
      <div className="modal fade show" tabIndex="-1" style={{ display: showDeleteModal ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-danger">Confirm Deletion</h5>
              <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete <strong>{hotel.name}</strong>?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
        {/* Backdrop */}

      </div>

    </div>

  );
}

