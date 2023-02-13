import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AuthContext from '../context/AuthContext';
import Signin from './Signin';
import { Link } from 'react-router-dom';
import UserSideBar from './UserSideBar';
import img from "../assets/images/bookshow.jfif"
import SearchResult from './SearchResult';


const Navbarx = () => {

    const {UserLogout} = useContext(AuthContext)
    let userid = localStorage.getItem('userid')
    document.body.style.overflow = 'unset';

    

    return(
        <Navbar bg="dark" variant='dark' expand="lg">
        <Container className='mx-5 my-3' fluid>
          <Link to="/">
          <img width="80%" src={img} />
          </Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
            <Link to="/movie/list">
            <Nav className="btn btn-sm btn-outline-info px-3" >Movies</Nav>
            </Link>

            </Nav>
            <Nav style={{"marginRight":"100px"}}>
              < SearchResult />
            </Nav>
            <Nav className='mx-3'>
              {!userid?
              <div>
                  <Link to="/signup">
                 <Button className='mx-3' size='sm' variant="danger">
                  Register
                </Button> </Link> <Signin/>
              </div>
              : <UserSideBar/>
              }
              {/* <btn style={{"color":"white", "border":"1px solid grey","padding":"6px"}}>Hi aromal !!</btn> */}
              
            </Nav>
 
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}
export default Navbarx;