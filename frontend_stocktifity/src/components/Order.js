import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";

// Import File
import "./Order.css";
import Footer from "../pages/Footer";
import { OrderContext } from "../context/OrderContext";

// Import Icon

import { AiFillPlusSquare } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { TiCancel } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im";

const Order = () => {
  const { state, handleFunction } = useContext(OrderContext);

  let { showModal, setShowModal, open, setOpen, search, setSearch, order, setOrder, page, setPage, data, setData, fetchStatus, setFetchStatus, currentSku, setCurrentSku, input, setInput } = state;

  let { handleClickOpen, handleClose, sorting, handleInput, handleSubmit, handleEdit, handleDelete } = handleFunction;

  useEffect(() => {
    if (fetchStatus === true) {
      axios
        .get("http://localhost:5000/api/v1/products")
        .then((res) => {
          setData([...res.data]);
        })
        .catch((error) => {
          console.log(error);
        });
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  return (
    <>
      <section className="w-full">
        {/* header */}

        <header className="flex w-full bg-[#6B728E] border-b-2 p-4">
          <div className="flex w-full">
            <h1 className="text-white font-semibold text-sm">Order</h1>
          </div>
        </header>

        {/* main */}

        <div className="flex">
          <div className="flex justify-center w-full min-h-[634px] bg-[#474E68] p-10">
            <div className="w-full sm:-mx-6 lg:-mx-8 bg-[#ffffff] rounded-lg shadow-lg">
              {/* Subtitle */}

              <h2 className="font-bold mt-2 ml-8">List Order</h2>
              <div className="flex justify-between items-center">
                <div className="search ml-8">
                  <label htmlFor="search" className="text-black">
                    Search:
                  </label>
                  <input onChange={(e) => setSearch(e.target.value)} type="search" id="search" name="search" className="w-1/2 border border-black ml-2 shadow-none outline-none focus:outline-none hover:outline-none" />
                </div>
                <div className="btn-create">
                  <button onClick={() => setShowModal(true)} className="flex items-center w-[6rem] bg-[#03C988] text-white mr-8 p-1 rounded shadow-xl hover:bg-[#03C4A1] focus:outline-none">
                    <AiFillPlusSquare size={21} color={"white"} className="mr-2" />
                    Create
                  </button>
                </div>
              </div>

              {/* Table Supplier */}

              <div className="py-2 sm:px-6 lg:px-8">
                <div className="overflow-auto">
                  <table className="min-w-full table-fixed border-collapse border border-slate-300">
                    <thead className="bg-white border-b">
                      <tr>
                        <th onClick={() => sorting("sku")} scope="col" className="border border-slate-300 text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Sku
                        </th>
                        <th scope="col" className="border border-slate-300 text-sm font-medium text-gray-900 px-6 py-4 text-left whitespace-nowrap">
                          Name
                        </th>
                        <th scope="col" className="border border-slate-300 text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Quantity
                        </th>
                        <th scope="col" className="border border-slate-300 text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Category
                        </th>
                        <th scope="col" className="border border-slate-300 text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Date
                        </th>
                        <th scope="col" className="border border-slate-300 text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data !== null &&
                        data
                          .filter((e) => {
                            return search.toLowerCase() === "" ? e : e.sku.toLowerCase().includes(search);
                          })
                          .map((item) => {
                            return (
                              <React.Fragment key={item._id}>
                                <tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                  <td className="border border-slate-300 px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.sku}</td>
                                  <td className="border border-slate-300 text-sm text-gray-900 font-light px-6 py-4">{item.name}</td>
                                  <td className="border border-slate-300 text-sm text-gray-900 font-light px-6 py-4">{item.quantity}</td>
                                  <td className="border border-slate-300 text-sm text-gray-900 font-light px-6 py-4">{item.category}</td>
                                  <td className="border border-slate-300 text-sm text-gray-900 font-light px-6 py-4">
                                    <span className="font-bold">Created : </span>
                                    {moment(item.createdAt).format("DD MMMM YYYY, LT")} <br></br>
                                    <span className="font-bold">Updated : </span>
                                    {moment(item.updatedAt).format("DD MMMM YYYY, LT")}
                                  </td>
                                  <td className="border border-slate-300 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    <button onClick={handleEdit} value={item._id} className="w-10 bg-[#3C84AB] mr-2 p-2 rounded hover:bg-[#6096B4] focus:outline-none">
                                      <FiEdit size={21} color={"white"} className="mx-auto" />
                                    </button>
                                    <button onClick={handleDelete} value={item._id} className="w-10 bg-[#EB455F] p-2 rounded hover:bg-[#C92C6D] focus:outline-none">
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
                  <h2 className="font-semibold text-center text-[#404258] uppercase">Order</h2>
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
                    <div className="w-full sm:flex items-center">
                      <div className="w-full sm:w-1/3">
                        <label className="block font-bold text-[#404258] md:text-left pl-5 sm:pl-5 md:pl-10 pr-14">Quantity</label>
                      </div>
                      <div className="w-full sm:w-1/2 pl-4 pr-4">
                        <input
                          onChange={handleInput}
                          value={input.quantity}
                          min={1}
                          max={1000}
                          type="number"
                          id="quantity"
                          name="quantity"
                          placeholder="0"
                          className="block w-full border-b-2 border-[#6B728E] text-sm pl-2 rounded-md shadow-none focus:bg-[#E4E4E4] focus:border-[#404258] focus:text-black outline-none"
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="w-full sm:flex items-center">
                      <div className="w-full sm:w-1/3">
                        <label className="block font-bold text-[#404258] md:text-left pl-5 sm:pl-5 md:pl-10 pr-14">Sku</label>
                      </div>
                      <div className="w-full sm:w-1/2 pl-4 pr-4">
                        <input
                          onChange={handleInput}
                          value={input.sku}
                          maxLength={8}
                          type="text"
                          id="sku"
                          name="sku"
                          placeholder="A001"
                          className="block w-full border-b-2 border-[#6B728E] text-sm pl-2 rounded-md shadow-none focus:bg-[#E4E4E4] focus:border-[#404258] focus:text-black outline-none"
                          disabled
                        ></input>
                      </div>
                    </div>
                    <div className="w-full sm:flex items-center">
                      <div className="w-full sm:w-1/3">
                        <label className="block font-bold text-[#404258] md:text-left pl-5 sm:pl-5 md:pl-10 pr-14">Category</label>
                      </div>
                      <div className="w-full sm:w-1/2 pl-4 pr-4">
                        <input
                          onChange={handleInput}
                          value={input.category}
                          maxLength={20}
                          type="text"
                          id="category"
                          name="category"
                          placeholder="Input category"
                          className="block w-full border-b-2 border-[#6B728E] text-sm pl-2 rounded-md shadow-none focus:bg-[#E4E4E4] focus:border-[#404258] focus:text-black outline-none"
                          disabled
                        ></input>
                      </div>
                    </div>
                    <div className="w-full sm:flex items-center pt-6 pb-6">
                      <div className="w-full flex justify-center items-center">
                        <button type={"submit"} className="w-[130px] sm:mr-[-5rem] p-1 bg-[#3282B8] text-white shadow-lg rounded-xl hover:outline-none hover:bg-[#5584AC]">
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
    </>
  );
};

export default Order;
