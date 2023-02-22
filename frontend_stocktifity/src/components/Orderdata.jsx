import React ,{useEffect, useState} from "react"
import { NavLink } from "react-router-dom"
import { IoIosCreate } from "react-icons/io"
import axios from "axios"

const Orderdata = () => {

    const [data, setData] = useState(null)
    useEffect(() => {
        axios.get("http://localhost:5000/products")
        .then ((res) => {
            setData([...res.data])
        })
        .catch((error) => {
            
        })
    }, [])

console.log(data)
    
    return (
        <>
        <section className="w-full">
            {/* <header className="border-b-2 bg-[#474E68] p-4 text-white">
                <h1 className="font-semibold text-sm uppercase">dashboard <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 inline-block">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg> order
                </h1>
            </header>

                <div className="flex">
                    <div className="flex justify-end w-full min-h-[692px] bg-[#474E68] p-16">
                        <div className="icon-create flex "><NavLink to={"/Order"}><IoIosCreate fill="white" size={25} className="hover:fill-[#ECF9FF] hover:"/></NavLink></div>
                    </div>
                </div> */}
                <ul>
                    {data !== null && data.map((res) => {
                        return (
                            <>
                            <li>{res.name}</li>
                            <li>{res.quantity}</li>
                            <li>{res.sku}</li>
                            <li>{res.category}</li>
                            </>
                        )
                    })}
                </ul>
            </section>
        </>
    )
}

export default Orderdata