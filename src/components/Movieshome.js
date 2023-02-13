import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./movies.css"
import { useNavigate } from 'react-router-dom';



const MoviesHome = () => {

    const [movies, setMovies] = useState([]);
    const navigate = useNavigate()

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(2);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = movies.slice(startIndex, endIndex);





    useEffect(() => {
        FetchMovies()
    }, [])



    const FetchMovies = async() => {
        await axios.get('http://127.0.0.1:8000/movies/')
            .then((res) => {
                console.log(res.data, "ttt")
                setMovies(res.data)
            })
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(movies.length / pageSize); i++) {
          pageNumbers.push(i);
        }
    
        return pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => setCurrentPage(number)}
            className={`btn btn-sm btn-outline-${currentPage === number ? "danger" : ""}`}
          >
            {number}
          </button>
        ));
      };


    return(
        <div className='mx-5 my-3'>
            <h3 className='m-3'>Recomended Movies</h3>
            <div>
            <Row>
                {currentData.map((obj, key) => 
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
            <div className="container text-center my-3">{renderPageNumbers()}</div>
            </div>
        </div>
    )
}
export default MoviesHome;