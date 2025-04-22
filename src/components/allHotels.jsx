import { useSelector , useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchHotels } from "../store/slices/hotels";

function AllHotels() {
    const dispatch = useDispatch();
    const { hotels, loading, error } = useSelector((state) => state.hotels);

    useEffect(() => {
        dispatch(fetchHotels());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container text-center p-3 border shadow rounded-5 bg-light">
            {hotels.map((hotel) => (
                <div key={hotel.id}>
                    <h3>{hotel.name}</h3>
                    <p>{hotel.description}</p>
                </div>
            ))}
        </div>
    );
}
export default AllHotels;