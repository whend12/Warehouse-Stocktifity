import React, { useEffect, useContext } from "react";
import axios from "axios";
import moment from "moment";

// Import File
import "./Order.css";
import Footer from "../pages/Footer";
import { OrderContext } from "../context/OrderContext";

// Import Icon
import { AiFillPlusSquare } from "react-icons/ai";
import { GiConfirmed } from "react-icons/gi";
import { TiCancel } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

// Import from MUI
import { Alert } from "@mui/material";
import { TablePagination } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

const Order = () => {
  const { state, handleFunction } = useContext(OrderContext);

  let {
    showModal,
    setShowModal,
    open,
    setOpen,
    search,
    setSearch,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    page,
    setPage,
    dataPending,
    setDataPending,
    dataProducts,
    setDataProducts,
    fetchStatus,
    setFetchStatus,
    currentSku,
    setCurrentSku,
    input,
    setInput,
    error,
    setError,
    success,
    setSuccess,
    errorName,
    setErrorName,
    errorSku,
    setErrorSku,
    rowsPerPage,
    setRowsPerPage,
    suppliers,
    setSuppliers,
  } = state;

  let {
    handleClickOpen,
    handleClose,
    handleInput,
    handleSelect,
    handleSubmit,
    handleConfirm,
    handleDelete,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    getComparator,
    descendingComparator,
    stableSort,
    handleSupplierSelect,
  } = handleFunction;

  useEffect(() => {
    let fetchDataPending = async () => {
      try {
        let result = await axios.get("http://localhost:5000/api/v1/pending");
        setDataPending(result.data.pendingProducts);
      } catch (error) {
        console.log(error);
      }
    };

    if (fetchStatus) {
      fetchDataPending();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  useEffect(() => {
    let fetchDataProducts = async () => {
      try {
        let result = await axios.get("http://localhost:5000/api/v1/products");
        setDataProducts(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (fetchStatus) {
      fetchDataProducts();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  useEffect(() => {
    let fetchSuppliers = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/v1/suppliers");
        setSuppliers(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (fetchStatus) {
      fetchSuppliers();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  const columns = [
    { id: "sku", label: "SKU" },
    { id: "name", label: "Name" },
    { id: "quantity", label: "Quantity" },
    { id: "category", label: "Category" },
    { id: "Supplier", label: "Supplier" },
    { id: "date", label: "Date" },
    { id: "confirmed", label: "Status" },
    { id: "action", label: "Action" },
  ];

  const filteredData =
    dataPending && Array.isArray(dataPending)
      ? dataPending.filter((row) => row.sku.toLowerCase().includes(search.toLowerCase()) || row.name.toLowerCase().includes(search.toLowerCase()) || row.Supplier?.name.toLowerCase().includes(search.toLowerCase()))
      : [];

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
              <div className="fixed top-5 right-5">
                {success || error && <Alert severity={success ? "success" : "error"}>{success || error}</Alert>}
              </div>

              <h2 className="font-bold mt-4 ml-8 text-xl text-center uppercase">Order</h2>
              <div className="flex justify-between items-center">
                <div className="search ml-8">
                  <label htmlFor="search" className="text-black">
                    Search:
                  </label>
                  <input
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    type="search"
                    id="search"
                    name="search"
                    placeholder="Search..."
                    className="w-1/2 border border-black rounded-lg ml-2 pl-2 shadow-none outline-none focus:outline-none hover:outline-none"
                  />
                  {/* <span className="px-2"><SearchSharpIcon/></span> */}
                </div>
                <div className="btn-create">
                  <button onClick={() => setShowModal(true)} className="flex items-center w-[6rem] bg-[#03C988] text-white mr-8 p-1 rounded shadow-xl hover:bg-[#03C4A1] focus:outline-none">
                    <AiFillPlusSquare size={21} color={"white"} className="mr-2" />
                    Create
                  </button>
                </div>
              </div>

              {/* Table Order */}

              <div className="py-2 sm:px-6 lg:px-8">
                <div className="overflow-auto">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell key={column._id} sortDirection={orderBy === column.id ? order : false}>
                              <TableSortLabel hideSortIcon direction={orderBy === column.id ? order : "asc"} onClick={() => handleRequestSort(column.id)}>
                                <span className="font-bold">{column.label}</span>
                              </TableSortLabel>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stableSort(filteredData, getComparator(order, orderBy))
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <TableRow key={row._id}>
                              <TableCell>{row.sku}</TableCell>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.quantity}</TableCell>
                              <TableCell>{row.category}</TableCell>
                              <TableCell>{row.Supplier?.name}</TableCell>
                              <TableCell>
                                <span className="font-bold">Created : </span>
                                {moment(row.createdAt).format("DD MMMM YYYY, LT")} <br></br>
                                <span className="font-bold">Updated : </span>
                                {moment(row.updatedAt).format("DD MMMM YYYY, LT")}
                              </TableCell>
                              <TableCell>{row.confirmed ? "confirmed" : "pending"}</TableCell>
                              <TableCell className="whitespace-nowrap">
                                <button onClick={() => handleConfirm(row._id)} className="w-10 bg-[#43ABAC] mr-2 p-2 rounded hover:bg-[#6096B4] focus:outline-none">
                                  <GiConfirmed size={21} color={"white"} className="mx-auto" />
                                </button>
                                <button onClick={() => handleDelete(row._id)} className="w-10 bg-[#EB455F] p-2 rounded hover:bg-[#C92C6D] focus:outline-none">
                                  <TiCancel size={21} color={"white"} className="mx-auto" />
                                </button>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 15]}
                  component="div"
                  count={dataPending.length}
                  rowsPerPage={rowsPerPage}
                  page={Math.max(0, Math.min(page, Math.ceil(dataPending.length / rowsPerPage) - 1))}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
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
            <div className="absolute top-5 right-5">{success && <Alert severity="success">{success}</Alert>}</div>
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
                        <label className="block font-bold text-[#404258] md:text-left pl-5 sm:pl-5 md:pl-10 pr-14">Sku</label>
                      </div>
                      <div className="w-full sm:w-1/2 pl-4 pr-4">
                        <select
                          onChange={handleSelect}
                          value={input.sku}
                          id="sku"
                          name="sku"
                          className="block w-full border-b-2 border-[#6B728E] text-sm pl-2 rounded-md shadow-none focus:bg-[#E4E4E4] focus:border-[#404258] focus:text-black outline-none"
                          required
                        >
                          <option value="">-- Select sku --</option>
                          {dataProducts.map((product) => (
                            <option key={product._id} value={product.sku}>
                              {product.sku}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
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
                          disabled
                        ></input>
                      </div>
                    </div>
                    {errorName && (
                      <Alert sx={{ padding: 0.4, width: 275, height: 44, background: "none" }} severity="error" className="ml-10">
                        {errorName}
                      </Alert>
                    )}
                    <div className="w-full sm:flex items-center">
                      <div className="w-full sm:w-1/3">
                        <label className="block font-bold text-[#404258] md:text-left pl-5 sm:pl-5 md:pl-10 pr-14">Quantity</label>
                      </div>
                      <div className="w-full sm:w-1/2 pl-4 pr-4">
                        <input
                          onChange={handleInput}
                          value={input.quantity}
                          min={1}
                          max={100000}
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
                    <div className="w-full sm:flex items-center">
                      <div className="w-full sm:w-1/3">
                        <label className="block font-bold text-[#404258] md:text-left pl-5 sm:pl-5 md:pl-10 pr-14">Supplier</label>
                      </div>
                      <div className="w-full sm:w-1/2 pl-4 pr-4">
                        <input
                          onChange={handleInput}
                          value={input.Supplier?.name}
                          maxLength={20}
                          type="text"
                          id="supplier"
                          name="supplier"
                          placeholder="Input supplier"
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
