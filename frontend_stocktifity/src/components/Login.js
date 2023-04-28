import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

import logo from "../assets/img/logo.png";
import "./Login.css";

// import from MUI
import { Alert, Modal, Box, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

  // Loading Animation
  const [loading, setLoading] = useState(true);

  // Refresh Token
  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/v1/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTimeout(() => {
        setLoading(true);
        navigate("/Dashboard");
      }, 2000);
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setExpire(decoded.exp);
    } catch (error) {
      console.log(error);
      if (error.response) {
        navigate("/Login");
      }
    }
  };

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get("http://localhost:5000/api/v1/users");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/v1/login", { email, password });
      localStorage.setItem("token", response.data.accessToken);
      setSuccess("Login Success");

      setTimeout(() => {
        setSuccess(null);
      }, 2000);

      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data;
        setErrorEmail(errorMessage.messageEmail);
        setErrorPassword(errorMessage.messagePassword);
      }
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
  };

  return (
    <>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </div>
      ) : (
        <div className="container-fluid flex">
          <div className="side-left flex flex-col justify-center bg-[#3282B8] text-white min-h-[560px] h-screen w-[60%]">
            <div className="absolute top-5 right-5">{success && <Alert severity="success">{success}</Alert>}</div>
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
              <h2 className="text-center text-[#EEF1FF] font-bold uppercase">
                <img src={logo} className="w-10 h-10 mx-auto"></img>
              </h2>
              <form onSubmit={handleSubmit} className="form-login w-full p-10">
                <div className="mb-4">
                  <label className="block text-[#EEF1FF] font-medium">Email</label>
                  <input
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full border-b-2 border-[#A7BBC7] pl-2 rounded-md shadow-none focus:bg-[#E3F6F5] focus:border-[#393E46] focus:text-black hover:outline-none"
                    placeholder="Username"
                    required
                  ></input>
                </div>
                {errorEmail && (
                  <Alert sx={{ padding: 0.4 }} variant="filled" severity="error" className="mb-3">
                    {errorEmail}
                  </Alert>
                )}
                <div className="mb-4">
                  <label className="block text-[#EEF1FF] font-medium">Password</label>
                  <input
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                    type="password"
                    name="password"
                    id="password"
                    className="block w-full border-b-2 border-[#A7BBC7] pl-2 rounded-md shadow-none focus:bg-[#E3F6F5] focus:border-[#393E46] focus:text-black hover:outline-none"
                    placeholder="Password"
                    required
                  ></input>
                </div>
                {errorPassword && (
                  <Alert sx={{ padding: 0.4 }} variant="filled" severity="error" className="mb-3">
                    {errorPassword}
                  </Alert>
                )}
                <div className="mb-4">
                  <p className="text-[#EEF1FF]">
                    <Link onClick={handleOpen}>Can't Login?</Link>
                  </p>
                  <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Box sx={style}>
                      <Alert severity="info">Please Contact Admin</Alert>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Whatsapp
                      </Typography>
                    </Box>
                  </Modal>
                </div>
                <div className="text-center">
                  <button type="submit" className="w-[100px] p-1 bg-[#3282B8] text-white shadow-lg rounded-xl hover:outline-none hover:bg-[#5584AC]">
                    Login
                  </button>
                </div>
              </form>
            </div>

            <footer className="side-right-footer w-full min-h-[140px] border-t-2 text-[#EEF1FF]">
              <p className="text-center p-5">Software Development Team</p>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
