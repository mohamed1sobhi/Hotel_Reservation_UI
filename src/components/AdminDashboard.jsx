import React from 'react';

const AdminDashboard = ({ users, bookings, hotels }) => {
    const stats = {
        totalUsers: users.length,
        totalHotels: hotels.length,
        totalBookings: bookings.length,
        pendingBookings: bookings.filter((b) => b.status === "pending").length,
        hotelOwners: users.filter((u) => u.role === "hotel_owner").length,
        customers: users.filter((u) => u.role === "customer").length,
    };

    return (
        <div className="dashboard-section">
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value">{stats.totalUsers}</div>
                    <div className="stat-label">Total Users</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{stats.totalHotels}</div>
                    <div className="stat-label">Hotels</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{stats.totalBookings}</div>
                    <div className="stat-label">Total Bookings</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{stats.pendingBookings}</div>
                    <div className="stat-label">Pending Bookings</div>
                </div>
            </div>

            <div className="dashboard-charts">
                <div className="dashboard-card recent-users">
                    <h3>Recent Users</h3>
                    <div className="recent-users-list">
                        {users.slice(0, 5).map((user) => (
                            <div className="recent-user" key={user.id}>
                                <div className="user-avatar">
                                    {user.username?.charAt(0).toUpperCase()}
                                </div>
                                <div className="user-info">
                                    <div className="user-name">{user.username}</div>
                                    <div className="user-role">{user.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="dashboard-card recent-bookings">
                    <h3>Latest Bookings</h3>
                    <div className="recent-bookings-list">
                        {bookings.slice(0, 5).map((booking) => (
                            <div className="recent-booking" key={booking.id}>
                                <div className="booking-info">
                                    <div className="booking-hotel">
                                        {booking.hotel_name}
                                    </div>
                                    <div className="booking-dates">
                                        {booking.check_in} to {booking.check_out}
                                    </div>
                                </div>
                                <div className={`booking-status ${booking.status}`}>
                                    {booking.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="dashboard-row">
                <div className="dashboard-card user-distribution">
                    <h3>User Distribution</h3>
                    <div className="distribution-stats">
                        <div className="distribution-item">
                            <div className="distribution-label">Hotel Owners</div>
                            <div className="distribution-bar">
                                <div
                                    className="distribution-fill hotel-owners"
                                    style={{
                                        width: `${stats.totalUsers ? (stats.hotelOwners / stats.totalUsers) * 100 : 0}%`,
                                    }}
                                ></div>
                            </div>
                            <div className="distribution-value">
                                {stats.hotelOwners}
                            </div>
                        </div>
                        <div className="distribution-item">
                            <div className="distribution-label">Customers</div>
                            <div className="distribution-bar">
                                <div
                                    className="distribution-fill customers"
                                    style={{
                                        width: `${stats.totalUsers ? (stats.customers / stats.totalUsers) * 100 : 0}%`,
                                    }}
                                ></div>
                            </div>
                            <div className="distribution-value">
                                {stats.customers}
                            </div>
                        </div>
                        <div className="distribution-item">
                            <div className="distribution-label">Admins</div>
                            <div className="distribution-bar">
                                <div
                                    className="distribution-fill admins"
                                    style={{
                                        width: `${stats.totalUsers ? ((stats.totalUsers - stats.hotelOwners - stats.customers) / stats.totalUsers) * 100 : 0}%`,
                                    }}
                                ></div>
                            </div>
                            <div className="distribution-value">
                                {stats.totalUsers - stats.hotelOwners - stats.customers}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
