import React from 'react';
import { Form, Button } from 'react-bootstrap';
import './Leftside.css'
const Leftside = () => {
    return (
        <div>
            <br />
            <br />
            <br />
            <Form style={{ width: "50%", marginLeft: "40%", marginTop: "10%" }}>
                <Form.Group >
                    <h1 style={{ color: "darkblue" }}> <b>Welcome Back</b> </h1>
                    <h6 style={{ color: "darkblue" }}> Sub Title text goes here </h6>
                    <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>
                <Form.Group >
                    <Form.Label></Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" />

                    <div className="remember">
                        <input type="checkbox" name="" id="" />
                        <small>Remember Me</small>

                        <div className="remember" style={{ marginLeft: "123px" }}>

                            <small>Forgot Password</small>
                        </div>
                    </div>

                </Form.Group>
                <Button type="submit" style={{ width: "70%", marginTop: "3%", backgroundColor: "darkblue" }}>Login</Button>
            </Form>
        </div>
    )
}

export default Leftside;