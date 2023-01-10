import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import {Link} from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";
import {Button, Form, ListGroup, Modal, Table} from "react-bootstrap";
import Stomp from 'stompjs';

const AuctionView = () => {
    const auctionId = window.location.href.split("/auctions/")[1];
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [auction, setAuction] = useState(null);
    const [priceHistory, setPriceHistory] = useState(null);
    const [updated_price, setUpdatedPrice] = useState("");
    const [message, setMessage] = useState(
        {
            message: "",
        });

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
            window.location.href = `/auctions/${auctionId}`;
            setPriceHistory(priceHistory);
            console.log(priceHistory);
        });
    }

    //get pentru preturi
    useEffect(() => {
        fetch(`/bidding/${auctionId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            },
            method: "GET"
        }).then(response => {
            if (response.status === 200)
                return response.json();
        }).then(priceHistoryData => {
            console.log(priceHistoryData);
            setPriceHistory(priceHistoryData);
        });
    }, []);

    //const SOCKET_URL = 'ws://localhost:8081/ws-message?token=${eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyIiwiZXhwIjoxNzAzNjA5NjgyLCJpYXQiOjE2NzI1MDU2ODIsImF1dGhvcml0aWVzIjpbIkFETUlOIl19.DIGdxKw49UbIBNWjsHcH-qJnackLzoq9niK2htAZyXlE0N7myrZjjH_W_w-cOweew8CTkMpl6YmJdjc9t5MA3w}';
    const SOCKET_URL = `ws://localhost:8081/ws-message?token=${jwt}`;
    //const SOCKET_URL = 'ws://localhost:8081/ws-message';

    //TODO de adaugat tokenul in client care il preia de pe server

    //TODO am incercat sa facem sa ii dam custom header la client, insa nu vrea, asa ca i l-am dat cu query params

    //todo se poate si cu sockjs, fara a fi custom header

    // let onConnected = () => {
    //     console.log("Connected!!")
    //     client.subscribe(`/auctions/${this.props.match.params.id}`, (msg) => {
    //         if (msg.body) {
    //             const priceHistory = JSON.parse(msg.body);
    //             console.log("Price updated is:" + priceHistory.updated_price);
    //             console.log(priceHistory.updated_price);
    //             this.setState(priceHistory.updated_price);
    //         }
    //     });
    // }
    //
    // let onMessageReceived = (msg) => {
    //     setPriceHistory(msg.message);
    // }
    //
    // let onDisconnected = () => {
    //     console.log("Disconnected!!")
    // }
    //
    // const client = new Client({
    //     brokerURL: SOCKET_URL,
    //     reconnectDelay: 5000,
    //     heartbeatIncoming: 4000,
    //     heartbeatOutgoing: 4000,
    //     onConnect: onConnected,
    //     onDisconnect: onDisconnected
    // });
    //
    // client.activate();

    const client = Stomp.client(SOCKET_URL);
    const headers = {
        Authorization: `Bearer ${jwt}`
    }

    client.connect(headers, (frame) => {
        console.log('Connected: ' + frame);
        client.subscribe(`/auctions/${this.props.match.params.id}`, (message) => {
            console.log('Received message: ' + message);
            if (message.body) {
                const priceHistory = JSON.parse(message.body);
                console.log("Price updated is:" + priceHistory.updated_price);
                console.log(priceHistory.updated_price);
                this.setState(priceHistory.updated_price);
            }
        });
        client.send('/app/sendMessage', {}, 'Hello, STOMP');
    });


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="row">
            <NavbarComponent/>
            <div className="col-3"></div>
            <div className="col-6">
                {/*<SockJsClient*/}
                {/*    url={SOCKET_URL}*/}
                {/*    topics={[`/topic/auctions/${this.props.match.params.id}`]}*/}
                {/*    onConnect={onConnected}*/}
                {/*    onDisconnect={console.log("Disconnected!")}*/}
                {/*    onMessage={msg => onMessageReceived(msg)}*/}
                {/*    debug={false}*/}
                {/*/>*/}

                {/*<h1>am ceva modificat aici: {this.state.message}</h1>*/}
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
                                    <Modal.Title>You are going to bid
                                        for <b>{auction.auctionTitle}</b></Modal.Title>
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
                                    <Button className={"btn btn-outline"} onClick={() => bid()}
                                            variant="primary"><Link className={"text-decoration-none text-white"}
                                                                    to={`/auctions/${auctionId}`}>Bid</Link></Button>
                                </Modal.Footer>
                            </Modal>

                        </div>
                    </>
                ) : (
                    <></>
                )}

            </div>
            <div className="col-3">
            </div>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 mt-5">
                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Price</th>
                            <th>Bid by</th>
                        </tr>
                        </thead>
                        <tbody>
                        {priceHistory ? (
                            priceHistory.map((price) => (
                                <tr>
                                    <td>{price.id}</td>
                                    <td>{price.updated_price}</td>
                                    <td>{price.bid_by.name}</td>
                                </tr>
                            ))) : (
                            <></>
                        )}
                        </tbody>
                    </Table>
                </div>
                <div className="col-3"></div>
            </div>
            <Footer/>
        </div>
    );

}

export default AuctionView;
