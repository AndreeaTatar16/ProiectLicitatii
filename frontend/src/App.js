import './App.css';
import {useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useLocalState} from "./util/useLocalStorage";
import {Route, Routes} from "react-router-dom";
import Dashboard from "./Dashboard";
import Homepage from "./Homepage";
import Login from "./authentification/Login";
import PrivateRoute from "./PrivateRoute";
import AuctionView from "./Auctions/viewAuction";
import EditAuction from "./Auctions/editAuction";
import Register from "./authentification/Register";
import AddAuction from "./Auctions/addAuction";


function App() {
    const [jwt, setJwt] = useLocalState("", "jwt");

    // localStorage.getItem();
    // localStorage.setItem();


    useEffect(() => {
        console.log(`JWT code is: ${jwt}`);
    }, [jwt]);

    return (
        <Routes>
            <Route path="/" element={<Homepage/>}/>
            <Route path="/dashboard" element={
                <PrivateRoute>
                    <Dashboard/>
                </PrivateRoute>
            }/>
            <Route path="/auctions/:id"
                   element={
                       <PrivateRoute>
                           <AuctionView/>
                       </PrivateRoute>
                   }
            />
            <Route path="/auctions/editAuction/:id"
                   element={
                       <PrivateRoute>
                           <EditAuction/>
                       </PrivateRoute>
                   }
            />
            <Route path="/auctions/addAuction"
                   element={
                       <PrivateRoute>
                           <AddAuction/>
                       </PrivateRoute>
                   }
            />
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    );
}

export default App;
