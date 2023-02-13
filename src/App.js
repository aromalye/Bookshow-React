import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import BookingConfirmation from "./components/BookingConfirmation";
import Payment from "./components/Payment";
import PayWithPayPal from "./components/PayWithPayPal";
import SelectSeat from "./components/SelectSeat";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { AuthProvider } from "./context/AuthContext";
import Homepage from "./pages/Homepage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MovieShowsPage from "./pages/MovieShowsPage";
import PaymentDetailsPage from "./pages/PaymentDetailsPage";
import BookingConfirmPage from "./pages/BookingConfirmPage";
import UserSideBar from "./components/UserSideBar";
import SignupPage from "./pages/SignupPage";
import MoviesList from "./components/MoviesList";
import MovieListPage from "./pages/MovieListPage";
import SearchResult from "./components/SearchResult";
import BookedTicketDetails from "./components/BookedTicketDetails";
import BookedTicketsPage from "./pages/BookedTicketPage";



function App() {
  return (
    <Router>
      <AuthProvider>
      <Routes>
        <Route exact path="/" element = {<Homepage />} />
        <Route exact path="/signup" element = {<SignupPage />} />
        
        <Route exact path="/movie/:id" element = {<MovieDetailsPage />} />
        <Route exact path="/shows/movie/:id" element = {<MovieShowsPage />} />
        <Route exact path="/seat/:id" element = {<SelectSeat />} />
        <Route exact path="/payment/:id" element = {<PaymentDetailsPage />} />
        <Route exact path="/booked/:showid/:id" element = {<BookingConfirmPage />} />
        <Route exact path="/movie/list" element = {<MovieListPage />} />
        <Route exact path="/bookedtickets" element = {<BookedTicketsPage />} />


        <Route exact path="/check" element = {<BookedTicketDetails />} />


      </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
