import Banner from "../components/Banner";
import Footerx from "../components/Footer";
import MoviesHome from "../components/Movieshome";
import Navbarx from "../components/Navbar";
import Navx from "../components/Navx";



const Homepage = () => {
    return(
        <div>
            < Navbarx />
            {/* < Navx /> */}
            < Banner />
            < MoviesHome />
            <Footerx />

        </div>
    )
}
export default Homepage;