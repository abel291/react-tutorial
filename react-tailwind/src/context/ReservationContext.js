import { createContext, useState, useContext, useEffect } from "react"
import Loading from "../components/Loading"
//import NotificationError from "../components/NotificationError"

const reservationContext = createContext()

export function ProviderReservation({ children }) {
    const dataInit = () => {
        let startDate = new Date(new Date().toDateString())
        let endDate = new Date(new Date().toDateString())
        endDate.setDate(endDate.getDate() + 1) // addDays +1

        const data = {
            step: 1,
            errorsValidator: {},

            //step 1
            startDate: startDate,
            endDate: endDate,
            adults: 1,
            kids: 0,
            night: 0,
            discountCodeExmaple: [],

            //step 2
            rooms: [],
            roomQuantity: 0,
            roomSelected: {},

            //step 3
            complements: [],

            complementsIds: [],
            pricePorReservation: 0,
            subTotalPrice: 0,
            totalPrice: 0,
            complementsSelect: [],
            //step 4

            client: {
                name: "",
                phone: "",
                email: "",
                email_confirmation: "",
                country: "",
                city: "",
                check_in: "",
                special_request: "",
            },
            discount: {
                code: "",
                amount: 0,
                percent: 0,
            },
            order: "",
            createOrder: "",

            //helpers
        }
        return data
    }
    const [data, setData] = useState(dataInit())
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {        
        updateData('step',1)
    }, [])

    const currencyFormat = Intl.NumberFormat("de-DE", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })

    const formatNumber = (n) => {
        n = n ? n : 0 // number NaN = 0
        return "$ " + currencyFormat.format(parseFloat(n))
    }

    function updateData(type, value) {
        setData((prevData) => ({ ...prevData, [type]: value }))
    }

    const handleResetData = () => {
        setData(dataInit)
    }

    const context = {
        step: data.step,
        formatNumber,
        updateData,
        data,
        setData,
        errors,
        setErrors,
        isLoading,
        setIsLoading,
        handleResetData,
    }

    return (
        <reservationContext.Provider value={context}>
            <div className="relative">
                <Loading isLoading={isLoading} />
                {children}
            </div>
        </reservationContext.Provider>
    )
}

export const useReservation = () => {
    return useContext(reservationContext)
}
