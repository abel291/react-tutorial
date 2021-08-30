import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter as Router, Route, Switch, useLocation, withRouter } from "react-router-dom"
import Header from "./components/Header"

import { ProvideAuth } from "./context/AuthContext"
import { ProviderReservation } from "./context/ReservationContext"
import { ProviderGlobal } from "./context/GlobalContext"

import PrivateRoute from "./auth/PrivateRoute"
import RoomsPage from "./pages/RoomsPage"

import NoFoundPage from "./pages/NoFoundPage"
import HomePage from "./pages/HomePage"
import ReservationPage from "./pages/ReservationPage"

import Login from "./auth/Login"
import Register from "./auth/Register"
import { Transition } from "@headlessui/react"
import App from "./App"
const routes = [
    { path: "/", name: "Home", Component: HomePage },
    { path: "/rooms", Component: RoomsPage },
    { path: "/login", Component: Login },
    { path: "/register", Component: Register },
]
const routesPrivate = [{ path: "/reservation", Component: ReservationPage }]

ReactDOM.render(
    <React.StrictMode>
        <ProvideAuth>
            <ProviderReservation>
                <Router>
                    <App>
                        {/* <Header></Header> */}
                        {routes.map(({ path, Component }) => (
                            <Route key={path} exact path={path}>
                                {({ match }) => (
                                    <Transition
                                        show={match != null}
                                        enter="transition-opacity duration-500"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="duration-0"
                                        //unmount={true}
                                    >
                                        <Component />
                                    </Transition>
                                )}
                            </Route>
                        ))}
                        <PrivateRoute path="/reservation">
                            <ReservationPage />
                        </PrivateRoute>

                        {/* {routesPrivate.map(({ path, Component }) => (
                        <PrivateRoute key={path} path={path}>
                            
                                <Component />
                            
                        </PrivateRoute>
                    ))} */}

                        <Route key="no-found" path="*" Component={NoFoundPage} />
                    </App>
                </Router>
            </ProviderReservation>
        </ProvideAuth>
    </React.StrictMode>,
    document.getElementById("root")
)

// If you want to start measuring performance in your Rese, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//termianr lo de las transiciones
reportWebVitals()
