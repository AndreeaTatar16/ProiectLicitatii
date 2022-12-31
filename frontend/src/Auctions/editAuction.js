import React, {useEffect, useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import NavbarComponent from "../components/NavbarComponent";
import {Link} from "react-router-dom";

const EditAuction = () => {
    const auctionId = window.location.href.split("auctions/editAuction/")[1];
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [auction, setAuction] = useState({
        auctionTitle: "",
        auctionDescription: "",
        auctionImage: "",
        initialPrice: "",
        finalPrice: ""
    });

    function updateAuction(property, value) {
        const newAuction = {...auction}; //duplicate an object auction
        newAuction[property] = value;
        setAuction(newAuction);
        console.log(auction);
    }

    useEffect(() => {
        fetch(`/auctions/editAuction/${auctionId}`, {
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

    function edit() {
        fetch(`/auctions/editAuction/${auctionId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            },
            method: "PUT",
            body: JSON.stringify(auction)
        }).then(response => {
            if (response.status === 200)
                return response.json();
        }).then(auctionData => {
            setAuction(auctionData);
        });
    }

    return (
        <div>
            <NavbarComponent/>
            <div className="row">
                <div className="col-3"></div>
                <div className="col-6">
                    <h1>Auction with id: {auctionId}</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Auction title</label>
                        <input className="form-control" type="text" id="auctionTitle"
                               onChange={(e) => updateAuction("auctionTitle", e.target.value)}
                        ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Auction description</label>
                        <input className="form-control" type="text" id="auctionDescription"
                               onChange={(e) => updateAuction("auctionDescription", e.target.value)}
                        ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Auction image</label>
                        <input className="form-control" type="file" id="auctionImage"
                               onChange={(e) => updateAuction("auctionImage", e.target.value)}
                        ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Initial price</label>
                        <input className="form-control" type="number" id="initialPrice"
                               onChange={(e) => updateAuction("initialPrice", e.target.value)}
                        ></input>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Final price</label>
                        <input className="form-control" type="number" id="finalPrice"
                               onChange={(e) => updateAuction("finalPrice", e.target.value)}
                        ></input>
                    </div>

                    <button className="btn bg-navbar text-white" onClick={() => edit()}><Link
                        className="text-decoration-none text-white" to={"/dashboard"}>Submit
                        edit</Link></button>
                </div>

                <div className="col-3"></div>
            </div>
        </div>
    );
};

export default EditAuction;
