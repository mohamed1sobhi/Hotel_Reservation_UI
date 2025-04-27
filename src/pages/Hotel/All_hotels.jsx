import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHotels, filterHotels, removeHotel } from '../../store/slices/hotels';
import { Star, Search } from 'lucide-react';
import Pagination from '../../components/Pagination';
import { useNavigate } from "react-router-dom";
import HotelFormModal from "../../components/HotelFormModal";

export default function HotelListingPage() {
  const dispatch = useDispatch();
  const { hotels, loading, error } = useSelector(state => state.hotels);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStars, setFilterStars] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  console.log("the show modal is ",showModal)

  const navigate = useNavigate();

  const handleCloseModal = () => {
    console.log("Closing modal");
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(fetchHotels());
  }, [dispatch]);

  const handleStarFilter = (stars) => {
    setFilterStars(stars);
    dispatch(filterHotels(stars));
  };

  const resetFilters = () => {
    setFilterStars(0);
    setSearchTerm('');
    dispatch(fetchHotels());
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteHotel = (id) => {
    if (window.confirm("Are you sure you want to delete this hotel?")) {
      dispatch(removeHotel(id));
    }
  };

  const filteredHotels = searchTerm
    ? hotels.filter(hotel => 
        hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hotel.location?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : hotels;

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
          <button
            className="btn btn-primary mt-2"
            onClick={() => dispatch(fetchHotels())}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="text-center fw-bold mb-4">Discover Our Hotels</h1>
      
      <button className="btn btn-primary mb-4" onClick={() => setShowModal(true)}>
        Add Hotel
      </button>

      {showModal && (
        <>
          <HotelFormModal HOTEL_ID={hotelId} onClose={handleCloseModal} />
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Search and Filter */}
      <div className="bg-white shadow rounded p-4 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-md-6 position-relative">
            <Search className="position-absolute top-50 translate-middle-y ms-3 text-secondary" size={20} />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search hotels by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="col-md-6 d-flex align-items-center gap-2">
            <span className="fw-medium small">Filter by rating:</span>
            <div className="d-flex">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => handleStarFilter(star)}
                  className={`btn btn-sm ${filterStars === star ? 'text-warning' : 'text-muted'}`}
                >
                  <Star fill={filterStars >= star ? "currentColor" : "none"} size={20} />
                </button>
              ))}
            </div>
            {(filterStars > 0 || searchTerm) && (
              <button
                onClick={resetFilters}
                className="btn btn-link text-primary text-decoration-none"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hotel Cards Grid */}
      {filteredHotels.length === 0 ? (
        <div className="text-center py-5">
          <h2 className="text-muted">No hotels found</h2>
          <p className="text-secondary">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredHotels.map(hotel => {
            const firstImage =
              hotel.image.length > 0
                ? hotel.image[0].image
                : hotel.name;

            return (
              <div key={hotel.id} className="col-md-6 col-lg-4">
                <div className="card h-100 shadow-sm">
                  <img
                    src={
                      firstImage.startsWith("/media/")
                        ? "http://127.0.0.1:8000/" + firstImage
                        : firstImage
                    }
                    alt={hotel.name}
                    className="card-img-top"
                    style={{ objectFit: 'cover', height: '200px' }}
                  />

                  <div className="position-absolute top-0 end-0 m-2 bg-white rounded px-2 py-1">
                    {Array(hotel.stars || 0).fill().map((_, i) => (
                      <Star key={i} size={16} fill="gold" color="gold" />
                    ))}
                  </div>

                  <div className="card-body">
                    <h5 className="card-title fw-bold">{hotel.name}</h5>

                    {hotel.phone && (
                      <p className="card-text text-muted mb-1">
                        {hotel.phone}
                      </p>
                    )}
                    
                    <div className="d-flex flex-wrap gap-2">
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => setShowModal(true)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteHotel(hotel.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => navigate(`/createimage/${hotel.id}`)}
                      >
                        Add Image
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => navigate(`/hotels/${hotel.id}/reviews`)}
                      >
                        View Reviews
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => navigate(`/addroom/${hotel.id}/`)}
                      >
                        Add Room
                      </button>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => navigate(`/addtype/${hotel.id}/`)}
                      >
                        Add Type
                      </button>
                    </div>
                  </div>

                  <div className="card-footer d-flex justify-content-between align-items-center">
                    <span className="fw-bold text-primary">
                      {hotel.price_range ? `${hotel.price_range} EGY` : "N/A"} <span className="fw-normal small">/night</span>
                    </span>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ borderRadius: "20px", border: "none" }}
                      onClick={() => navigate(`/hotels/${hotel.id}`)}
                    >
                      Show Rooms
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

