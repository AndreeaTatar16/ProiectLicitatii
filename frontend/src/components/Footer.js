import React from "react";

export default function Footer() {
    return (
        <div className="container">
            <footer className=" my-4">
                <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                    <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">Home</a></li>
                    <li className="nav-item"><a href="/dashboard" className="nav-link px-2 text-muted">Auctions</a></li>
                    <li className="nav-item"><a href="/login" className="nav-link px-2 text-muted">Account</a></li>
                </ul>
                <p className="text-center text-muted">© 2023 Company, Inc</p>
            </footer>
        </div>
    )
}
