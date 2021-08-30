import { useEffect, useState } from "react"
import { NavLink, useHistory, useLocation } from "react-router-dom"
import Input from "../components/Input"
import NotificationError from "../components/NotificationError"
import ValidaterErrors, { errorsInputValidation } from "../components/ValidaterErrors"
import { useAuth } from "../context/AuthContext"

const Login = () => {
    const auth = useAuth() //context
    const [errors, setErrors] = useState([])
    const history = useHistory()
    const location = useLocation()
    const { from } = location.state || { from: { pathname: "/" } }
    
    console.log(location)
    useEffect(() => {
        console.log(auth.isLogged)
        if (auth.isLogged === false && from.pathname === "/reservation") {
            setErrors("Para hacer una reservacion debes iniciar session primero")
        }

        if (auth.isLogged) {
            history.replace(from)
        }
    }, [auth.isLogged])
    //login
    const [loginData, setLoginData] = useState({
        email: "ad@ad.com",
        password: "123123",
        remember: false,
    })

    const setData = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }
    const setDataCheck = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.checked })
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault()
        setErrors([])
        setErrorsInput({})
        auth.login(loginData, callbackError, callbackSuccess)
    }
    //callback
    const [errorsInput, setErrorsInput] = useState({})

    const callbackError = (error) => {
        let errorsMsg = ValidaterErrors(error)
        setErrors(errorsMsg)
        //setErrorsInput(errorsInputValidation(error.response))
    }

    const callbackSuccess = () => {}
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Iniciar sesión en tu cuenta</h2>
                    <p className="mt-2 text-center  text-gray-600">
                        <span>O tambien puedes </span>
                        <NavLink to="/register" className="font-bold text-yellow-600 hover:text-yellow-500">
                         Registrarte
                        </NavLink>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmitLogin}>
                    <NotificationError errors={errors} setErrors={setErrors} />
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="form-input-label">
                                Email
                            </label>
                            <input
                                className="mt-1 form-input form-input-border-normal"
                                name="email"
                                autoComplete="email"
                                require='true'
                                
                                type="text"
                                value={loginData.email}
                                onChange={setData}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="form-input-label">
                                Contraseña
                            </label>
                            <input
                                className="mt-1 form-input form-input-border-normal"
                                name="password"
                                autoComplete="current-password"
                                require='true'
                                
                                type="password"
                                value={loginData.password}
                                onChange={setData}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                
                                name="remember"
                                type="checkbox"
                                className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                                checked={loginData.remember}
                                onChange={setDataCheck}
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                Recordarme
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="/" className="font-medium text-yellow-600 hover:text-yellow-500">
                                Olvidaste tu contraseña?
                            </a>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
