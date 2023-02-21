import React from "react"
import { Link } from "react-router-dom"
import logo from "../assets/img/logo.png"
import './Admin.css'

const Admin = () => {
    return (
        <>
        <div className="container-fluid flex">
            <div className="side-left flex flex-col justify-center bg-[#3282B8] text-white min-h-[560px] h-screen w-[60%]">
                <div className="side-left-content h-screen flex flex-col p-20 justify-center">
                    <h1 className="text-3xl font-bold mb-4 uppercase">warehouse stocktifity</h1>
                    <h2 className="text-md font-bold mb-4">Warehouse system</h2>
                    <p className="side-description">
                    A warehouse management system (WMS) consists of software and processes that allow organizations to control and administer warehouse operations from the time goods or materials enter a warehouse until they move out.
                    </p>
                </div>
            </div>

            <div className="side-right flex flex-col justify-center items-center bg-[#474E68] min-h-[560px] h-screen w-[40%]">
                <div className="side-right-content w-[60%] flex flex-col">
                    <h2 className="text-center text-[#EEF1FF] font-bold uppercase"><img src={logo} className="w-10 h-10 mx-auto"></img></h2>
                    <form className="form-login w-full p-10" action="">
                        <div className="mb-4">
                            <label className="block text-[#EEF1FF] font-medium">Username</label>
                            <input type="text" id="username" className="block w-full border-b-2 border-[#A7BBC7] pl-2 rounded-md shadow-none focus:bg-[#E3F6F5] focus:border-[#393E46] focus:text-black hover:outline-none" placeholder="Username" required></input>
                        </div>
                        <div className="mb-4">
                            <label className="block text-[#EEF1FF] font-medium">Password</label>
                            <input type="password" id="password" className="block w-full border-b-2 border-[#A7BBC7] pl-2 rounded-md shadow-none focus:bg-[#E3F6F5] focus:border-[#393E46] focus:text-black hover:outline-none" placeholder="Password" required></input>
                        </div>
                        <div className="mb-4">
                            <p className="text-[#EEF1FF]"><Link to="">Can't Login?</Link></p>
                        </div>
                        <div className="text-center">
                            <button className="w-[100px] p-1 bg-[#3282B8] text-white shadow-lg rounded-xl hover:outline-none hover:bg-[#5584AC]">Login</button>
                        </div>
                    </form>
                </div>

                <footer className="side-right-footer w-full min-h-[140px] border-t-2 text-[#EEF1FF]">
                    <p className="text-center p-5">Software Development Team</p>
                </footer>
            </div>
        </div>
        </>
    )
}

export default Admin