import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

// Import Footer
import Footer from "../pages/Footer";

// Import Icon
import { BsFillPersonFill } from "react-icons/bs";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/users");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
      console.log(decoded);
    } catch (error) {
      console.log(error);
      if (error.response) {
        // navigate("/Login")
      }
    }
  };

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/api/v1/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  };

  return (
    <>
      <div className="w-full">
        <header className="flex w-full bg-[#6B728E] border-b-2 p-4">
          <div className="flex w-full">
            <h1 className="text-white font-semibold text-sm uppercase">Dashboard</h1>
          </div>
        </header>

        <div className="grid min-h-[634px]">
          <div className="grid grid-cols-1 md:grid-cols-3 bg-[#474E68] p-4">
            <div id="barang" className="grid content-center w-50 h-16 ml-4 bg-white hover:bg-[#787A91] text-[#404258] hover:text-white active:bg-[#6B728E] transition duration-300 shadow-lg rounded-md mt-2 mb-2">
              <Link to="/Inventory">
                <p className="inventory uppercase text-center p-6 font-semibold">inventory</p>
              </Link>
            </div>
            <div id="order" className="grid content-center w-50 h-16 ml-4 bg-white hover:bg-[#787A91] text-[#404258] hover:text-white active:bg-[#6B728E] transition duration-300 shadow-lg rounded-md mt-2 mb-2">
              <Link to="/Order">
                <p className="order uppercase text-center p-6 font-semibold">order</p>
              </Link>
            </div>
            <div id="supplier" className="grid content-center w-50 h-16 ml-4 bg-white hover:bg-[#787A91] text-[#404258] hover:text-white active:bg-[#6B728E] transition duration-300 shadow-lg rounded-md mt-2 mb-2">
              <Link to="/Supplier">
                <p className="supplier uppercase text-center p-6 font-semibold">supplier</p>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
