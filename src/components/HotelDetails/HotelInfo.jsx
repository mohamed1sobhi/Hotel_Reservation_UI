import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Star } from 'lucide-react';
import { userIsAdmin } from "../../utils/permissions";

const HotelInfo = ({ hotel }) => {
    return (
        <>
            <h1 className=" text-center  m-4">{hotel.name} Details </h1>
            <div style={{ width: '200px', height: '4px', backgroundColor: 'var(--bs-primary)',  margin :"20px auto"  }}></div>
            
            {hotel.image && hotel.image.length > 0 ? (
            <Carousel className="mb-4">
                {hotel.image.map((img, idx) => (
                <Carousel.Item key={idx}>
                    <img
                    className="d-block w-100"
                    src={img.image.startsWith("/media/") ? `${import.meta.env.VITE_API_URL}${img.image}` : img.image}
                    alt={`Slide ${idx}`}
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />
                </Carousel.Item>
                ))}
            </Carousel>
            ) : (
            <div className="text-muted mb-4">No images available</div>
            )}

            <div className="mb-4">
            <h5 className="text-secondary">Description</h5>
            <p>{hotel.description || "No description provided."}</p>
            </div>
            
            {userIsAdmin() && (
            <div className="mb-4">
            <h5 className="text-secondary">Email</h5>
            <p>{hotel.email || "No email provided"}</p>
            </div>
            )} 

            <div className="d-flex align-items-center gap-3 mb-4">
            <span className="fw-bold text-primary">Price from: {hotel.price_range || 'N/A'} EGY /night</span>
            <span className="text-muted">Location: {hotel.address || 'Unknown'}</span>
            <span className="text-primary">
                {Array(hotel.stars || 0).fill().map((_, i) => (
                <Star key={i} size={20} fill="gold" color="gold" />
                ))}
            </span>
            </div>
        </>
    );
};
export default HotelInfo;
