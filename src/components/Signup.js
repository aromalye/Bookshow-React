import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




function Signup() {

    const navigate = useNavigate();


    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        password: "",
        confirm_password: ""
    });

    const HandleForm = (e) => {
        e.preventDefault();

        const url = "http://127.0.0.1:8000/user/register/";
        const config = { 'content-type': 'application/json' };

        axios.post(url, data, config).then((response) => {
            console.log(response.data, "data");
            console.log(response.data.message, "msg");
            if (response.data.status === 200){
                console.log(response.data.status, "sts");
                navigate("/")
            }else{
                console.log(response.data.message, "msg")
                alert(response.data.message)
            }
            });
            
    }

    const HandleInput = (e) => {
        const newdata = {...data}
        newdata[e.target.id] = e.target.value
        setData(newdata)
    }


    return(
        <div style={{
            "width":"60%","marginLeft":"20%","marginTop":"5%", "marginBottom":"5%", "border":"1px solid green","padding":"2%",
            "background":"#2b2d42","color":"#ffffff", "boxShadow":"2px 5px 5px 2px grey"
            }}>
            <Form onSubmit={(e) => HandleForm(e)} >
                <h3 className='my-3' >Signup</h3>
                <Row >
                    <Col>
                    <Form.Group value={data.email} onChange={(e) => HandleInput(e) } className="mb-3 " controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="@mail.com" />
                    </Form.Group>

                    <Form.Group value={data.first_name} onChange={(e) => HandleInput(e) } className="mb-3" controlId="first_name">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" />
                    </Form.Group>

                    <Form.Group value={data.password} onChange={(e) => HandleInput(e) } className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    </Col>

                    <Col>
                    <Form.Group value={data.mobile} onChange={(e) => HandleInput(e) } className="mb-3" controlId="mobile">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="number" placeholder="Phone number" />
                    </Form.Group>

                    <Form.Group value={data.last_name} onChange={(e) => HandleInput(e) } className="mb-3" controlId="last_name">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" />
                    </Form.Group>

                    <Form.Group value={data.confirm_password} onChange={(e) => HandleInput(e) } className="mb-3" controlId="confirm_password">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm password" />
                    </Form.Group>

                    <Button type='submit' className='my-5' size='sm' variant="outline-light">Signup</Button>

                    </Col>

                </Row>

            </Form>
        </div>
    )
}
export default Signup;