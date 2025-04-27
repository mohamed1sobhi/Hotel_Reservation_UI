import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPaymentDetail } from "../store/slices/payments";

const BookingDetail = () => {
  const { UserId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { paymentDetail } = useSelector((state) => state.payments || {});

  useEffect(() => {
    dispatch(fetchPaymentDetail(UserId));
  }, [dispatch, UserId]);

  const handlePayment = () => {
    if (paymentDetail && paymentDetail.id) {
      navigate(`/payment/client-info/${paymentDetail.id}`);
    } else {
      console.error("Payment detail or ID is missing");
    }
  };

  if (!paymentDetail) {
    return <p>Loading booking details...</p>;
  }

  return (
    <div className="booking-details container mt-4">
      <h2>Booking Details</h2>

      <div className="card p-3 mb-3">
        <h4>Hotel: {paymentDetail.hotel?.name}</h4>
        <p><strong>Address:</strong> {paymentDetail.hotel?.address}</p>
        <p><strong>Stars:</strong> {paymentDetail.hotel?.stars}</p>
        <p><strong>Check-in:</strong> {paymentDetail.check_in}</p>
        <p><strong>Check-out:</strong> {paymentDetail.check_out}</p>
        <p><strong>Days:</strong> {paymentDetail.days}</p>
        <p><strong>Status:</strong> {paymentDetail.status}</p>
        <p><strong>Total Price:</strong> {paymentDetail.total_price} EGP</p>

        <h5 className="mt-4">Rooms Booked:</h5>
        {paymentDetail.items && paymentDetail.items.length > 0 ? (
          paymentDetail.items.map((item) => (
            <div key={item.id} className="mb-2">
              <p><strong>Room Type:</strong> {item.room_type?.room_type}</p>
              <p><strong>Quantity:</strong> {item.quantity}</p>
            </div>
          ))
        ) : (
          <p>No rooms booked.</p>
        )}
      </div>

      <div className="payment-section text-center">
        <button onClick={handlePayment} className="btn btn-primary">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default BookingDetail;
