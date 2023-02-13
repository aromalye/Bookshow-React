import { useState, useEffect, useContext } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import axios from "axios";



const BookedTicketDetails = () => {

    const [show, setShow] = useState([]);
    const [theater, setTheater] = useState([]);
    const [movie, setMovie] = useState([]);
    const [newdata, setNewData] = useState([]);
    let userid = localStorage.getItem('userid')

    useEffect(() => {
        FetchData()
    }, [])


    const FetchData = async() => {
        await axios.get(`http://127.0.0.1:8000/bookings/bookedtickets/${userid}/`).then((response) => {
            console.log(response.data, "data2");
            console.log(userid)
            setNewData(response.data)
        
            response.data.map(obj => (
                console.log(obj.show, obj.seat),
                setMovie(obj.show.movie),
                setTheater(obj.show.theater),
                setShow(obj.show)
            ))
        });
    }


    return(
        <div className="m-5">
             {show.id ? 
            <div style={{"width":"50rem"}} className="m-5">
            <h4 className='mx-5 px-1'>Booked Tickets</h4>
                <div className="card m-5">
                    <Row>
                        <Col className='m-1 p-3' sm="4">
                            <img width="70%" src={`http://127.0.0.1:8000${movie.main_image}`} />
                        </Col>
                        <Col className='my-3' sm="6">
                            <h4>{movie.movie_title} ({movie.movie_certificate})</h4>
                            <div style={{"color":"#bb3e03","fontFamily":"monospace"}}>
                                <p className='m-0'>{theater.theater_name}, {theater.landmark_1}</p>
                                <p>{theater.city}</p>
                                <p><strong>{show.time} | {show.date}</strong></p>
                            </div>
                            <h5>{newdata.length} Tickets</h5>
                            <div style={{"display":"flex"}}>
                                <i style={{"fontSize":"150%", "marginRight":"15px"}} className="fal fa-ticket"></i>
                                {newdata.map(obj => (
                                    <h6> {obj.seat.seat.theater_seat.seatalp}{obj.seat.seat.theater_seat.seatnum} , </h6>
                                ))}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            : <Alert variant="danger">
                you dont have any actvie booking!
                </Alert>}

        </div>
    )
};
export default BookedTicketDetails;