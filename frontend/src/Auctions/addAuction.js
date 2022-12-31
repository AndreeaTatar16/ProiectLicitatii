import React, {useState} from 'react';
import {useLocalState} from "../util/useLocalStorage";
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";
import {Link} from "react-router-dom";

const AddAuction = () => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [auction, setAuction] = useState(null);

    const [auctionTitle, setAuctionTitle] = useState("");
    const [auctionDescription, setAuctionDescription] = useState("");
    const [auctionImage, setAuctionImage] = useState("");
    const [initialPrice, setInitialPrice] = useState("");
    const [finalPrice, setFinalPrice] = useState("");
    const [created_at, setCreated_at] = useState("");
    const [createdBy, setCreatedBy] = useState("");

    function createAuction() {
        const reqBody = {
            auctionTitle: auctionTitle,
            auctionDescription: auctionDescription,
            //auctionImage: auctionImage,
            initialPrice: initialPrice,
            finalPrice: finalPrice,
            created_at: new Date(created_at),
        };
        console.log(reqBody);
        fetch("/auctions/addAuction", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`
            },
            method: "POST",
            body: JSON.stringify(reqBody)
        }).then(response => {
            if (response.status === 200) {
                window.location.href = "/dashboard";
                return response.json();
            }
        })
        // .then(auctionData => {
        //     setAuction(auctionData);
        // });
    }

    return (
        <div>
            <NavbarComponent/>
            <div className="row">
                <div className="col-3"></div>

                <div className="col-6">
                    <h3 className="mt-5 mb-4 text-center">Your auction is going to be amazing! Make sure you do it
                        correctly!</h3>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Auction title</label>
                            <input className="form-control" type="text" placeholder="ex: Bike" id="auctionTitle"
                                   onChange={(event) => setAuctionTitle(event.target.value)}
                            ></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Auction
                                description</label>
                            <input className="form-control" type="text"
                                   placeholder="ex: Made in.. (200 characters allowed)"
                                   id="auctionDescription"
                                   onChange={(e) => setAuctionDescription(e.target.value)}
                            ></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Auction image</label>
                            <input className="form-control" type="file" id="auctionImage"
                                   onChange={(e) => setAuctionImage(e.target.value)}
                            ></input>
                        </div>

                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Initial price</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text">$</span>
                            <input className="form-control" type="number" placeholder="Starting price" id="initialPrice"
                                   onChange={(e) => setInitialPrice(e.target.value)}
                            ></input>
                            <span className="input-group-text">.00</span>
                        </div>

                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Final price</label>
                        <div className="input-group b-3">
                            <span className="input-group-text">$</span>
                            <input className="form-control" type="number"
                                   placeholder="The price when auction comes to end"
                                   id="finalPrice"
                                   onChange={(e) => setFinalPrice(e.target.value)}
                            ></input>
                            <span className="input-group-text">.00</span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Auction creation
                                date</label>
                            <input className="form-control" type="date" id="created_at"
                                   onChange={(e) => setCreated_at(e.target.value)}
                            ></input>
                        </div>
                        <fieldset disabled>
                            <div className="mb-3">
                                <label htmlFor="disabledTextInput" className="form-label">Auction was made by: </label>
                                <input type="text" id="createdBy" className="form-control" value={"userul logat"}
                                       onChange={(event) => setCreatedBy(event.target.value)}></input>
                            </div>
                        </fieldset>

                        <button className="btn bg-navbar text-white" onClick={() => createAuction()}><Link
                            className="text-decoration-none text-white"
                            to={"/dashboard"}>Submit auction
                        </Link></button>
                    </form>
                </div>
                <div className="col-3"></div>
            </div>
            <Footer/>
        </div>
    );
};

export default AddAuction;
