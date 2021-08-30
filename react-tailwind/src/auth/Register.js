import { useEffect, useState } from "react"
import { NavLink, useHistory, useLocation } from "react-router-dom"
import NotificationError from "../components/NotificationError"
import ValidaterErrors from "../components/ValidaterErrors"
import { useAuth } from "../context/AuthContext"

const Register = () => {
    const auth = useAuth() //context
    const [errors, setErrors] = useState([])
    
    

    let email = "dani" + Math.floor(Math.random() * 101) + "@dani.com"
    const [registerData, setRegisterData] = useState({
        name: "dan",
        email: email,
        email_confirmation: email,
        phone: "32244321",
        country: "Mexico",
        city: "Mexico",
        password: "123123",
        password_confirmation: "123123",
    })

    const setData = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    }

    //register

    const handleSubmitRegister = (e) => {
        e.preventDefault()
        setErrors([])
        auth.register(registerData, callbackError)
    }

    //callback
    const callbackError = (error) => {
        const errorsMsg = ValidaterErrors(error)
        setErrors(errorsMsg)
        //setErrorInput(errorsMsg.errorsInputValidation)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Registrate</h2>
                    <p className="mt-2 text-center text-gray-600">
                        <span> O puedes </span>
                        <NavLink to="/login" className="font-bold text-yellow-600 hover:text-yellow-500">
                            Iniciar sesion
                        </NavLink>
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmitRegister}>
                    <NotificationError errors={errors} setErrors={setErrors} />
                    <div>
                        <div className="space-y-6">
                            <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                <div>
                                    <label htmlFor="register-name" className="form-input-label">
                                        Nombre y apellido
                                    </label>
                                    <input
                                        className="mt-1 form-input form-input-border-normal"
                                        name="name"
                                        type="text"
                                        value={registerData.name}
                                        onChange={setData}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="register-phone" className="form-input-label">
                                        Telefono
                                    </label>
                                    <input
                                        className="mt-1 form-input form-input-border-normal"
                                        name="phone"
                                        type="text"
                                        value={registerData.phone}
                                        onChange={setData}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="register-email" className="form-input-label">
                                        Email
                                    </label>
                                    <input
                                        value={registerData.email}
                                        onChange={setData}
                                        className="mt-1 form-input form-input-border-normal"
                                        name="email"
                                        type="email"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="register-email_confirmation" className="form-input-label">
                                        Confirmar email
                                    </label>
                                    <input
                                        className="mt-1 form-input form-input-border-normal"
                                        name="email_confirmation"
                                        type="email"
                                        value={registerData.email_confirmation}
                                        onChange={setData}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="register- country" className="form-input-label">
                                        Pais
                                    </label>
                                    <input
                                        className="mt-1 form-input form-input-border-normal"
                                        name="country"
                                        type="text"
                                        value={registerData.country}
                                        onChange={setData}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="register-city" className="form-input-label">
                                        Ciudad
                                    </label>
                                    <input
                                        className="mt-1 form-input form-input-border-normal"
                                        name="city"
                                        type="text"
                                        value={registerData.city}
                                        onChange={setData}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="register-password" className="form-input-label">
                                        Contraseña
                                    </label>
                                    <input
                                        className="mt-1 form-input form-input-border-normal"
                                        name="password"
                                        type="password"
                                        value={registerData.password}
                                        onChange={setData}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="register-password" className="form-input-label">
                                        Confirmar contraseña
                                    </label>
                                    <input
                                        className="mt-1 form-input form-input-border-normal"
                                        name="password_confirmation"
                                        type="password"
                                        value={registerData.password_confirmation}
                                        onChange={setData}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                        >
                            Registrarse
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
