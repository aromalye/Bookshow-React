import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';



const MovieShows = () => {

    const navigate = useNavigate();
    const params = useParams();
    let id = params.id

    const today = new Date();
    const date = today.toISOString().substr(0, 10);

  
    const [showData, setShowDatas] = useState([]);
    const [datex, setDatex] = useState(new Date());
    const [selected, setSelected] = useState(date);


    const [theaters, setTheaters] = useState([]);
    const [movie, setMovie] = useState([]);
    const [showID, setShowID] = useState("");


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isConditionAccepted, setIsConditionAccepted] = useState(false);



    const handleCondition = () => {
        setIsConditionAccepted(true)
        console.log(isConditionAccepted, "hh")
        handleModels(showID) 
    };


    const datesForAWeek = [];
    for (let i = 0; i < 7; i++) {
        const nextDate = new Date(datex.getTime() + i * 24 * 60 * 60 * 1000);
        
        const formattedDate = nextDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
        });

        datesForAWeek.push(formattedDate.replace(/(\d+)\/(\d+)\/(\d+)/, '$3-$1-$2'));
    }


    useEffect(() => {
        FetchShows()
        FetchTheaters()
        FetchMovie()
    }, [selected])


    const handleModels = (showId) => {
        handleShow()
        console.log(showId)
        setShowID(showId)
        if (isConditionAccepted) {
            navigate(`/seat/${showId}`)
        }
        
    }


    const FetchShows = async() => {
        let data = {
            "date" : selected
        }
            // "2023-01-22
        try {
            console.log(data)
            const url = `http://127.0.0.1:8000/shows/movies/${id}/`;
            const config = { 'content-type': 'application/json' };
            const response = await axios.post(url, data, config);
            console.log("respose data", response.data);
            const setoftime = []
            if (response.data){
                setShowDatas(response.data)
                
                
            }else{
                console.log("errr")
            }
           
        } catch (error) {
            console.error(error);
        }

    }


    const FetchTheaters = async() => {
        await axios.get('http://127.0.0.1:8000/theaters/')
            .then((res) => {
                console.log(res.data, "ttt")
                setTheaters(res.data)
            })
    };


    const FetchMovie = async() => {
        await axios.get(`http://127.0.0.1:8000/movies/${id}/`)
            .then((res) => {
                console.log(res.data, "ttt")
                setMovie(res.data)
            })
    };


    return(
        <div>
            <div className="showhead">
                <h1>{movie.movie_title} - {movie.language}</h1>
                <div style={{"display":"flex"}}>
                    <div className="m-3 p-1" style={{"border":"1px dotted white"}}>
                        {movie.movie_certificate}
                    </div>
                    {movie.journer? movie.journer.map(name => (
                            <div className="journerbox">
                                <p className='small'>{name}</p>
                            </div>
                    )):null}
                    
                </div>
            </div>

            <div>
                {/* <p className='selectedDate'>Date : {selected}</p> */}
                <ul>
                    {datesForAWeek.map((item, index) => (
                    <button className={`my-3 mx-1 btn btn-${item===selected? "danger": "outline-danger"}`} key={index} onClick={() => setSelected(item)}>
                        {item}
                    </button>
                    ))}
                </ul>
            </div>


            <div className='m-5'>
                {theaters.map((obj, key) => 
                    <Row className='my-3'>
                        <Col xs={4} style={{"backgroundColor":"#e0e1dd"}}>
                            <p className='my-3'><strong>{obj.theater_name}</strong></p>
                        </Col>
                        
                        <Col xs={8} style={{"display":"flex","backgroundColor":"#e5e5e5"}}>
                        {showData.map((newobj, key) => 
                        obj.id === newobj.theater.id?
                            <p onClick={() => handleModels(newobj.id)} className={`btn btn-sm m-3 ${newobj.is_tick_avail ? "btn-outline-success":" disabled btn-outline-secondary"}`}>{newobj.time}</p>
                        :null
                        )}
                       
                        </Col>
                        
                    </Row>
                )}
            </div>
            
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                    <Modal.Title>Terms & Conditions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{"fontSize":"small"}}>
                    <span style={{"color":"brown","fontSize":"large"}}>Please read these important terms and conditions for internet booking. </span><br/>
                    1.As per State Govt, in cinemas, all movie goers should be atleast 1st dose vaccinated.<br/>
                    2.Food & Beverages are not allowed inside the auditorium as per the govt guidelines.<br/>
                    3. Ticket price inclusive of 3D facilitation charges.<br/>
                    4. Tickets once purchased cannot be cancelled, exchanged, or refunded.<br/>
                    5. To counter unforeseen delays, please collect your tickets half an hour before the show time.<br/>
                    6. Outside food and beverages are not allowed inside the cinema premises.<br/>
                    7. Smoking is strictly prohibited inside the theatre premises.<br/>
                    8. If a customer consumes alcohol, they will not be allowed inside the premises and the tickets will not be refunded.<br/>
                    9. Please purchase tickets for children older than 3 years.<br/>
                    10. Car parking for online customers is subject to availability.


                    <Form.Check onClick={handleCondition} className='my-3' style={{"color":"red"}} type="checkbox" label="please tick if you accept our conditions" />

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="outline-danger" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleCondition} variant="danger">Accept</Button>
                    </Modal.Footer> 
                </Modal>
        </div>
    )
}
export default MovieShows;