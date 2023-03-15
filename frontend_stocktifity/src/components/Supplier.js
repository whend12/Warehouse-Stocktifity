import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

// Import Footer
import Footer from "../pages/Footer";

// Import Icon

import { AiFillPlusSquare } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { TiCancel } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im";

// Import Dialog

import Dialog from "@mui/material/Dialog";
import { Alert } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import { SupplierContext } from "../context/SupplierContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Supplier = () => {
  const { state, handleFunction } = useContext(SupplierContext);

  let { showModal, setShowModal, open, setOpen, data, setData, fetchStatus, setFetchStatus, currentId, setCurrentId, input, setInput, errorName, setErrorName, errorEmail, setErrorEmail, errorPhone, setErrorPhone } = state;

  let { handleClickOpen, handleClose, handleInput, handleSubmit, handleEdit, handleDelete } = handleFunction;

  useEffect(() => {
    if (fetchStatus === true) {
      axios
        .get("http://localhost:5000/api/v1/suppliers")
        .then((res) => {
          setData([...res.data]);
        })
        .catch((error) => {});
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  return (
    <>
      <section className="w-full">
        {/* header */}

        <header className="flex w-full bg-[#6B728E] border-b-2 p-4">
          <div className="flex w-full">
            <h1 className="text-white font-semibold text-sm">Supplier</h1>
          </div>
        </header>

        {/* main */}

        <div className="flex">
          <div className="flex justify-center w-full min-h-[634px] bg-[#474E68] p-10">
            <div className="w-full sm:-mx-6 lg:-mx-8 bg-[#ffffff] rounded-lg">
              {/* Subtitle */}

              <h2 className="font-bold mt-2 ml-8">List Supplier</h2>
              <div className="flex justify-between items-center">
                <div className="search ml-8">
                  <label htmlFor="search" className="text-black">
                    Search:
                  </label>
                  <input type="search" id="search" name="search" className="w-1/2 border border-black ml-2 shadow-none outline-none focus:outline-none hover:outline-none" />
                </div>
                <div className="btn-create">
                  <button onClick={() => setShowModal(true)} className="flex items-center w-[6rem] bg-[#03C988] text-white mr-8 p-1 rounded hover:bg-[#03C4A1] focus:outline-none">
                    <AiFillPlusSquare size={21} color={"white"} className="mr-2" />
                    Create
                  </button>
                </div>
              </div>

              {/* Table Supplier */}

              <div className="py-2 overflow-auto sm:px-6 lg:px-8">
                <table className="min-w-full table-fixed border-collapse border border-slate-300">
                  <thead className="bg-white border-b">
                    <tr>
                      <th scope="col" className="border border-slate-300 text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        No
                      </th>
                      <th scope="col" className="border border-slate-300 text-sm font-medium text-gray-900 px-6 py-4 text-left whitespace-nowrap">
                        Name
                      </th>
                      <th scope="col" className="border border-slate-300 text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Email
                      </th>
                      <th scope="col" className="border border-slate-300 text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Phone
                      </th>
                      <th scope="col" className="border border-slate-300 text-sm font-medium text-gray-900 px-6 py-4 text-left">
                        Address
                      </th>
                      <th scope="col" className="border border-slate-300 text-sm font-medium text-gray-900 px-6 py-4 text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data !== null &&
                      data.map((item, index) => {
                        return (
                          <React.Fragment key={item._id}>
                            <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                              <td className="border border-slate-300 px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">{index + 1}</td>
                              <td className="border border-slate-300 text-sm text-gray-900 font-light px-6 py-4">{item.name}</td>
                              <td className="border border-slate-300 text-sm text-gray-900 font-light px-6 py-4">{item.email}</td>
                              <td className="border border-slate-300 text-sm text-gray-900 font-light px-6 py-4">{item.phone}</td>
                              <td className="border border-slate-300 text-sm text-gray-900 font-light px-6 py-4">{item.address}</td>
                              <td className="border border-slate-300 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                <button onClick={() => handleEdit(item._id)} value={item._id} className="w-10 bg-[#3C84AB] mr-2 p-2 rounded hover:bg-[#6096B4] focus:outline-none">
                                  <FiEdit size={21} color={"white"} className="mx-auto" />
                                </button>
                                <button onClick={() => handleDelete(item._id)} value={item._id} className="w-10 bg-[#EB455F] p-2 rounded hover:bg-[#C92C6D] focus:outline-none">
                                  <TiCancel size={21} color={"white"} className="mx-auto" />
                                </button>
                              </td>
                            </tr>
                          </React.Fragment>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-col items-center w-full px-4 py-2 space-y-2 text-sm text-gray-500 sm:justify-between sm:space-y-0 sm:flex-row">
                <p className="flex">
                  Showing&nbsp;<span className="font-bold"> 1 to 5 </span>&nbsp;of 5 entries
                </p>
                <div className="flex items-center justify-between space-x-2">
                  <a href="#" className="hover:text-gray-600">
                    Previous
                  </a>
                  <div className="flex flex-row space-x-1">
                    <div className="flex px-2 py-px text-white bg-blue-400 border border-blue-400">1</div>
                    <div className="flex px-2 py-px border border-blue-400 hover:bg-blue-400 hover:text-white">2</div>
                  </div>
                  <a href="#" className="hover:text-gray-600">
                    Next
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </section>

      {/* Modal Create & Action */}

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}

                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h2 className="font-semibold text-center text-[#404258] uppercase">supplier</h2>
                  <button onClick={() => setShowModal(false)} className="w-1 shadow-none focus:outline-none">
                    <ImCancelCircle fill="#D61355" />
                  </button>
                </div>

                {/*body*/}

                <div className="relative flex-auto">
                  <form onSubmit={handleSubmit} className="bg-white rounded-md w-50">
                    <div className="w-full sm:flex items-center">
                      <div className="w-full sm:w-1/3">
                        <label className="block font-bold text-[#404258] md:text-left pl-5 sm:pl-5 md:pl-10 pr-14">Name</label>
                      </div>
                      <div className="w-full sm:w-1/2 pl-4 pr-4">
                        <input
                          onChange={handleInput}
                          value={input.name}
                          maxLength={20}
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Input name"
                          className="block w-full border-b-2 border-[#6B728E] text-sm pl-2 rounded-md shadow-none focus:bg-[#E4E4E4] focus:border-[#404258] focus:text-black outline-none"
                          required
                        ></input>
                      </div>
                    </div>
                    {errorName && (
                      <Alert sx={{ padding: 0, width: 275, height: 56, background: "none" }} severity="error" className="ml-10">
                        {errorName}
                      </Alert>
                    )}
                    <div className="w-full sm:flex items-center">
                      <div className="w-full sm:w-1/3">
                        <label className="block font-bold text-[#404258] md:text-left pl-5 sm:pl-5 md:pl-10 pr-14">Email</label>
                      </div>
                      <div className="w-full sm:w-1/2 pl-4 pr-4">
                        <input
                          onChange={handleInput}
                          value={input.email}
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Example@example.com"
                          className="block w-full border-b-2 border-[#6B728E] text-sm pl-2 rounded-md shadow-none focus:bg-[#E4E4E4] focus:border-[#404258] focus:text-black outline-none"
                          required
                        ></input>
                      </div>
                    </div>
                    {errorEmail && (
                      <Alert sx={{ padding: 0, width: 275, height: 56, background: "none" }} severity="error" className="ml-10">
                        {errorEmail}
                      </Alert>
                    )}
                    <div className="w-full sm:flex items-center">
                      <div className="w-full sm:w-1/3">
                        <label className="block font-bold text-[#404258] md:text-left pl-5 sm:pl-5 md:pl-10 pr-14">Phone</label>
                      </div>
                      <div className="w-full sm:w-1/2 pl-4 pr-4">
                        <input
                          onChange={handleInput}
                          value={input.phone}
                          maxLength={8}
                          type="number"
                          name="phone"
                          id="phone"
                          placeholder="628987654888"
                          className="block w-full border-b-2 border-[#6B728E] text-sm pl-2 rounded-md shadow-none focus:bg-[#E4E4E4] focus:border-[#404258] focus:text-black outline-none"
                          required
                        ></input>
                      </div>
                    </div>
                    {errorPhone && (
                      <Alert sx={{ padding: 0, width: 275, height: 56, background: "none" }} severity="error" className="ml-10">
                        {errorPhone}
                      </Alert>
                    )}
                    <div className="w-full sm:flex items-center">
                      <div className="w-full sm:w-1/3">
                        <label className="block font-bold text-[#404258] md:text-left pl-5 sm:pl-5 md:pl-10 pr-14">Address</label>
                      </div>
                      <div className="w-full sm:w-1/2 pl-4 pr-4">
                        <input
                          onChange={handleInput}
                          value={input.address}
                          maxLength={50}
                          type="text"
                          name="address"
                          id="address"
                          placeholder="Input address"
                          className="block w-full border-b-2 border-[#6B728E] text-sm pl-2 rounded-md shadow-none focus:bg-[#E4E4E4] focus:border-[#404258] focus:text-black outline-none"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="w-full sm:flex items-center pt-6 pb-6">
                      <div className="w-full flex justify-center items-center">
                        <button onClick={() => setShowModal(true)} type={"submit"} className="w-[130px] sm:mr-[-5rem] p-1 bg-[#3282B8] text-white shadow-lg rounded-xl hover:outline-none hover:bg-[#5584AC]">
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>

                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {/* Dialog Cancel */}

      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          <strong>Are you sure you want to delete?</strong>
        </Alert>
        <DialogActions>
          <button onClick={handleClose} className="bg-[#EB455F] rounded hover:bg-[#C92C6D] focus:outline-none">
            Yes
          </button>
          <button onClick={handleClose} className="bg-[#FFED00] rounded hover:bg-[#F9F54B] focus:outline-none">
            No
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Supplier;
