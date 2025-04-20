import AllHotels from "../components/allHotels";
import AllReviews from "../components/allReviews";
import AllRooms from "../components/allRooms";
import Header from "../components/Common/Header";
function Home() {
    return (
        <div className="">
            <Header />
            <h1 className="text-center">Welcome to Hotel Reviews</h1>
            <AllHotels />
            <AllRooms />
            {/* <AllReviews /> */}
        </div>
    );
}
export default Home;