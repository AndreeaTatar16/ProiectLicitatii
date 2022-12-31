import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";

export default function NavbarComponent() {
    return (
        <>
            <Navbar className="bg-navbar" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">AucPLAY</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href={"/"}>Home</Nav.Link>
                        <Nav.Link href={"/dashboard"}>My auctions</Nav.Link>
                        <Nav.Link href="/register">Register now</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

