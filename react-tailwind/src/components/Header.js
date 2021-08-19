import { useState } from "react"
import { NavLink } from "react-router-dom"
export default function Header() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="bg-yellow-500 lg:bg-transparent text-white lg:text-gray-700">
            <div className="text-lg flex items-center justify-between pl-5  lg:hidden  ">
                
                <NavLink onClick={()=>(setOpen(false))}  exact to="/" className="font-bold">
                    Cartagena{open}
                </NavLink>

                <button className="px-5 py-4 focus:outline-none" onClick={() => setOpen(!open)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            <div className={(!open ? "hidden" : "") + " lg:block relative"}>
                <div
                    className=" absolute lg:static  bg-yellow-500
            w-full px-4 py-5 space-y-4 flex flex-col p-4 text-lg shadow-md justify-between
            lg:flex-row lg:items-center lg:space-y-0 lg:px-10 lg:py-8  lg:bg-transparent lg:shadow-none  
            "
                >
                    <NavLink onClick={()=>(setOpen(false))}  exact to="/" className="hidden lg:inline-flex items-center text-2xl font-bold">
                        <div className="leading-none">
                            {" "}
                            Hotel <br /> Cartagena{" "}
                        </div>
                    </NavLink>

                    <div className=" font-bold flex  flex-col space-y-1 lg:flex-row lg:items-center">
                        <NavLink  onClick={()=>(setOpen(false))} exact to="/" activeClassName="bg-yellow-600 " className="lg:hidden px-3 py-2 rounded-md ">
                            Inicio
                        </NavLink>

                        <NavLink  onClick={()=>(setOpen(false))} to="/rooms" activeClassName="bg-yellow-600 lg:bg-transparent " className="px-3 py-2  lg:px-3 rounded-md hover:bg-yellow-400 lg:hover:bg-transparent">
                            Habitaciones
                        </NavLink>
                        <NavLink  onClick={()=>(setOpen(false))} to="/gallery" activeClassName="bg-yellow-600 lg:bg-transparent " className="px-3 py-2  lg:px-3 rounded-md  hover:bg-yellow-400 lg:hover:bg-transparent">
                            Galleria
                        </NavLink>
                        <NavLink  onClick={()=>(setOpen(false))} to="/about-us" activeClassName="bg-yellow-600 lg:bg-transparent " className="px-3 py-2  lg:px-3 rounded-md  hover:bg-yellow-400 lg:hover:bg-transparent">
                            Nosotros
                        </NavLink>
                        <NavLink  onClick={()=>(setOpen(false))} to="/blog" activeClassName="bg-yellow-600 lg:bg-transparent " className="px-3 py-2  lg:px-3 rounded-md  hover:bg-yellow-400 lg:hover:bg-transparent">
                            Blog
                        </NavLink>
                        <NavLink  onClick={()=>(setOpen(false))} to="/contact-us" activeClassName="bg-yellow-600 lg:bg-transparent " className="px-3 py-2  lg:px-3 rounded-md  hover:bg-yellow-400 lg:hover:bg-transparent">
                            Contactos
                        </NavLink>
                    </div>

                    <div className="text-center mt-4">
                        <NavLink onClick={()=>(setOpen(false))} 
                            to="/reservation"
                            className="px-5 py-2 bg-yellow-500 rounded-full text-white inline-flex space-x-1 items-center font-bold text-sm tracking-wide  focus:outline-none focus:shadow-outline"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                                <path
                                    fillRule="evenodd"
                                    d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                                    clipRule="evenodd "
                                />
                            </svg>
                            <span>Reservacion</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    )
}
