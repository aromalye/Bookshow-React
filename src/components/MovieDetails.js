import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';




const MovieDetails = () => {

    const navigate = useNavigate()
    const params = useParams();
    let id = params.id

    const [movie, setMovie] = useState([]);



    useEffect(() => {
        FetchMovie()
    }, [])



    const FetchMovie = async() => {
        await axios.get(`http://127.0.0.1:8000/movies/${id}/`)
            .then((res) => {
                console.log(res.data, "ttt")
                setMovie(res.data)
            })
    };




    return(
        <div>
            <div className='m-3' style={{backgroundImage: `linear-gradient(90deg, rgb(26, 26, 26) 24.97%, rgb(26, 26, 26) 38.3%, rgba(26, 26, 26, 0.04) 97.47%, rgb(26, 26, 26) 100%),
             url(http://127.0.0.1:8000${movie.cover_pic})`,
              "backgroundRepeat":"no-repeat", "backgroundPosition":"right"}}>
                <Row>
                    <Col className='m-5' sm={2}>
                        <Card style={{ width: '13rem' }}>
                            <Card.Img variant="top" src={`http://127.0.0.1:8000${movie.main_image}`} />
                        </Card>
                    </Col>
                    <Col className='my-5' style={{"color":"white"}} sm={4}>
                        <h2>{movie.movie_title}</h2>
                        <h3>9.5/10</h3>
                        <div>
                            <h5>Add your rating & review</h5>
                            <p>Your rating matter</p>
                            <Button size='sm' variant="light">Rate Now</Button>
                        </div>
                        <p>{movie.movie_format} | {movie.language}</p>
                        <div style={{"display":"flex"}}>
                        {movie.journer? movie.journer.map(name => (
                                <p>{name} |</p>
                        )):null}
                        </div>
                        <p>2h 25m | {movie.movie_certificate}</p>
                        <Button onClick={()=>navigate(`/shows/movie/${movie.id}`)} variant="danger">Book Tickets</Button>
                    </Col>
                </Row>
            </div>
            <div className='container'>
                <h3>About the movie</h3>
                <p>{movie.description}</p>
                <hr></hr>
            </div>
            <div className='container'>
                <h3>Applicable offers</h3>
                <Alert className='my-3' variant="warning" style={{"width":"50%", "border":"2px dotted green"}}>
                    <h5>WATCH MOVIES ONLINE FOR FREE!</h5>
                    <p>Limited period offer</p>
                </Alert>
                <hr></hr>
            </div>
           
        </div>
    )
}
export default MovieDetails;