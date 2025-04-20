import { useSelector , useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchReviews } from "../store/slices/reviews";

function AllReviews() {
    const dispatch = useDispatch();
    const { reviews, loading, error } = useSelector((state) => state.reviews);

    useEffect(() => {
        dispatch(fetchReviews());
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container text-center p-3 border shadow rounded-5 bg-light">
            {reviews.map((review) => (
                <div key={review.id}>
                    <h3>{review.rating}</h3>
                    <p>{review.comment}</p>
                </div>
            ))}
        </div>
    );
}
export default AllReviews;
