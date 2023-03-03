import React, {useState} from "react"
import axios from "axios"
import { Link, Navigate } from "react-router-dom"

import logo from "../assets/img/logo.png"
import './Login.css'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = async (event) => {
        event.preventdefault()
        try {
            const response = await axios.post('http://localhost:5000/api/v1/login', {email, password})
            localStorage.setItem("token", response.data.token)
            alert("success")
            // Navigate("/Inventory")
        } catch (error) {
            setError("Email or password is correct")
        }
    }

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
                    <form onSubmit={handleSubmit} className="form-login w-full p-10">
                        <div className="mb-4">
                            <label className="block text-[#EEF1FF] font-medium">Email</label>
                            <input onChange={(event) => setEmail(event.target.value)} value={email} type="email" name="email" id="email" className="block w-full border-b-2 border-[#A7BBC7] pl-2 rounded-md shadow-none focus:bg-[#E3F6F5] focus:border-[#393E46] focus:text-black hover:outline-none" placeholder="Username" required></input>
                        </div>
                        <div className="mb-4">
                            <label className="block text-[#EEF1FF] font-medium">Password</label>
                            <input onChange={(event) => setPassword(event.target.value)} value={password} type="password" name="password" id="password" className="block w-full border-b-2 border-[#A7BBC7] pl-2 rounded-md shadow-none focus:bg-[#E3F6F5] focus:border-[#393E46] focus:text-black hover:outline-none" placeholder="Password" required></input>
                        </div>
                        <div className="mb-4">
                            <p className="text-[#EEF1FF]"><Link to="">Can't Login?</Link></p>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="w-[100px] p-1 bg-[#3282B8] text-white shadow-lg rounded-xl hover:outline-none hover:bg-[#5584AC]">Login</button>
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

export default Login