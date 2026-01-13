import React from 'react';

const HotelHero = ({ hotel }) => {
  // Fix for potential bug where firstImage could be hotel.name if no images
  const getHeroImage = () => {
    if (hotel.image && hotel.image.length > 0) {
      const img = hotel.image[0].image;
      if (img.startsWith("/media/")) {
        return `${import.meta.env.VITE_API_URL}${img}`;
      }
      return img;
    }
    return 'https://via.placeholder.com/1920x400';
  };

  const heroImage = getHeroImage();

  return (
      <div
        className="cover-section mb-4"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
        }}
      >
        <h1 className="fw-bold">{hotel.name}</h1>
      </div>
  );
};

export default HotelHero;
