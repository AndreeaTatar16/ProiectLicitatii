import React, {useEffect, useState} from 'react';
import Footer from "../components/Footer";
import {useLocalState} from "../util/useLocalStorage";
import NavbarComponent from "../components/NavbarComponent";
import {Card} from "react-bootstrap";
import {Link} from "react-router-dom";

const Dashboard = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [auctions, setAuctions] = useState(null);

    useEffect(() => {
        fetch("/auctions", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            },
            method: "GET"
        }).then((response) => {
            if (response.status === 200)
                return response.json();
        }).then((auctionsData) => {
            setAuctions(auctionsData);
        });
    }, []);

    return (
        <div className="App">
            <NavbarComponent/>

            {/*<button onClick={() => createAuction()} type="button"*/}
            {/*        className="mt-5 btn btn-primary text-decoration-none bg-navbar">Add an auction*/}
            {/*</button>*/}

            <button type="button"
                    className="mt-5 btn btn-primary text-decoration-none bg-navbar border-0"><Link
                className="text-decoration-none text-white" to={"/auctions/addAuction"}>
                Add an auction
            </Link></button>


            <div className="container mt-5">
                {auctions ? (
                    auctions.map((auction) => (
                        <div><Link className="text-decoration-none text-black" to={`/auctions/${auction.id}`}>
                            <Card className="mt-3 mb-3 bg-card-auctions text-white border-0">
                                <Card.Img src="auctionHands.jpg" id="imgDash" alt="Card image"/>
                                Auction ID: {auction.id}
                                <Card.Title className="ms-4 text-start">{auction.auctionTitle}</Card.Title>
                                <Card.Text>
                                    {auction.auctionDescription}
                                </Card.Text>
                                <Card.Text>Added on {auction.created_at}</Card.Text>
                            </Card>
                        </Link></div>
                    ))
                ) : (
                    <></>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default Dashboard;
