import { useState, useEffect, useContext } from 'react';
import { Col, Row } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import { useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';




const BookingConfirmation = () => {

    const [show, setShow] = useState([]);
    const [theater, setTheater] = useState([]);
    const [movie, setMovie] = useState([]);
    const [newdata, setNewData] = useState([]);
    let userid = localStorage.getItem('userid')


    const params = useParams();
    let id = params.id;
    let showid = params.showid;


    let price = 150
    let ticketCount = newdata.length
    let subtotal = price * ticketCount
    let tax = subtotal / 12
    let amount = subtotal + tax



    useEffect(() => {
        BookShow2()
    }, [])


    // booking show with paymentdetails, userdetails, showdetails
    const BookShow2 = async() => {

        const data = {
            "userid": userid,
            "showid": showid,
            "paymentid": id
        }
    
        const url = "http://127.0.0.1:8000/bookings/bookticket/";
        const config = { 'content-type': 'application/json' };

        await axios.post(url, data, config).then((response) => {
            console.log(response.data, "data2");
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
        <div className="container">
            <Alert style={{"marginTop":"5%"}} variant="success">
                <h3>Thank you for your purchase !</h3>
                <p className='text-muted large my-3'>Dear, Your Prebook is completed,  Please find your Prebook details below.</p>
            </Alert>
            <div className='card'>
                <Row>
                    <Col sm="3">
                        <div className='m-3 p-1'>
                            <img width='80%' src={`http://127.0.0.1:8000${movie.main_image}`}/>
                        </div>
                    </Col>
                    <Col className='m-3 p-3' style={{"border":"1px dotted #006d77", "color":"brown"}} sm="8">
                        <h4>{movie.movie_title} ({movie.movie_certificate})</h4>
                        <div style={{"color":"#bb3e03","fontFamily":"monospace"}}>
                            <p className='m-0'>{theater.theater_name}, {theater.landmark_1}</p>
                            <p>{theater.city}</p>
                            <p><strong>{show.time} | {show.date}</strong></p>
                        </div>
                        <h6>Quantity : {newdata.length}</h6>
                        <div style={{"display":"flex"}}>
                            <i style={{"fontSize":"150%", "marginRight":"15px"}} className="fal fa-ticket"></i>
                            {newdata.map(obj => (
                                <h6> {obj.seat.seat.theater_seat.seatalp}{obj.seat.seat.theater_seat.seatnum} , </h6>
                            ))}
                        </div>
                        <hr></hr>
                        <Table>
                        <tbody>
                            <tr>
                            <td>Ticket price <span className='small'>({newdata.length} ticket)</span></td>
                            <td>{subtotal}</td>
                            </tr>
                            <tr>
                            <td>Tax <span className='small'>(12%)</span></td>
                            <td>{tax}</td>
                            </tr>
                        </tbody>
                        </Table>
                        <Table striped bordered hover>
                        <thead>
                            <tr>
                            <th>Amount Paid</th>
                            <th style={{"paddingLeft":"4%"}}>{amount}</th>
                            </tr>
                        </thead>
                        </Table>
                    </Col>
                </Row>

            </div>

        </div>
    )
}
export default BookingConfirmation;