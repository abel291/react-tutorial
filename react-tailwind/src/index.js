import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import ReservationPage from "./pages/reservation/ReservationPage"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Header from "./components/Header"
import NoFoundPage from "./pages/NoFoundPage"
import HomePage from "./pages/HomePage"
import RoomsPage from "./pages/RoomsPage"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Header />
            
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/rooms" component={RoomsPage} />
                <Route exact path="/reservation" component={ReservationPage} />

                <Route path="*" component={NoFoundPage} />
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want to start measuring performance in your Rese, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
