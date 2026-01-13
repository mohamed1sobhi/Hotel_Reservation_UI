import React, { useState } from 'react';

const BookingTable = ({ bookings }) => {
    const [bookingStatusFilter, setBookingStatusFilter] = useState("all");

    const filteredBookings = bookings.filter((booking) => {
        if (bookingStatusFilter === "all") return true;
        return booking.status === bookingStatusFilter;
    });

    const handleBookingStatusFilterChange = (e) => {
        setBookingStatusFilter(e.target.value);
    };

    return (
        <div className="bookings-section">
            <div className="section-controls">
                <div className="filter-controls">
                    <select
                        onChange={handleBookingStatusFilterChange}
                        value={bookingStatusFilter}
                        className="filter-select"
                    >
                        <option value="all">All Bookings</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
            </div>

            <div className="data-table-container">
                {bookings && bookings.length > 0 ? (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Hotel</th>
                                <th>Client</th>
                                <th>Room Type</th>
                                <th>Dates</th>
                                <th>Price</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((booking) => (
                                <tr key={booking.id}>
                                    <td>
                                        <div className="hotel-cell">
                                            <div className="hotel-name">
                                                {booking.hotel_name}
                                            </div>
                                            <div className="hotel-address">
                                                {booking.hotel_address}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="client-cell">
                                            <div className="client-name">
                                                {booking.client_name}
                                            </div>
                                            <div className="client-email">
                                                {booking.client_email}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{booking.room_type}</td>
                                    <td>
                                        <div className="dates-cell">
                                            <div>Check-in: {booking.check_in}</div>
                                            <div>Check-out: {booking.check_out}</div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="price-cell">
                                            <div className="price-amount">
                                                ${booking.total_price}
                                            </div>
                                            <div className="hotel-rating">
                                                {booking.hotelRating} ★
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${booking.status}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button className="icon-button view">View</button>
                                            <button className="icon-button edit">Edit</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="no-data">No bookings found.</div>
                )}
            </div>
        </div>
    );
};

export default BookingTable;
