import React from 'react';

const AdminSidebar = ({
    activeSection,
    setActiveSection,
    sidebarCollapsed,
    toggleSidebar,
    admin,
    onLogout
}) => {
    return (
        <div className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
            <div className="sidebar-header">
                <h2>{!sidebarCollapsed && "AdminPanel"}</h2>
                <button className="collapse-btn" onClick={toggleSidebar}>
                    {sidebarCollapsed ? "☰" : "✖"}
                </button>
            </div>
            <nav className="sidebar-nav">
                <button
                    className={activeSection === "dashboard" ? "active" : ""}
                    onClick={() => setActiveSection("dashboard")}
                >
                    <span className="nav-icon">📊</span>
                    <span className="nav-text">Dashboard</span>
                </button>
                <button
                    className={activeSection === "personal" ? "active" : ""}
                    onClick={() => setActiveSection("personal")}
                >
                    <span className="nav-icon">👤</span>
                    <span className="nav-text">Profile</span>
                </button>
                <button
                    className={activeSection === "users" ? "active" : ""}
                    onClick={() => setActiveSection("users")}
                >
                    <span className="nav-icon">👥</span>
                    <span className="nav-text">Users</span>
                </button>
                <button
                    className={activeSection === "bookings" ? "active" : ""}
                    onClick={() => setActiveSection("bookings")}
                >
                    <span className="nav-icon">📅</span>
                    <span className="nav-text">Bookings</span>
                </button>
                <button
                    className={activeSection === "hotels" ? "active" : ""}
                    onClick={() => setActiveSection("hotels")}
                >
                    <span className="nav-icon">🏨</span>
                    <span className="nav-text">Hotels</span>
                </button>
            </nav>

            <div className="sidebar-footer">
                <div className="admin-profile">
                    <div className="admin-avatar">
                        {admin?.username?.charAt(0).toUpperCase()}
                    </div>
                    {!sidebarCollapsed && (
                        <div className="admin-info">
                            <span className="admin-name">{admin?.username}</span>
                            <span className="admin-role">Super Admin</span>
                        </div>
                    )}
                </div>
                <button className="logout-button" onClick={onLogout}>
                    <span className="nav-icon">🚪</span>
                    {!sidebarCollapsed && <span className="nav-text">Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;
