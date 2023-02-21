import React from "react";
import './Home.css';

const Home = () => {

    const traceButton = () => {
        alert("Error");
    }

    return (
        <>
        <div className="container-fluid grid w-full h-screen">
            <div className="grid content-center w-[420px] h-60 bg-[#FAF7F0] m-auto pb-10 rounded shadow-lg">
                <div className="bg-[#00ABB3] p-4 rounded-t">
                    <h1 className="font-bold text-center text-[#3C4048] uppercase">WareHouse Stocktifity</h1>
                </div>
                
                <div className="grid content-center">
                    <form className="mx-auto">
                    <p className="font-thin text-sm text-center mt-2">Login to access your account.</p>
                        <label className="relative block">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3">
                            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                            </svg>
                            <input type="text" id="username" className="username block p-1 pl-14 rounded-sm" placeholder="Username" required></input>
                        </label>
                        <label className="relative block">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="pointer-events-none w-6 h-6 absolute top-1/2 transform -translate-y-1/2 left-3">
                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                            </svg>
                        <input type="password" id="password" className="password block p-1 pl-14 rounded-sm" placeholder="Password" required></input>
                        </label>
                    <button className=" bg-[#00ABB3] text-[#EAEAEA] font-semibold mt-4 p-1 rounded-sm" onClick={() => traceButton()}>Sign in</button>
                    </form>
                </div>
            </div>
        </div>      
        </> 
    )
}

export default Home;