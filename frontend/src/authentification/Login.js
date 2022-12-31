import React, {useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    console.log(username);

    const [jwt, setJwt] = useLocalState("", "jwt");


    function sendLoginRequest() {

        console.log("Incerc sa ma loghez");

        const reqBody = {
            username: username,
            password: password
        };
        //fetch e o comanda asincrona care intoarce un promise
        //comunica cu serverul, cu URL-ul din parametrii, cere date, iar cand le primeste le returneaza,
        //timp in care se pot executa alte linii de cod

        fetch("/auth/login", {
            headers: {
                "Content-type": "application/json"   //primeste un raspuns de tip json, prin metoda post
            },
            method: "post",
            body: JSON.stringify(reqBody)
        }).then((response) => {
            if (response.status === 200)
                return Promise.all([response.json(), response.headers])
            else
                return Promise.reject("Invalid login credentials.");
        })
            .then(([body, headers]) => {
                setJwt(headers.get("authorization"));
                window.location.href = "dashboard";
                console.log(jwt);
                //console.log(body);
            }).catch((message) => {
            alert(message);
        });
    }


    return (
        <div className="row">
            <NavbarComponent/>
            <div className="col-3"></div>
            <div className="container col-6 mt-5 ">
                <h3 className="mb-5 text-center">Hello there! We are glad you decided to join the best Auction App</h3>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email"
                               className="form-control"
                               id="username"
                               value={username}
                               onChange={(event) => setUsername(event.target.value)}
                               aria-describedby="emailHelp"></input>

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password"
                               className="form-control"
                               id="password"
                               value={password}
                               onChange={(event) => setPassword(event.target.value)}
                        ></input>
                    </div>
                    <button type="button"
                            className="btn btn-primary"
                            onClick={() => sendLoginRequest()}>Submit
                    </button>
                </form>
            </div>
            <div className="col-3"></div>
            <Footer/>
        </div>
    );
};


export default Login;
