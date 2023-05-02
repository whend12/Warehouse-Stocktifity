import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

// Import File
import Footer from "../pages/Footer";
import { SupplierContext } from "../context/SupplierContext";

// Import Icon
import { AiFillPlusSquare } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { TiCancel } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";

// Import Dialog
// import Dialog from "@mui/material/Dialog";
// import { Alert } from "@mui/material";
// import AlertTitle from "@mui/material/AlertTitle";
// import DialogActions from "@mui/material/DialogActions";
// import Slide from "@mui/material/Slide";

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

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const Supplier = () => {
  const { state, handleFunction } = useContext(SupplierContext);

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
    rowsPerPage,
    setRowsPerPage,
    data,
    setData,
    fetchStatus,
    setFetchStatus,
    input,
    setInput,
    edit,
    setEdit,
    success,
    setSuccess,
    errorName,
    setErrorName,
    errorEmail,
    setErrorEmail,
    errorPhone,
    setErrorPhone,
  } = state;

  let { handleClickOpen, handleClose, handleInput, handleSubmit, handleCreate, handleEdit, handleDelete, handleRequestSort, getComparator, descendingComparator, stableSort, handleChangePage, handleChangeRowsPerPage } = handleFunction;

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const navigate = useNavigate();

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
        setName(decoded.name);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    let fetchData = async () => {
      try {
        let result = await axios.get("http://localhost:5000/api/v1/suppliers");
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (fetchStatus) {
      fetchData();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  const columns = [
    { id: "no", label: "No" },
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "address", label: "Address" },
    { id: "action", label: "Action" },
  ];

  const filteredData = data !== null ? data.filter((row) => (row.no && row.no.toLowerCase().includes(search.toLowerCase())) || (row.name && row.name.toLowerCase().includes(search.toLowerCase()))) : null;

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
            <div className="w-full sm:-mx-6 lg:-mx-8 bg-[#ffffff] rounded-lg shadow-lg">
              {/* Subtitle */}

              <h2 className="font-bold mt-4 ml-8 text-xl text-center uppercase">Supplier</h2>
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
                  <button onClick={handleCreate} className="flex items-center w-[6rem] bg-[#03C988] text-white mr-8 p-1 rounded shadow-xl hover:bg-[#03C4A1] focus:outline-none">
                    <AiFillPlusSquare size={21} color={"white"} className="mr-2" />
                    Create
                  </button>
                </div>
              </div>

              {/* Table Supplier */}

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
                        {filteredData &&
                          stableSort(filteredData, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => (
                              <TableRow key={row.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell className="whitespace-nowrap">
                                  <button onClick={() => handleEdit(row._id)} className="w-10 bg-[#3C84AB] mr-2 p-2 rounded hover:bg-[#6096B4] focus:outline-none">
                                    <FiEdit size={21} color={"white"} className="mx-auto" />
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
                  count={data ? data.length : 0}
                  rowsPerPage={rowsPerPage}
                  page={Math.max(0, Math.min(page, Math.ceil(data ? data.length : 0 / rowsPerPage) - 1))}
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
                          className="block w-full border-b-2 border-[#6B728E] text-sm pl-2 rounded-md shadow-none focus:bg-[#E4E4E4] focus:border-[#404258] focus:text-black outline-none capitalize"
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
                          className="block w-full border-b-2 border-[#6B728E] text-sm pl-2 rounded-md shadow-none focus:bg-[#E4E4E4] focus:border-[#404258] focus:text-black outline-none capitalize"
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

      {/* <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
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
      </Dialog> */}
    </>
  );
};

export default Supplier;
