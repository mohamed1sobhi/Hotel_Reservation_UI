import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { refundSinglePayment } from './redux/slices/payments';

const RefundPayment = ({ paymentId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.payments);

  const handleRefundPayment = () => {
    dispatch(refundSinglePayment(paymentId));
  };

  return (
    <div className="container">
      <h1 className="my-4">Refund Payment</h1>
      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Refunding...</span>
          </div>
          <p>Refunding payment...</p>
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      )}
      <button className="btn btn-danger" onClick={handleRefundPayment} disabled={loading}>
        {loading ? 'Refunding...' : 'Refund Payment'}
      </button>
    </div>
  );
};

export default RefundPayment;
