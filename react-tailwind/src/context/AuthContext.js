import React, { useState, useContext, createContext, useEffect } from "react"
import apiClient from "../auth/apiClient"
import { useGlobal } from "./GlobalContext"

const AuthContext = createContext()

export function ProvideAuth({ children }) {
    const [user, setUser] = useState({})

    const [isLogged, setIsLogged] = useState(false)
    
    const [isLoading, setIsLoading] = useState(true)

    const [pages, setPages] = useState(null)   
    useEffect(() => {
        const init = async () => {
            await apiClient.get("/sanctum/csrf-cookie")
            await apiClient
                .get("api/init")
                .then((response) => {
                    console.log(response.data)
                    setPages(response.data.pages)
                    if (response.data.user) {
                        setUser(response.data.user)
                        setIsLogged(true)
                    }
                })
                .catch((error) => {
                    verifyAuthenticationError(error)
                })
                .then(() => {
                    setIsLoading(false)
                })
        }
        init()
    }, [])

    const login = async (loginData, callbackError, callbackSuccess) => {
        setIsLoading(true)
        const { email, password, remember } = loginData
        await apiClient
            .post("/login", {
                email,
                password,
                remember,
            })
            .then((response) => {
                setUser(response.data.user)
                setIsLogged(true)
                callbackSuccess()
            })
            .catch((error) => {
                callbackError(error)
                verifyAuthenticationError(error)
            })
            .then(() => {
                setIsLoading(false)
            })
    }

    const register = async (registerData, callbackError, callbackSuccess) => {
        setIsLoading(true)

        await apiClient
            .post("/register", {
                ...registerData,
            })
            .then((response) => {
                setUser(response.data.user)
                setIsLogged(true)
                callbackSuccess()
            })
            .catch((error) => {
                callbackError(error)
            })
            .then(() => {
                setIsLoading(false)
            })
    }

    const logout = async (callbackRedirect) => {
        setIsLoading(true)

        await apiClient
            .post("/logout")
            .then((response) => {
                if (response.status === 204) {
                    setIsLogged(false)
                    setUser({})
                    callbackRedirect()
                    setIsLoading(false)
                }
            })
            .catch((error) => {
                console.log(error.response)
            })
            .then(() => {
                setIsLoading(false)
            })
    }

    const verifyAuthenticationError = (error) => {
        if (error.response && error.response.status === 401) {
            setIsLogged(false)
            setUser({})
            console.log("desautenticado")
        }
    }

    const auth = {
        user,
        pages,
        setUser,
        login,
        register,
        logout,
        isLogged,
        setIsLogged,
        verifyAuthenticationError,
    }

    return <AuthContext.Provider value={auth}>{pages && children}</AuthContext.Provider>
}
export const useAuth = () => {
    return useContext(AuthContext)
}
