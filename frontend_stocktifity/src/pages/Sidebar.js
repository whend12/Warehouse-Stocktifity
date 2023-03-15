import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

// Import LOGO
import logo from "../assets/img/logo.png";

// Import CSS
import "./Sidebar.css";

// Import Icon
import { RxDashboard } from "react-icons/rx";
import { HiCurrencyDollar } from "react-icons/hi";
import { MdOutlineInventory2 } from "react-icons/md";
import { GiForklift } from "react-icons/gi";
import { FaBars } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";

const Sidebar = () => {
  const [isOpen, setOpen] = useState(true);
  const toggle = () => setOpen(!isOpen);
  const menuItem = [
    {
      path: "/Dashboard",
      name: "Dashboard",
      icon: <RxDashboard size={22} />,
    },
    {
      path: "/Inventory",
      name: "Inventory",
      icon: <HiCurrencyDollar size={22} />,
    },
    {
      path: "/Order",
      name: "Order",
      icon: <MdOutlineInventory2 size={22} />,
    },
    {
      path: "/Supplier",
      name: "Supplier",
      icon: <GiForklift />,
    },
    {
      path: "/Login",
      name: "Logout",
      icon: <IoMdLogOut size={22} fill="#D61355" />,
    },
  ];

  return (
    <>
      <div className="flex relative">
        <div className={`${isOpen ? "w-[250px]" : "w-16"} fixed h-[100%] duration-500 bg-[#6B728E] border-r-2`}>
          <div className="w-full flex items-center p-5">
            <img src={logo} alt="stocktifity" className={`${!isOpen && "hidden"} w-9 h-9`}></img>
            <h1 className={`${!isOpen && "hidden"} logo text-white ml-2`}>Stocktifity</h1>
            <div className={`${isOpen && "ml-5"} bars block text-white`}>
              <FaBars onClick={toggle} size="25px" />
            </div>
          </div>
          {menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link flex items-center text-white pt-2.5 pb-2.5 pl-3.5 pr-3.5 gap-4 duration-500 hover:bg-[#EEEEEE] hover:text-[#000] active:bg-blue-500">
              <div key={item.icon} className={`${!isOpen && "ml-2"} icon text-lg`}>
                {item.icon}
              </div>
              <div key={item.name} className={`${!isOpen && "hidden"} link-text text-sm`}>
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        <main className={`${isOpen ? "ml-[250px]" : "ml-[50px]"} w-screen duration-500`}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Sidebar;
