import React, {useState} from 'react';
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";


const Register = () => {
    const [user, setUser] = useState(null);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [userLocation, setUserLocation] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function createUser() {
        const reqBody = {
            name: name,
            surname: surname,
            userLocation: userLocation,
            phoneNumber: phoneNumber,
            username: username,
            password: password
        };

        fetch("/register", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(reqBody)
        }).then(response => {
            if (response.status === 200)
                return response.json();
        }).then(userData => {
            console.log(userData);
            setUser(userData);
            window.location.href = "/login";
        }).catch((message) => {
            alert(message);
        });

    }

    return (
        <div>
            <NavbarComponent/>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 mt-5">
                    <h4 className="mb-4">Hi there! Are you ready to get some auctions crunched?</h4>
                    <Form>
                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Your name</Form.Label>
                            <Form.Control type="text" onChange={(event) => setName(event.target.value)}
                                          placeholder="ex: Jhon"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="surname">
                            <Form.Label>Your surname</Form.Label>
                            <Form.Control type="text" onChange={(event) => setSurname(event.target.value)}
                                          placeholder="ex: Doe"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="userLocation">
                            <Form.Label>Your city</Form.Label>
                            <Form.Control type="text"
                                          onChange={(event) => setUserLocation(event.target.value)}
                                          placeholder="ex: Ohio"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="phoneNumber">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control type="tel"
                                          onChange={(event) => setPhoneNumber(event.target.value)}
                                          placeholder="ex: 0712345678"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email"
                                          onChange={(event) => setUsername(event.target.value)}
                                          placeholder="ex: email@contact.com"/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password"
                                          onChange={(event) => setPassword(event.target.value)} placeholder="Password"/>
                            <Form.Text className="text-muted">
                                Your password must contain:
                                <ul>
                                    <li>Capital letter</li>
                                    <li>One number</li>
                                    <li>One special character (ex: @, #, $)</li>
                                </ul>
                            </Form.Text>

                            <Button onClick={() => createUser()} className="bg-navbar" variant="primary">
                                Submit
                            </Button>

                        </Form.Group>


                        <p className="mt-4"><Link className="text-decoration-none text-black" to={"/login"}>Do you have
                            an account? Log in here
                            <i className="fa-solid fa-share-from-square"></i> </Link></p>
                    </Form>
                </div>
                <div className="col-3"></div>
            </div>
            <Footer/>
        </div>
    );
};

export default Register;
