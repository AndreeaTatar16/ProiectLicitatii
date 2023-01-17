import React, {useEffect, useState} from 'react';
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";
import {Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";

const Homepage = () => {
    const [auction, setAuction] = useState([]);

    useEffect(() => {
        fetch('/allAuctions', {
            headers: {
                "Content-Type": "application/json"
            },
            method: "GET"
        }).then(response => {
            if (response.status === 200)
                return response.json();
        }).then(auctionData => {
            setAuction(auctionData);
        });
    }, []);

    return (
        <div>
            <NavbarComponent/>
            <div className="container">
                {auction ? (
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-8">
                            {auction.map((auction) => (
                                <Card className="text-center mt-4 mb-4">

                                    <Card.Body>
                                        <Card.Img src="/auctionsBackground.jpg"
                                                  className={"card-img opacity-25"}
                                                  id="imgHome"
                                                  alt="Card image"/>
                                        <Card.ImgOverlay>
                                            <Card.Title><b><h1
                                                className="mt-5 mb-5">{auction.auctionTitle}</h1>
                                            </b></Card.Title>
                                            <Card.Text>
                                                <h3 className="mt-5"> {auction.auctionDescription}</h3>
                                            </Card.Text>
                                            <Button className="bg-navbar mt-3 "><Link to={"/dashboard"}
                                                                                      className={"text-decoration-none text-white border-0"}>Take
                                                a look</Link></Button>
                                        </Card.ImgOverlay>
                                    </Card.Body>
                                    <Card.Footer className="text-muted">Added on: {auction.created_at}</Card.Footer>
                                </Card>
                            ))}
                        </div>
                        <div className="col-2"></div>
                    </div>

                ) : (
                    <>Momentan nu sunt licitatii aici </>
                )}
            </div>
            <Footer/>
        </div>);
};

export default Homepage;
