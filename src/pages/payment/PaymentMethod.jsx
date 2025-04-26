import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './PaymentStyles.css';
import { Card, Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../../config/axios_conf.js';

const PaymentMethod = () => {
  const { paymentId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(location.state?.paymentData || null);
  const [selectedMethod, setSelectedMethod] = useState('credit_card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [availablePaymentMethods, setAvailablePaymentMethods] = useState({
    credit_card: true,
    paypal: true,
    bank_transfer: true
  });

  const MOCK_PAYMENT_DATA = {
    payment_id: "123456",
    amount_to_pay: 299.70,
    is_deposit: true,
    booking_summary: {
      room_name: "Deluxe Suite with Ocean View",
      check_in: "2025-05-01",
      check_out: "2025-05-05",
      total_price: 999.00
    }
  };
  
  useEffect(() => {
    // For testing - use mock data directly instead of API calls
    const testMode = true; 
    
    if (testMode) {
      setPaymentData(MOCK_PAYMENT_DATA);
    } else if (!paymentData && paymentId) {
      fetchPaymentDetails();
    }
    
    if (testMode) {
      setAvailablePaymentMethods({
        credit_card: true,
        paypal: true,
        bank_transfer: true
      });
    } else {
      fetchPaymentSettings();
    }
  }, [paymentId, paymentData]);

  const fetchPaymentDetails = async () => {
    try {
      const response = await axiosInstance.get(`/payments/${paymentId}/`);
      setPaymentData(response.data);
    } catch (err) {
      setError('Failed to load payment details. Please try again.');
    }
  };

  const fetchPaymentSettings = async () => {
    try {
      // For development/testing, use mock data instead of making the API call
      if (process.env.NODE_ENV === 'development') {
        console.log("Using mock payment settings data");
        setAvailablePaymentMethods({
          credit_card: true,
          paypal: true,
          bank_transfer: true
        });
        return;
      }
      
      // Otherwise make the real API call
      const response = await axiosInstance.get('/payments/settings/');
      setAvailablePaymentMethods({
        credit_card: response.data.allow_card_payment,
        paypal: response.data.allow_paypal,
        bank_transfer: response.data.allow_bank_transfer
      });
    } catch (err) {
      // Fallback to default settings if fetch fails
      console.error('Failed to fetch payment settings:', err);
      setAvailablePaymentMethods({
        credit_card: true,
        paypal: true,
        bank_transfer: true
      });
    }
  };

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axiosInstance.post('/payments/payment-method/', {
        payment_id: paymentId,
        payment_method: selectedMethod
      });
      
      setSuccess(response.data);
      setTimeout(() => {
        navigate('/my-bookings');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'There was an error processing your payment.');
    } finally {
      setLoading(false);
    }
  };

  if (!paymentData) {
    return <div className="text-center mt-5">Loading payment details...</div>;
  }

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Select Payment Method</h1>
      
      {success && (
        <Alert variant="success" className="mb-4">
          <Alert.Heading>Payment Successful!</Alert.Heading>
          <p>Transaction ID: {success.transaction_id}</p>
          <p>Amount Paid: ${success.amount_paid}</p>
          {success.is_deposit && (
            <p>Remaining Amount Due: ${success.remaining_amount}</p>
          )}
          <p>Redirecting to your bookings...</p>
        </Alert>
      )}
      
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}
      
      <Row>
        <Col md={8}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-white">
              <h4>Payment Method</h4>
            </Card.Header>
            <Card.Body>
              {paymentData.is_deposit && (
                <Alert variant="info" className="mb-4">
                  <i className="bi bi-info-circle-fill me-2"></i>
                  You have selected cash payment. A 30% deposit of ${paymentData.amount_to_pay} is required to secure your booking.
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <div className="payment-methods mb-4">
                  {availablePaymentMethods.credit_card && (
                    <Card 
                      className={`mb-3 payment-method-card ${selectedMethod === 'credit_card' ? 'border-primary' : ''}`}
                      onClick={() => setSelectedMethod('credit_card')}
                      style={selectedMethod === 'credit_card' ? {borderColor: '#CD9A5E'} : {}}
                    >
                      <Card.Body>
                        <Form.Check
                          type="radio"
                          id="payment-credit-card"
                          name="payment_method"
                          value="credit_card"
                          checked={selectedMethod === 'credit_card'}
                          onChange={handleMethodChange}
                          label={
                            <div className="d-flex align-items-center">
                              <div className="payment-icon me-3">
                                <i className="bi bi-credit-card fs-3" style={{color: '#CD9A5E'}}></i>
                              </div>
                              <div>
                                <strong>Credit Card</strong>
                                <div className="text-muted small">Pay securely with your credit card</div>
                              </div>
                            </div>
                          }
                        />
                      </Card.Body>
                    </Card>
                  )}
                  
                  {availablePaymentMethods.paypal && (
                    <Card 
                      className={`mb-3 payment-method-card ${selectedMethod === 'paypal' ? 'border-primary' : ''}`}
                      onClick={() => setSelectedMethod('paypal')}
                      style={selectedMethod === 'paypal' ? {borderColor: '#CD9A5E'} : {}}
                    >
                      <Card.Body>
                        <Form.Check
                          type="radio"
                          id="payment-paypal"
                          name="payment_method"
                          value="paypal"
                          checked={selectedMethod === 'paypal'}
                          onChange={handleMethodChange}
                          label={
                            <div className="d-flex align-items-center">
                              <div className="payment-icon me-3">
                                <i className="bi bi-paypal fs-3" style={{color: '#CD9A5E'}}></i>
                              </div>
                              <div>
                                <strong>PayPal</strong>
                                <div className="text-muted small">Pay securely with your PayPal account</div>
                              </div>
                            </div>
                          }
                        />
                      </Card.Body>
                    </Card>
                  )}
                  
                  {availablePaymentMethods.bank_transfer && (
                    <Card 
                      className={`mb-3 payment-method-card ${selectedMethod === 'bank_transfer' ? 'border-primary' : ''}`}
                      onClick={() => setSelectedMethod('bank_transfer')}
                      style={selectedMethod === 'bank_transfer' ? {borderColor: '#CD9A5E'} : {}}
                    >
                      <Card.Body>
                        <Form.Check
                          type="radio"
                          id="payment-bank-transfer"
                          name="payment_method"
                          value="bank_transfer"
                          checked={selectedMethod === 'bank_transfer'}
                          onChange={handleMethodChange}
                          label={
                            <div className="d-flex align-items-center">
                              <div className="payment-icon me-3">
                                <i className="bi bi-bank fs-3" style={{color: '#CD9A5E'}}></i>
                              </div>
                              <div>
                                <strong>Bank Transfer</strong>
                                <div className="text-muted small">Pay via bank transfer</div>
                              </div>
                            </div>
                          }
                        />
                      </Card.Body>
                    </Card>
                  )}
                </div>
                
                {selectedMethod === 'credit_card' && (
                  <div className="credit-card-form mb-4">
                    <h5 className="mb-3">Credit Card Details</h5>
                    <Row>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Card Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="0000 0000 0000 0000"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Expiration Date</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="MM/YY"
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="123"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Cardholder Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Name as appears on card"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                )}
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  size="lg" 
                  className="w-100"
                  disabled={loading}
                  style={{ backgroundColor: '#CD9A5E', borderColor: '#CD9A5E' }}
                >
                  {loading ? 'Processing...' : `Pay $${paymentData.amount_to_pay}`}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Header className="bg-white">
              <h4>Order Summary</h4>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <h5>{paymentData.booking_summary.room_name}</h5>
              </div>
              
              <div className="mb-3 border-bottom pb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Check-in:</span>
                  <span>{new Date(paymentData.booking_summary.check_in).toLocaleDateString()}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Check-out:</span>
                  <span>{new Date(paymentData.booking_summary.check_out).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Room Price:</span>
                  <span>${paymentData.booking_summary.total_price}</span>
                </div>
                
                {paymentData.is_deposit && (
                  <>
                    <div className="d-flex justify-content-between">
                      <span>Deposit (30%):</span>
                      <span>${paymentData.amount_to_pay}</span>
                    </div>
                  </>
                )}
              </div>
              
              <div className="border-top pt-3 mt-3">
                <div className="d-flex justify-content-between">
                  <strong>Amount Due Now:</strong>
                  <strong>${paymentData.amount_to_pay}</strong>
                </div>
                {paymentData.is_deposit && (
                  <div className="text-muted small mt-2">
                    * Remaining balance of ${(paymentData.booking_summary.total_price - paymentData.amount_to_pay).toFixed(2)} to be paid upon arrival.
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentMethod;
