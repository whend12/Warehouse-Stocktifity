import React from "react"
import { NavLink } from "react-router-dom"
import { useState } from "react"

// Import LOGO
import logo from "../assets/img/logo.png"

// Import CSS
import "./Sidebar.css"

// Import Icon
import { RxDashboard } from "react-icons/rx"
import { HiCurrencyDollar } from "react-icons/hi"
import { MdOutlineInventory2 } from "react-icons/md"
import { GiForklift } from "react-icons/gi"
import { FaBars } from "react-icons/fa"
import { IoMdLogOut } from "react-icons/io"

const Sidebar = ({children}) => {
    const [isOpen, setOpen] = useState(true)
    const toggle = () => setOpen (!isOpen)
    const menuItem = [
        {
          path: "/Dashboard",
          name: "Dashboard",
          icon: <RxDashboard size={22}/>
        },
        {
          path: "/Inventory",
          name: "Inventory",
          icon: <HiCurrencyDollar size={22}/>
        },
        {
          path: "/Order",
          name: "Order",
          icon: <MdOutlineInventory2 size={22}/>
        },
        {
          path: "/Supplier",
          name: "Supplier",
          icon: <GiForklift/>
        },
        {
          path: "/Admin",
          name: "Logout",
          icon: <IoMdLogOut size={22} fill="#D61355"/>
        }
      ]

    return (
        
        <div className="flex">
            <div className={`${isOpen ? "w-[250px]" : "w-16"} relative min-h-screen duration-500 bg-[#6B728E] border-r-2`}>
                <div className="w-full flex items-center p-5">
                <img src={logo} alt="stocktifity" className={`${!isOpen && "hidden"} w-9 h-9`}></img><h1 className={`${!isOpen && "hidden"} logo text-white ml-2`}>Stocktifity</h1>
                    <div className={`${isOpen && "ml-5"} bars block text-white`}>
                        <FaBars onClick={toggle} size="25px"/>
                    </div>
                </div>
                { menuItem.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link flex items-center text-white pt-2.5 pb-2.5 pl-3.5 pr-3.5 gap-4 duration-500 hover:bg-[#EEEEEE] hover:text-[#000] active:bg-blue-500">
                        <div className={`${!isOpen && "ml-2"} icon text-lg`}>{item.icon}</div>
                        <div className={`${!isOpen && "hidden"} link-text text-sm`}>{item.name}</div>
                    </NavLink>
                ))
            }

            {/* <button onClick={() => navigate("/Admin")} className={`${!isOpen && "w-12 left-2 p-1"} duration-500 absolute bottom-5 left-10 w-20 bg-[#474E68] text-white p-2 rounded-lg shadow-lg shadow-[#50577A] hover:bg-[#50577A] hover:outline-none focus:outline-none active:bg-[#474E68]`}>Log out</button> */}
            </div>
            <main className="w-screen h-screen">{children}</main>
        </div>
        
    )
}

export default Sidebar