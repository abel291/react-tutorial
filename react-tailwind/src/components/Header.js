import { BookmarkIcon, MenuIcon, XIcon } from "@heroicons/react/outline"
import { useState } from "react"
import { NavLink, useHistory } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Header({ classStyle }) {
    const [open, setOpen] = useState(false)
    const auth = useAuth()
    const history = useHistory()
    const style='lg:bg-transparent lg:text-white absolute inset-x-0 rounded-b-xl';
    
    const style2='bg-white text-gray-600 ';
    
    return (
        // <nav className="bg-yellow-500 lg:bg-transparent text-white lg:text-gray-700 z-50">
        <nav
            className={
                (open ? "bg-white" : "") +
                " px-3 lg:px-10 xl:px-12 lg:py-3 mx-auto z-50 flex flex-col lg:flex-row lg:justify-between  lg:text-base font-medium lg:font-bold  absolute inset-x-0 "+style2
            }
        >
            <div className={(open ? "text-gray-600" : "") + " px-2 py-4 text-lg flex items-center justify-between lg:hidden"}>
                <NavLink onClick={() => setOpen(false)} exact to="/" className=" text-xl lg:text-2xl font-bold ">
                    <div className=" leading-6">
                        Hotel <br /> Cartagena
                    </div>
                </NavLink>

                <button className=" focus:outline-none  lg:hidden " onClick={() => setOpen(!open)}>
                    {open ? <XIcon className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />}
                </button>
            </div>


            <div className={(!open ? "hidden" : "") + " lg:block w-full"}>
                <div
                    className="py-3  z-20 flex flex-col lg:flex-row lg:items-center lg:justify-between"
                >
                    <NavLink onClick={() => setOpen(false)} exact to="/" className="text-xl lg:text-2xl font-bold hidden lg:block">
                        <div className=" leading-6">
                            Hotel <br /> Cartagena
                        </div>
                    </NavLink>
                    <div className=" flex flex-col space-y-1 lg:space-y-0 lg:flex-row flex-grow justify-center lg:items-center lg:space-x-4 ">
                        <NavLink
                            activeClassName="bg-gray-100 lg:bg-transparent lg:border-b-2 border-gray-600"
                            onClick={() => setOpen(false)}
                            to="/"
                            className="px-3 py-2 lg:py-1 lg:px-0 rounded-md lg:rounded-none  "
                        >
                            Habitaciones
                        </NavLink>
                        <NavLink
                            activeClassName="bg-gray-100 lg:bg-transparent lg:border-b-2 border-gray-600"
                            onClick={() => setOpen(false)}
                            to="/gallery"
                            className="px-3 py-2 lg:py-1 lg:px-0 rounded-md "
                        >
                            Galleria
                        </NavLink>
                        <NavLink
                            activeClassName="bg-gray-100 lg:bg-transparent lg:border-b-2 border-gray-600"
                            onClick={() => setOpen(false)}
                            to="/about-us"
                            className="px-3 py-2 lg:py-1 lg:px-0 rounded-md "
                        >
                            Nosotros
                        </NavLink>
                        <NavLink
                            activeClassName="bg-gray-100 lg:bg-transparent lg:border-b-2 border-gray-600"
                            onClick={() => setOpen(false)}
                            to="/blog"
                            className="px-3 py-2 lg:py-1 lg:px-0 rounded-md "
                        >
                            Blog
                        </NavLink>
                        <NavLink
                            activeClassName="bg-gray-100 lg:bg-transparent lg:border-b-2 border-gray-600"
                            onClick={() => setOpen(false)}
                            to="/contact-us"
                            className="px-3 py-2 lg:py-1 lg:px-0 rounded-md "
                        >
                            Contactos
                        </NavLink>
                        <div className>
                            <NavLink
                                onClick={() => setOpen(false)}
                                to="/reservation"
                                className="px-3 py-2 lg:px-4 lg:py-2 lg:text-sm rounded-md lg:rounded-full lg:bg-yellow-500 lg:text-white inline-flex space-x-1 items-center font-bold focus:outline-none focus:shadow-outline"
                            >
                                <BookmarkIcon className="h-5 w-5"></BookmarkIcon>
                                <span>Reservaciónes</span>
                            </NavLink>
                        </div>
                    </div>
                    <div className="mt-1 lg:mt-0 ">
                        {auth.isLogged ? (
                            <div className="flex items-center justify-between">
                                <span>{auth.user.name}</span>
                                <button
                                    onClick={() => {
                                        auth.logout(() => history.push("/login"))
                                        setOpen(false)
                                    }}
                                    className="px-2 py-2  lg:px-3 rounded-md "
                                >
                                    Salir
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center lg:justify-end">
                                <NavLink
                                    activeClassName="bg-gray-100 lg:bg-transparent lg:border-b-2 border-gray-600"
                                    onClick={() => setOpen(false)}
                                    to="/login"
                                    className="px-3 py-2 lg:py-2 lg:px-2 rounded-md"
                                >
                                    Acceeder
                                </NavLink>
                                {/* <NavLink
                                    activeClassName="bg-gray-100 lg:bg-transparent lg:border-b-2 border-gray-600"
                                    onClick={() => setOpen(false)}
                                    to="/register"
                                    className="px-3 py-2 lg:py-2 lg:px-2 rounded-md"
                                >
                                    Registrarse
                                </NavLink> */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
