import React from "react";
import { Link } from "react-router-dom";

// Import Footer
import Footer from "../pages/Footer";

// Import Icon
import { BsFillPersonFill } from "react-icons/bs"

const Dashboard = () => {
    return (
        <>
        <div className="w-full">
            <header className="flex w-full bg-[#6B728E] border-b-2 p-4">
                <div className="flex w-full">
                <h1 className="text-white font-semibold text-sm uppercase">Dashboard</h1>
                </div>
                <div className="flex justify-end items-center">
                    <BsFillPersonFill fill="white" size={20}/><h2 className="ml-1 text-white font-semibold text-sm">Admin</h2>
                </div>
            </header>
                
        <div className="grid min-h-[634px]">
            <div className="grid grid-cols-1 md:grid-cols-3 bg-[#474E68] p-4">
                <div id="barang" className="grid content-center w-50 h-16 ml-4 bg-white hover:bg-[#787A91] text-[#404258] hover:text-white active:bg-[#6B728E] transition duration-300 shadow-lg rounded-md mt-2 mb-2">
                    <Link to="/Inventory"><p className="inventory uppercase text-center p-6 font-semibold">inventory</p></Link>
                </div>
                <div id="order" className="grid content-center w-50 h-16 ml-4 bg-white hover:bg-[#787A91] text-[#404258] hover:text-white active:bg-[#6B728E] transition duration-300 shadow-lg rounded-md mt-2 mb-2">
                    <Link to="/Order"><p className="order uppercase text-center p-6 font-semibold">order</p></Link>
                </div>
                <div id="supplier" className="grid content-center w-50 h-16 ml-4 bg-white hover:bg-[#787A91] text-[#404258] hover:text-white active:bg-[#6B728E] transition duration-300 shadow-lg rounded-md mt-2 mb-2">
                    <Link to="/Supplier"><p className="supplier uppercase text-center p-6 font-semibold">supplier</p></Link>
                </div>
            </div>
        </div>
            <Footer/>
        </div>
        </>
    )
}

export default Dashboard;