import { useEffect, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./movies.css"
import { useNavigate } from 'react-router-dom';


const MoviesList = () => {

    const navigate = useNavigate()

    const [movies, setMovies] = useState([])
    const [selectedLang, setSelectedLang] = useState("");
    const [selectedJourner, setSelectedJourner] = useState("");
    const [selectedFormat, setSelectedFormat] = useState("");
    const [selectedCertificate, setSelectedCertifi] = useState("");


    const journers = ["Action", "Drama", "Comedy", "Romance", "Horror", "Fiction", "Thriller"];


    useEffect(() => {
        FetchMovies()
    }, [selectedLang, selectedCertificate, selectedFormat, selectedJourner])



    const FetchMovies = async() => {

        let data = {
            'language' : selectedLang,
            'movie_format' : selectedFormat,
            'journer' : selectedJourner,
            'movie_certificate' : selectedCertificate
        }
        console.log(data)

        const url = "http://127.0.0.1:8000/movies/filter/";
        const config = { 'content-type': 'application/json' };
        const response = await axios.post(url, data, config);
        console.log(response.data, "ttt")
        setMovies(response.data)
    };

 

    return(
        <div>
            <Row className='m-3'>
                <Col sm="4">
                    <h4 className='text-muted m-3'>Filters</h4>
                    <select className='selectbox' onChange={(e) => setSelectedLang(e.target.value)}>
                        <option value="">language</option>
                        <option value="English">English</option>
                        <option value="Malayalam">Malayalam</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Tamil">Tamil</option>
                    </select> 
                    <select className='selectbox' onChange={(e) => setSelectedJourner(e.target.value)}>
                        <option value="">journer</option>
                        {journers.map((obj) => (
                            <option value={obj}>{obj}</option>
                        ))}
                        
                        
                    </select><br></br>
                    <select className='selectbox' onChange={(e) => setSelectedFormat(e.target.value)}>
                        <option value="">format</option>
                        <option value="2D">2D</option>
                        <option value="3D">3D</option>
                    </select>
                    <select className='selectbox' onChange={(e) => setSelectedCertifi(e.target.value)}>
                        <option value="">certificate</option>
                        <option value="U">U</option>
                        <option value="U/A">U/A</option>
                        <option value="A">A</option>
                    </select>
                </Col>
                <Col sm="8">
                    <h4 className='text-muted m-3'>Movies in Trivandrum</h4>
                    <div>
                    <Row>
                        {movies.map((obj, key) => 
                            <Col className='m-3'>
                                <div onClick={()=>navigate(`/movie/${obj.id}`)} style={{ width: '13rem' }}>
                                    <div className='box'>
                                        <img variant="top" width="100%" src={`http://127.0.0.1:8000${obj.main_image}`} />
                                    </div>
                                    <div>
                                        <div style={{"height": "calc(50.755px)"}}>
                                            <h5>{obj.movie_title}</h5>
                                            <div style={{"display":"flex"}}>
                                            {obj.journer.map((newobj, key) => 
                                                <p>{newobj} ,</p>                                    
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )}
                    </Row>
                    </div>
                </Col>
            </Row>
           
        </div>
    )
};
export default MoviesList;