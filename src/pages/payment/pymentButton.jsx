import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processSinglePayment } from '../../store/slices/payments';

const ProcessPayment = ({ paymentId }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.payments);

  const handleProcessPayment = () => {
    dispatch(processSinglePayment(paymentId));
  };

  return (
    <div className="container">
      <h1 className="my-4">Process Payment</h1>
      {loading && (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Processing...</span>
          </div>
          <p>Processing payment...</p>
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          Error: {error}
        </div>
      )}
      <button className="btn btn-success" onClick={handleProcessPayment} disabled={loading}>
        {loading ? 'Processing...' : 'Process Payment'}
      </button>
    </div>
  );
};

export default ProcessPayment;
