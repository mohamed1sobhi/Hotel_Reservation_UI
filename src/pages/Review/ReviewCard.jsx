import React from 'react';
import { Link } from 'react-router-dom';

const ReviewCard = ({ review, showHotelLink = false }) => {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? '#CD9A5E' : '#E8DFD5' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div 
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.05)',
        borderLeft: showHotelLink ? `4px solid #CD9A5E` : 'none'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          {showHotelLink && review.hotel_name && (
            <h3 style={{ color: '#1A1A1A', marginBottom: '0.5rem' }}>
              <Link 
                to={`/hotels/detail/${review.hotel_id}`}
                style={{ color: '#1A1A1A', textDecoration: 'none' }}
              >
                {review.hotel_name}
              </Link>
            </h3>
          )}
          
          <div style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
            {renderStars(review.rating)}
          </div>
          
          {review.title && (
            <h3 style={{ color: '#1A1A1A', marginBottom: '0.25rem' }}>
              {review.title}
            </h3>
          )}
        </div>
        
        <div style={{ textAlign: 'right' }}>
          <p style={{ color: '#8A8A8A', fontSize: '0.875rem' }}>
            {formatDate(review.created_at || new Date())}
          </p>
          <p style={{ color: '#1A1A1A', fontWeight: 'bold' }}>
            {review.user_name || 'Guest'}
          </p>
        </div>
      </div>
      
      <p style={{ 
        color: '#1A1A1A', 
        lineHeight: '1.6',
        marginBottom: review.stay_date ? '1rem' : '0.5rem'
      }}>
        {review.comment || 'No comment provided.'}
      </p>
      
      {review.stay_date && (
        <p style={{ color: '#8A8A8A', fontSize: '0.875rem', fontStyle: 'italic' }}>
          Stayed in {new Date(review.stay_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      )}
      
      {showHotelLink && review.hotel_id && (
        <Link 
          to={`/hotels/detail/${review.hotel_id}`}
          style={{
            color: '#B45F3A',
            textDecoration: 'none',
            fontWeight: '500',
            display: 'inline-block',
            marginTop: '0.5rem'
          }}
        >
          View Hotel →
        </Link>
      )}
    </div>
  );
};

export default ReviewCard;