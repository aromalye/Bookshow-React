import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';





const SelectSeat = () => {

    const rows = ["A", "B", "C", "D", "E"]

    const navigate = useNavigate();
    const params = useParams();
    let id = params.id;
    let userid = localStorage.getItem('userid');



    const [seats, setSeats] = useState([])
    const [showData, setShowDatas] = useState([])
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [price, setPrice] = useState([]);
    const [isSelected, setIsSelected] = useState(false);





    useEffect(() => {
        FetchShows()
        FetchData()
        SelSeatCount()
    }, [selectedSeats])

    useEffect(() => {
        const intervalId = setInterval(() => {
          fetch('http://127.0.0.1:8000/bookings/run_command/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
          })
          .then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error(error));
          refreshPage()
          console.log("hahha")
        }, 100000);
      
        return () => clearInterval(intervalId);
      }, []);

    function refreshPage() {
        window.location.reload(false);
    }


    const FetchShows = async () => {
        await axios.get(`http://127.0.0.1:8000/shows/${id}/`)
                .then(function (response) {
                    console.log(response.data, "showbyid")
                    setShowDatas(response.data)
                    console.log(showData, "ddd")
                });
                
    }

    const SelSeatCount = () => {
        axios.get(`http://127.0.0.1:8000/shows/sel_seat/`)
            .then(function (response) {
                console.log(response.data,"j")
                setPrice(response.data.sel_count * 150)
            });
                
    }

    
    const FetchData = async () => {
        await axios.get(`http://127.0.0.1:8000/shows/showseatsbyshow/${id}/`)
                .then(function (response) {
                    const numDes = [...response.data].sort((a, b) => a.id - b.id);
                    console.log(numDes , "f")
                    console.log(response.data)
                    setSeats(numDes)
                });
                
    }


    // to change seat status
    const ChangeStatus = (id) => {
        axios.get(`http://127.0.0.1:8000/shows/seatstatus/${id}/`)
        FetchData()
        SelSeatCount()
    }


    // add tickets to booking cart
    const BookingCart = (id, showid) => {
        const data = {
            "userid": userid,
            "showid": showid,
            "seatid": id
        }

        const url = "http://127.0.0.1:8000/bookings/";
        const config = { 'content-type': 'application/json' };

        axios.post(url, data, config).then((response) => {
            console.log(response.data, "data");
            });
    }



    const handleSeatClick = (id, showid) => {
        ChangeStatus(id)
        BookingCart(id, showid)
        setIsSelected(true)
        if (selectedSeats.includes(id)) {
          setSelectedSeats(selectedSeats.filter((seat) => seat !== id));
        } else {
          setSelectedSeats([...selectedSeats, id]);
        }
        
      };



    return(
        <div>
             <Navbar expand="lg" style={{"background":"black"}}>
                <Container>
                    <Navbar.Text style={{"color":"white", "fontSize":"large"}} href="#">{showData.movie? showData.movie.movie_title: null} <br></br>
                    <span style={{"color":"white", "fontSize":"small"}}>{showData.theater? showData.theater.theater_name: null} | {showData.date} | {showData.time}</span>
                    </Navbar.Text>
                </Container>
            </Navbar>

            <div className='seatcontainer'>
                <div style={{"display":"flex"}}>
                    <p className='text-muted small'>EXICUTIVE - $ 150</p>
                    <p className='text-muted small' style={{"marginLeft":"45%"}}>Total :<span style={{"color":"brown","fontSize":"large", "fontWeight":"500"}}> $ {price}</span></p>
                    {isSelected?
                        <Button onClick={ () => navigate(`/payment/${showData.id}`)} style={{"marginLeft":"7%"}} size='sm' variant='info' >Book Here!</Button>
                     : <Button style={{"marginLeft":"7%"}} size='sm' variant='info' >Book Here!</Button>
                     }
                </div>
                <div style={{"display":"flex"}}>
                    <div><Button className='btn btn-sm btn-success'></Button><span className='mx-1 p-0 small'>selected</span></div>
                    <div><Button className='btn btn-sm btn-warning'></Button><span className='mx-1 p-0 small'>available</span></div>
                    <div><Button className='btn btn-sm btn-danger disabled'></Button><span className='mx-1 p-0 small'>sold</span></div>
                </div>
                <hr></hr>
                <table>
                <tbody>
                    {rows.map(char => 
                    <tr>
                        <td>
                        <p className="text-muted m-3">{char}</p>
                        </td>
                        
                        <td>
                            {seats.map((obj, key) => 
                                obj.theater_seat.seatalp === char?
                                <button  className={`btn btn-sm m-3 ${ obj.status === "selected" ? "btn-success" : obj.status === "available" ? "btn-warning" :  "disabled btn-danger"} `}
                                onClick={() => handleSeatClick(obj.id, obj.show.id)}>
                                    {obj.theater_seat.seatnum}
                                </button>
                                :null
                            )}
                        </td>
                    </tr>
                   )}

                </tbody>
            </table>
             <div className="Cinema">
                <div className="screen" /> 
                <p className='small'>All eyes this way please!</p> 
            </div>
            </div>

        </div>
    )
};
export default SelectSeat;