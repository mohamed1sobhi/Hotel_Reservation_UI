import React, { useState } from 'react';

const HotelTable = ({ hotels }) => {
    const [hotelFilter, setHotelFilter] = useState("all");

    const filteredHotels = hotels.filter((hotel) => {
        if (hotelFilter === "all") return true;
        return hotel.stars.toString() === hotelFilter;
    });

    const handleHotelFilterChange = (e) => {
        setHotelFilter(e.target.value);
    };

    return (
        <div className="hotels-section">
            <div className="section-controls">
                <div className="filter-controls">
                    <select
                        onChange={handleHotelFilterChange}
                        value={hotelFilter}
                        className="filter-select"
                    >
                        <option value="all">All Hotels</option>
                        <option value="3">3 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="5">5 Stars</option>
                        <option value="6">6 Stars</option>
                        <option value="7">7 Stars</option>
                    </select>
                </div>
                <div className="action-controls">
                    <button className="primary-button">Add New Hotel</button>
                </div>
            </div>

            <div className="data-table-container">
                {hotels && hotels.length > 0 ? (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Hotel Name</th>
                                <th>Address</th>
                                <th>Contact</th>
                                <th>Stars</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredHotels.map((hotel) => (
                                <tr key={hotel.id}>
                                    <td>
                                        <div className="hotel-name-cell">
                                            <strong>{hotel.name}</strong>
                                            <div className="hotel-description-preview">
                                                {hotel.description?.substring(0, 60)}...
                                            </div>
                                        </div>
                                    </td>
                                    <td>{hotel.address}</td>
                                    <td>
                                        <div>
                                            <div>{hotel.email}</div>
                                            <div>{hotel.phone}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="hotel-stars">
                                            {hotel.stars} <span className="star-icon">★</span>
                                        </div>
                                    </td>
                                    <td>
                                        {new Date(hotel.created_at).toLocaleDateString()}
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="icon-button view">View</button>
                                            <button className="icon-button edit">Edit</button>
                                            <button className="icon-button delete">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-data">No hotels found.</div>
                )}
            </div>
        </div>
    );
};

export default HotelTable;
