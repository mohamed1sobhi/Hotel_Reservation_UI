import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { editCurrentAdmindata, fetchCurrentAdmin } from '../../store/slices/accounts';

const AdminProfile = ({ userDetail }) => {
    const dispatch = useDispatch();
    const [showUserDataEditForm, setShowUserDataEditForm] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        password2: "",
    });
    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        if (userDetail) {
            setFormData(prev => ({
                ...prev,
                username: userDetail.username || "",
                email: userDetail.email || "",
                phone: userDetail.phone || ""
            }));
        }
    }, [userDetail]);

    const handleFormSuccess = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(editCurrentAdmindata(formData));
            if (editCurrentAdmindata.fulfilled.match(resultAction)) {
                dispatch(fetchCurrentAdmin());
                setShowUserDataEditForm(false);
                setFormErrors({});
            } else {
                console.log("Form submission failed with errors.", resultAction.payload);
                 setFormErrors(resultAction.payload || {});
            }
        } catch (err) {
            console.log("Unexpected error:", err);
        }
    };

    return (
        <div className="profile-section">
            <div className="profile-card">
                {userDetail ? (
                    <div className="profile-content">
                        <div className="profile-header">
                            <div className="profile-avatar">
                                {userDetail.username?.charAt(0).toUpperCase() || "A"}
                            </div>
                            <div className="profile-title">
                                <h2>{userDetail.username}</h2>
                                <span className="admin-badge">{userDetail.role}</span>
                            </div>
                        </div>

                        <div className="profile-details">
                            <div className="detail-group">
                                <h3>Contact Information</h3>
                                <div className="detail-row">
                                    <div className="detail-label">Email</div>
                                    <div className="detail-value">{userDetail.email}</div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">Phone</div>
                                    <div className="detail-value">
                                        {userDetail.phone || "Not provided"}
                                    </div>
                                </div>
                            </div>

                            <div className="detail-group">
                                <h3>Account Settings</h3>
                                <div className="detail-row">
                                    <div className="detail-label">Status</div>
                                    <div className="detail-value">
                                        <span className="status-active">Active</span>
                                    </div>
                                </div>
                                <div className="detail-row">
                                    <div className="detail-label">Last Login</div>
                                    <div className="detail-value">Today, 9:30 AM</div>
                                </div>
                            </div>
                        </div>

                        <div className="profile-actions">
                            <button
                                className="primary-button"
                                onClick={() => setShowUserDataEditForm(true)}
                            >
                                Edit Profile
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="loading-profile">
                        Loading profile information...
                    </div>
                )}
            </div>

            <Modal
                show={showUserDataEditForm}
                onHide={() => setShowUserDataEditForm(false)}
                centered
                className="custom-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleFormSuccess}>
                        <Form.Group controlId="username" className="form-group">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder="Name"
                                value={formData.username}
                                onChange={(e) =>
                                    setFormData({ ...formData, username: e.target.value })
                                }
                            />
                            {formErrors?.username?.[0] && (
                                <div className="invalid-feedback d-block">
                                    {formErrors.username}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group controlId="email" className="form-group">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                            />
                            {formErrors?.email?.[0] && (
                                <div className="invalid-feedback d-block">
                                    {formErrors.email}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group controlId="phone" className="form-group">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                            />
                            {formErrors?.phone?.[0] && (
                                <div className="invalid-feedback d-block">
                                    {formErrors.phone}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group controlId="password" className="form-group">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Old Password"
                                onChange={(e) =>
                                    setFormData({ ...formData, password: e.target.value })
                                }
                            />
                            {formErrors?.password?.[0] && (
                                <div className="invalid-feedback d-block">
                                    {formErrors.password}
                                </div>
                            )}
                        </Form.Group>

                        <Form.Group controlId="password2" className="form-group">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password2"
                                placeholder="New Password"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        password2: e.target.value,
                                    })
                                }
                            />
                            {formErrors?.password2?.[0] && (
                                <div className="invalid-feedback d-block">
                                    {formErrors.password2}
                                </div>
                            )}
                        </Form.Group>

                        <div className="modal-actions">
                            <Button
                                variant="secondary"
                                onClick={() => setShowUserDataEditForm(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="primary"
                                className="border-0"
                                type="submit"
                            >
                                Update Profile
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default AdminProfile;
