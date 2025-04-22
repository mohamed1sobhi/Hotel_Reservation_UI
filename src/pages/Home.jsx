import AllHotels from "../components/allHotels";
import AllRooms from "../components/allRooms";
import Header from "../components/Header";
import Search from "../components/SearchBar";
import CreatePayment from "./payment/PaymentForm";
function Home() {
    return (
        <div className="">
            <Header />
            <Search />
            <AllHotels />
            <AllRooms />
            {/* <div className="container">
                <h1 className="my-4">Create Payment</h1>
                <CreatePayment />
            </div> */}
        </div>
    );
}
export default Home;