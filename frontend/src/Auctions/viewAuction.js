import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import {Link} from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";
import {Button, Form, ListGroup, Modal} from "react-bootstrap";

const AuctionView = () => {
    const auctionId = window.location.href.split("/auctions/")[1];
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [auction, setAuction] = useState(null);
    const [priceHistory, setPriceHistory] = useState(null);
    const [updated_price, setUpdatedPrice] = useState("");

    useEffect(() => {
        fetch(`/auctions/${auctionId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            },
            method: "GET"
        }).then(response => {
            if (response.status === 200)
                return response.json();
        }).then(auctionData => {
            setAuction(auctionData);
        });
    }, []);

    function deleteAuction() {
        fetch(`/auctions/deleteAuction/${auctionId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "DELETE",
        }).then(response => {
            if (response.status === 200)
                return response.json();
        }).then(auction => {
            console.log(auction);
            console.log("incerc sa sterg");
        });
    }

    function bid() {
        const reqBody = {
            updated_price: updated_price
        };
        console.log(updated_price);
        fetch(`/bidding/${auctionId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "POST",
            body: JSON.stringify(reqBody)
        }).then(response => {
            if (response.status === 200)
                return response.json();
        }).then(priceHistory => {
            setPriceHistory(priceHistory);
            console.log(priceHistory);
        });
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="row">
            <NavbarComponent/>
            <div className="col-3"></div>
            <div className="col-6">
                <h1 className="mt-3 mb-4">Auction with id: {auctionId}</h1>
                {auction ? (
                    <>
                        <div>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Auction title: <b>{auction.auctionTitle}</b></ListGroup.Item>
                                <ListGroup.Item>Auction
                                    description: <b>{auction.auctionDescription}</b></ListGroup.Item>
                                <ListGroup.Item>Initial price: <b>{auction.initialPrice}</b></ListGroup.Item>
                                <ListGroup.Item>Final price: <b>{auction.finalPrice}</b></ListGroup.Item>

                            </ListGroup>
                            <button type="button" className="mt-4 mt-5 btn btn-outline-warning"><Link
                                className="text-decoration-none text-black"
                                to={`/auctions/editAuction/${auctionId}`}>Edit
                                Auction</Link></button>

                            <button onClick={() => deleteAuction()} type="button"
                                    className="ms-5 mt-4 mt-5 btn btn-outline-danger"><Link
                                to={"/dashboard"} className="text-decoration-none text-black">Delete auction</Link>
                            </button>

                            {/*<button type="button" className="ms-5 mt-4 mt-5 btn btn-outline-info"><Link*/}
                            {/*    className="text-decoration-none text-black"*/}
                            {/*    to={`/auctions/editAuction/${auctionId}`}>Bid for this auction</Link></button>*/}

                            <Button type="button"
                                    variant="primary"
                                    className="text-black text-decoration-none ms-5 mt-4 mt-5 btn btn-outline-info"
                                    onClick={handleShow}>
                                Bid for auction
                            </Button>

                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>You are going to bid for <b>{auction.auctionTitle}</b></Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="updated_price">
                                            <Form.Label>The price you are bidding</Form.Label>
                                            <input className="form-control" type="number" id="updated_price"
                                                   autoFocus
                                                   onChange={(e) => setUpdatedPrice(e.target.value)}>
                                            </input>
                                        </Form.Group>
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button onClick={() => bid()} variant="primary">Bid</Button>
                                </Modal.Footer>
                            </Modal>

                        </div>
                    </>
                ) : (
                    <></>
                )}
            </div>
            <div className="col-3"></div>


            <Footer/>
        </div>
    );
};

export default AuctionView;
