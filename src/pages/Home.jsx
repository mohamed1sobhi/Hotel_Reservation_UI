import AllHotels from "../components/allHotels";
import AllReviews from "../components/allReviews";
import AllRooms from "../components/allRooms";
import Header from "../components/Common/Header";
import Search from "../components/SearchBar";
function Home() {
    return (
        <div className="">
            <Header />
            <Search />
            <AllHotels />
            <AllRooms />
            {/* <AllReviews /> */}
        </div>
    );
}
export default Home;