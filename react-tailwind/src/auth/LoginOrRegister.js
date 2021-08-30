import { useState } from "react"
import { NavLink, useHistory, useLocation } from "react-router-dom"
import { useEffect } from "react"
//import NotificationError from "../components/NotificationError"
//import ValidaterErrors from "../components/ValidaterErrors"
import { useAuth } from "../context/AuthContext"
import Register from "./Register"
import Login from "./Login"
import { CSSTransition, TransitionGroup } from "react-transition-group"
const LoginOrRegister = () => {
    const auth = useAuth()
    const [errors, setErrors] = useState([])
    const history = useHistory()
    const location = useLocation()
    const { from } = location.state || { from: { pathname: "/" } }

    useEffect(() => {
        // if (auth.isLogged === false && from.pathname === "/reservation") {
        //     setErrors("Para hacer una reservacion debes iniciar session primero")
        // }

        if (auth.isLogged) {
            history.replace(from)
        }
    }, [auth.isLogged])

    

    return (
        <>
            {location.pathname === "/login" && <Login />}
            {location.pathname === "/register" && <Register />}
        </>
    )
}

export default LoginOrRegister
