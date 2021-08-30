import { createContext, useContext, useEffect, useState } from "react"
import apiClient from "../auth/apiClient"
import Loading from "../components/Loading"
import { useAuth } from "./AuthContext"

const GlobalContext = createContext()

export function ProviderGlobal({ children }) {

    const [isLoading, setIsLoading] = useState(true)

    const [pages, setPages] = useState(null)   

    const helpers = {
        setIsLoading, 
        setPages,       
        pages,
    }

    return (
        <GlobalContext.Provider value={helpers}>
            <Loading isLoading={isLoading} />
            {pages && children}
            
        </GlobalContext.Provider>
    )
}
export const useGlobal = () => {
    return useContext(GlobalContext)
}
