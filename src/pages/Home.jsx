import AllHotels from "../components/allHotels";
import AllRooms from "../components/allRooms";
import Header from "../components/Header";
import Search from "../components/SearchBar";
import ReviewList from "./Review/ReviewList";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
function Home() {
  return (
    <div className="">
      <Header />
      <Search />
      <AllHotels />
      <AllRooms />
      <ReviewList />
    </div>
  );
}
export default Home;
