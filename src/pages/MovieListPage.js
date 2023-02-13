import Banner from "../components/Banner"
import Footerx from "../components/Footer";
import MoviesList from "../components/MoviesList"
import Navbarx from "../components/Navbar"



const MovieListPage = () => {
    return(
        <div>
            <Navbarx />
            <Banner />
            <MoviesList />
            <Footerx />

        </div>
    )
};
export default MovieListPage;