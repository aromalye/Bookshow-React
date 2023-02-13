import { useState, useContext } from "react";
import AuthContext from '../context/AuthContext';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';




const UserSideBar = () => {

    let first_name = localStorage.getItem('first_name')

    const [dis, setDis] = useState("none")

    const {UserLogout} = useContext(AuthContext)


    const HandleClick = () => {
        if(dis === "none"){
            setDis("block")
            document.body.style.overflow = 'hidden';
        }
        else{
            setDis("none")
            document.body.style.overflow = 'unset';
            // window.location.reload(false);
        }
        
    }

    const HandleLogOut = () => {
        UserLogout()
        HandleClick()
    }


    const sidebar = {
            position: "absolute",
            left: "72%",
            top: 0,
            // right: -"365px",
            background: "#14213d",
            textAlign: "left",
            zIndex: 11111,
            width: "367px",
            display: dis,
            padding: "0!important",
            height: "100vh",
            boxShadow: "0 0 2px 2px rgb(0 0 0 / 30%)",
    }
    return(
        <div>
            <button className="btn btn-sm btn-outline-info" onClick={HandleClick} >{first_name} <i class="fas fa-user-cog"></i></button>

            <div style={sidebar}>
                <div className="m-3" style={{"display":"flex"}}>
                    <h6 style={{"color":"white"}}>Dashbord</h6>
                    <button style={{"marginLeft":"180px"}} className="btn btn-outline-light" onClick={HandleClick} ><i class="fas fa-times"></i>  </button>
                </div>
                <hr style={{"color":"white"}}></hr>
                <ListGroup className="m-3">
                    <Link to="/bookedtickets">
                    <ListGroup.Item className="m-1 btn btn-light">Booked Tickets</ListGroup.Item>
                    </Link>
                    <ListGroup.Item className="m-1 btn btn-light">Test</ListGroup.Item>
                    <ListGroup.Item className="m-1 btn btn-light">Test</ListGroup.Item>
                    <ListGroup.Item className="m-1 btn btn-light">Test</ListGroup.Item>
                    <hr style={{"color":"white"}}></hr>
                    <ListGroup.Item className="btn btn-sm btn-danger m-1" onClick={() => HandleLogOut()}>Sign Out</ListGroup.Item>
                </ListGroup>
                
            </div>
        </div>
        
    )
}
export default UserSideBar;