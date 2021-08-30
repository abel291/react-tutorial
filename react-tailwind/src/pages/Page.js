import { useRef, useEffect } from "react"
import axios from "../helpers/axios"
const Page = ({ children }) => {
    
    const global = useGlobal()
    console.log(global.pages)
    const [page, setpage] = useState({})

    useEffect(() => {
        if (global.pages) {
            let home = global.pages.find((page) => page.type === "home")
            console.log(home)
            setpage(home)
        }
    }, [global.pages])
    return <div></div>
}

export default Page
