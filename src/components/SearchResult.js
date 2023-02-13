import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



const SearchResult = () => {


    const [show, setShow] = useState(false);
    const [key, setKey] = useState([]);
    const [searchResult, setSearchResult] = useState([]);

    const navigate = useNavigate()



    function handleShow() {
      setShow(true);
      axios.get(`http://127.0.0.1:8000/movies/search/${key}/`)
            .then((res) => {
                console.log(res.data, "ttt")
                setSearchResult(res.data)
            })
    }

    return(
        <div>
            <Form className="search d-flex">
              <Form.Control value={key} onChange={(e) => setKey(e.target.value)}
                type="search"
                placeholder="Search for Movies"
                className="me-2"
              />
              <Button onClick={() => handleShow()} variant="outline-light">Search</Button>
            </Form>
           
            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Search results</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                    {searchResult.map((obj, key) => 
                        <Col className='m-3'>
                            <div onClick={()=>navigate(`/movie/${obj.id}`)} style={{ width: '10rem' }}>
                                <div className='box'>
                                    <img variant="top" width="100%" src={`http://127.0.0.1:8000${obj.main_image}`} />
                                </div>
                                <div>
                                    <div style={{"height": "calc(10.755px)"}}>
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
              </Modal.Body>
            </Modal>
        </div>
    )
};
export default SearchResult;