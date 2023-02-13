import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';



function Signin() {

    const {UserLogin} = useContext(AuthContext)
    const navigate = useNavigate()
  

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newData, setNewData] = useState('')

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const currenturl = window.location.href
    const currentpath = window.location.origin 
  

    const handleForm = (e) => {
        e.preventDefault()
        UserLogin(email, password)
        console.log(currenturl)
        // window.location.replace(currenturl)
        console.log("dd")
        handleClose()
      

        // const data = {
        //     "email": email,
        //     "password": password
        // }
        // const url = "http://127.0.0.1:8000/user/login/";
        // const config = { 'content-type': 'application/json' };
        // // const response = axios.post(url, data, config);
        // // console.log("respose data", response.status);
        // axios.post(url, data, config).then((response) => {
        //     console.log(response.data, "data");

        // })
    } 
  
    return (
        <>
      <Button size='sm' variant="danger" onClick={handleShow}>
        Sign in
      </Button>

      <Modal show={show} onHide={handleClose}>
      <Form onSubmit={(e) => handleForm(e)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            </Form.Group>
            <p className='my-3'>New here ? register</p>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" style={{"marginLeft":"180px", "marginTop":"20px"}} size='sm' variant="danger">
                     Submit
           </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    </>

    //   <div>

    //     <Form onSubmit={(e) => handleForm(e)}>
    //       <div>
    //         <Form.Group className="mb-3" controlId="email">
    //             <Form.Label>Email address</Form.Label>
    //             <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
    //         </Form.Group>

    //         <Form.Group className="mb-3" controlId="password">
    //             <Form.Label>Password</Form.Label>
    //             <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
    //         </Form.Group>
    //         <p className='my-3'>New here ? register</p>
            
    //       </div>
    //       <div>
    //       <Button type="submit" style={{"marginLeft":"180px", "marginTop":"20px"}} size='sm' variant="danger">
    //                 Submit
    //       </Button>
    //     </div>

            
    //     </Form>


    //   </div>
    );
  }
  
export default Signin;