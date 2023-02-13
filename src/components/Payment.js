import { Button, Col, Row } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import PayWithPayPal from "./PayWithPayPal";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";




const Payment = () => {

    const [newData, setNewData] = useState([]);
    const [movie, setMovie] = useState("");
    const [theater, setTheater] = useState("");
    const [show, setShow] = useState("");

    const params = useParams();
    let showid = params.id
    let userid = localStorage.getItem('userid')
    console.log(userid)



    useEffect(() => {
        FetchData()
    }, [])


    // user adding tickets with userdetails and showdetails
    const FetchData = () => {

        const data = {
            "userid": userid,
            "showid": showid,
        }
        let request = localStorage.getItem('token')
        const url = "http://127.0.0.1:8000/bookings/ticket/user";
        const config = { 'content-type': 'application/json',
                          'headers': {Authorization:'Bearer '+ request}
                       };

        axios.post(url, data, config).then((response) => {
            console.log(response.data, "data");
            setNewData(response.data)
        
            response.data.map(obj => (
                console.log(obj.show, obj.seat),
                setMovie(obj.show.movie),
                setTheater(obj.show.theater),
                setShow(obj.show)
            ))
        });
    }

    let price = 150
    let ticketCount = newData.length
    let subtotal = price * ticketCount
    let tax = subtotal / 12
    let amount = subtotal + tax

    

    return(
        <Row style={{"width":"80%", "margin":"2% 10%"}}>
            <Col sm={4} style={{"border":"1px dotted green","padding":"20px"}} >
                <h5 className="text-muted">Order Summary</h5>
                <h6 style={{"color":"green"}} className="medium">{movie.movie_title} <span>({movie.movie_certificate})</span></h6>
                <p className="small my-0 text-muted" >{theater.theater_name}</p>
                <div style={{"display":"flex"}}>
                    {newData.map(obj => (
                        <h6 style={{"color":"green"}} className="small">{obj.seat.theater_seat.seatalp}{obj.seat.theater_seat.seatnum} ,</h6>
                    ))}
                </div>
                <p className="my-0 text-muted" >{show.date}</p>
                <p className="text-muted" >{show.time}</p>
                <hr></hr>
                <Table >
                    <thead>
                    <tr>
                        <td>subtotal</td>
                        <td>$ {subtotal}</td>
                    </tr>
                    <tr>
                        <td>tax (12 %)</td>
                        <td>$ {tax}</td>
                    </tr>
                    <tr style={{"color":"red"}}>
                        <th>Amount Payable</th>
                        <th>$ {amount}</th>
                    </tr>
                    </thead>
                </Table>

                <div style={{"marginTop":"30px"}}>
                    <PayWithPayPal amountx = {amount} showid = {showid} />
                </div>
                    
                
             
            </Col>
            <Col sm={8}>
                <div>
                    <img width="100%" src={`http://127.0.0.1:8000${movie.cover_pic}`} />
                </div>
                <div className="mx-1 my-3">
                    <img width="65%" src="https://img.paisawapas.com/ovz3vew9pw/2022/04/18135838/bookmyshow-coupons.png" />
                </div>
            </Col>
          
        </Row>
    )
}
export default Payment;