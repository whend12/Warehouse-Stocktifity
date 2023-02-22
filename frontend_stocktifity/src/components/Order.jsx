import React from "react"
import { useState } from "react"
import './Order.css'
import Footer from "../pages/Footer"

const Order = () => {
    const min = 1;
    const max = 100;

    const [stock, setStock] = useState(0);

    const handleChangeStock = event => {
        const stock = Math.max(min, Math.min(max, Number(event.target.value)));
        setStock(stock);
    };

    const [jumlah, setJumlah] = useState(0);

    const handleChangeJumlah = event => {
        const jumlah = Math.max(min, Math.min(max, Number(event.target.value)));
        setJumlah(jumlah);
    };

    return (
        <>
        <section className="w-full">
            <header className="border-b-2 bg-[#474E68] p-4 text-white">
                <h1 className="font-semibold text-sm uppercase">dashboard <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 inline-block">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg> order
                </h1>
            </header>

                <div className="flex">
                    <div className="flex justify-center items-center w-full min-h-[634px] bg-[#474E68] p-16">
                    <form className="min-w-[240px] sm:min-w-[500px] w-1/2 bg-white pt-10 rounded-md shadow-xl" action="">
                    <h2 className="pb-5 font-semibold text-center text-[#404258] uppercase">order</h2>
                        <div className="w-full sm:flex items-center">
                            <div className="w-full sm:w-1/3">
                                <label className="block font-bold text-[#404258] md:text-left pl-5 sm:pl-5 md:pl-10 xl:pl-[110px] pr-14">Kode</label>
                            </div>
                            <div className="w-full sm:w-1/2 pl-4 pr-4">
                                <input type="number" id="kode" className="block w-full border-b-2 border-[#6B728E] pl-2 rounded-md shadow-none focus:bg-[#E4E4E4] focus:border-[#404258] focus:text-black outline-none" required></input>
                            </div>        
                        </div>
                        <div className="w-full sm:flex items-center">
                            <div className="w-full sm:w-1/3">
                                <label className="block font-bold text-[#404258] md:text-left pl-5 sm:pl-5 md:pl-10 xl:pl-[110px] pr-14">Barang</label>
                            </div>
                            <div className="w-full sm:w-1/2 pl-4 pr-4">
                                <input type="text" id="barang" className="block w-full border-b-2 border-[#6B728E] pl-2 rounded-md shadow-none focus:bg-[#E4E4E4] focus:border-[#404258] focus:text-black outline-none" required></input>
                            </div>        
                        </div>
                        <div className="w-full sm:flex items-center">
                            <div className="w-full sm:w-1/3">
                                <label className="block font-bold text-[#404258] md:text-left pl-5 sm:pl-5 md:pl-10 xl:pl-[110px] pr-14">Stock</label>
                            </div>
                            <div className="w-full sm:w-1/2 pl-4 pr-4">
                                <input value={stock} onChange={handleChangeStock} name="stock" type="number" id="stock" className="block w-full border-b-2 border-[#6B728E] pl-2 rounded-md shadow-none focus:bg-[#E4E4E4] focus:border-[#404258] focus:text-black outline-none" required></input>
                            </div>        
                        </div>
                        {/* <div className="w-full sm:flex items-center">
                            <div className="w-full sm:w-1/3">
                                <label className="block font-bold text-[#404258] md:text-left pl-5 sm:pl-5 md:pl-10 xl:pl-[110px] pr-14">harga</label>
                            </div>
                            <div className="w-full sm:w-1/2 pl-4 pr-4">
                                <input type="number" id="harga" min="0,01" step="0.01" max="25000" className="block w-full border-b-2 border-[#6B728E] pl-2 rounded-md shadow-none focus:bg-[#E4E4E4] focus:border-[#404258] focus:text-black outline-none" required></input>
                            </div>        
                        </div> */}
                        <div className="w-full sm:flex items-center">
                            <div className="w-full sm:w-1/3">
                                <label className="block font-bold text-[#404258] md:text-left pl-5 sm:pl-5 md:pl-10 xl:pl-[110px] pr-14">Jumlah</label>
                            </div>
                            <div className="w-full sm:w-1/2 pl-4 pr-4">
                                <input value={jumlah} onChange={handleChangeJumlah} name="jumlah" type="number" id="jumlah" className="block w-full border-b-2 border-[#6B728E] pl-2 rounded-md shadow-none focus:bg-[#E4E4E4] focus:border-[#404258] focus:text-black outline-none" required></input>
                            </div>        
                        </div>
                        <div className="w-full sm:flex items-center pt-6 pb-6">
                            <div className="w-full sm:w-1/2 flex justify-center sm:justify-end items-center mb-2 sm:mb-0 sm:pr-2 md:pr-0">
                                <button className="w-[100px] p-1 bg-[#3282B8] text-white shadow-lg rounded-xl hover:outline-none hover:bg-[#5584AC]">Submit</button>
                            </div>
                            <div className="w-full flex justify-center items-center sm:w-2/5 sm:pr-5">
                                <button className="w-[100px] p-1 bg-[#3282B8] text-white shadow-lg rounded-xl hover:outline-none hover:bg-[#5584AC]">Cancel</button>
                            </div>        
                        </div>
                    </form>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    )
}

export default Order