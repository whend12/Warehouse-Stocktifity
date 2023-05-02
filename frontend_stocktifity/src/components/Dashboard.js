import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import moment from "moment";

// Import Footer
import Footer from "../pages/Footer";

// Import Icon
import { BsFillPersonFill } from "react-icons/bs";

// Import from MUI
import { Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { TablePagination } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  // Loading Animation
  const [loading, setLoading] = useState(true);
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

  // const getUsers = async () => {
  //   const response = await axiosJWT.get("http://localhost:5000/api/v1/users", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   console.log(response.data);
  // };

  const [dataInbound, setDataInbound] = useState([]);
  const [dataOutbound, setDataOutbound] = useState([]);
  const [fetchStatus, setFetchStatus] = useState(true);
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    let fetchSuppliers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/suppliers");
        setSuppliers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (fetchStatus) {
      fetchSuppliers();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  useEffect(() => {
    let fetchDataInbound = async () => {
      try {
        let result = await axios.get("http://localhost:5000/api/v1/products");
        setDataInbound(result.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (fetchStatus) {
      fetchDataInbound();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  const columnsInbound = [
    { id: "sku", label: "SKU" },
    { id: "name", label: "Name" },
    { id: "quantity", label: "Quantity" },
    { id: "category", label: "Category" },
    { id: "Supplier", label: "Supplier" },
    { id: "upadtedAt", label: "Date" },
  ];

  useEffect(() => {
    let fetchDataOutbound = async () => {
      try {
        let result = await axios.get("http://localhost:5000/api/v1/outbound-history");
        setDataOutbound(result.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    if (fetchStatus) {
      fetchDataOutbound();
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  const columnsOutbound = [
    { id: "sku", label: "SKU" },
    { id: "name", label: "Name" },
    { id: "quantity", label: "Quantity" },
    { id: "category", label: "Category" },
    { id: "Supplier", label: "Supplier" },
    { id: "date", label: "Date" },
  ];

  // Sort table data
  const [inboundOrder, inboundSetOrder] = useState("asc");
  const [inboundOrderBy, inboundSetOrderBy] = useState("sku");

  const handleRequestSortInbound = (property) => {
    const isAsc = inboundOrderBy === property && inboundOrder === "asc";
    inboundSetOrder(isAsc ? "desc" : "asc");
    inboundSetOrderBy(property);
  };

  const getComparatorInbound = (inboundOrder, inboundOrderBy) => {
    return inboundOrder === "desc" ? (a, b) => descendingComparatorInbound(a, b, inboundOrderBy) : (a, b) => -descendingComparatorInbound(a, b, inboundOrderBy);
  };

  const descendingComparatorInbound = (a, b, inboundOrderBy) => {
    if (b[inboundOrderBy] < a[inboundOrderBy]) {
      return -1;
    }
    if (b[inboundOrderBy] > a[inboundOrderBy]) {
      return 1;
    }
    return 0;
  };

  const stableSortInbound = (array, comparatorInbound) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparatorInbound(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  // Sort Table Data Outbound
  const [outboundOrder, outboundSetOrder] = useState("asc");
  const [outboundOrderBy, outboundSetOrderBy] = useState("sku");
  
  const handleRequestSortOutbound = (property) => {
    const isAsc = outboundOrderBy === property && outboundOrder === "asc";
    outboundSetOrder(isAsc ? "desc" : "asc");
    outboundSetOrderBy(property);
  };

  const getComparatorOutbound = (outboundOrder, outboundOrderBy) => {
    return outboundOrder === "desc" ? (a, b) => descendingComparatorOutbound(a, b, outboundOrderBy) : (a, b) => -descendingComparatorOutbound(a, b, outboundOrderBy);
  };

  const descendingComparatorOutbound = (a, b, outboundOrderBy) => {
    if (b[outboundOrderBy] < a[outboundOrderBy]) {
      return -1;
    }
    if (b[outboundOrderBy] > a[outboundOrderBy]) {
      return 1;
    }
    return 0;
  };

  const stableSortOutbound = (array, comparatorOutbound) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparatorOutbound(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  // Table Pagination outbound
  const [pageInbound, setPageInbound] = useState(0);
  const [rowsPerPageInbound, setRowsPerPageInbound] = useState(5);

  const handleChangePageInbound = (event, newPage) => {
    setPageInbound(newPage);
  };

  const handleChangeRowsPerPageInbound = (event) => {
    setRowsPerPageInbound(parseInt(event.target.value, 10));
    setPageInbound(0);
  };

  // Table Pagination Outbound
  const [pageOutbound, setPageOutbound] = useState(0);
  const [rowsPerPageOutbound, setRowsPerPageOutbound] = useState(5);

  const handleChangePageOutbound = (event, newPage) => {
    setPageOutbound(newPage);
  };

  const handleChangeRowsPerPageOutbound = (event) => {
    setRowsPerPageOutbound(parseInt(event.target.value, 10));
    setPageOutbound(0);
  };

  // Search Inbound
  const [searchInbound, setSearchInbound] = useState("");
  const filteredDataInbound = dataInbound.filter(
    (row) => row.sku.toLowerCase().includes(searchInbound.toLowerCase()) || row.name.toLowerCase().includes(searchInbound.toLowerCase()) || row.Supplier?.name.toLowerCase().includes(searchInbound.toLowerCase())
  );

  // Search Outbound
  const [searchOutbound, setSearchOutbound] = useState("");
  const filteredDataOutbound = dataOutbound.filter(
    (row) => row.product.sku.toLowerCase().includes(searchOutbound.toLowerCase()) || row.product.name.toLowerCase().includes(searchOutbound.toLowerCase()) || row.product.Supplier?.name.toLowerCase().includes(searchOutbound.toLowerCase())
  );

  return (
    <>
     {loading ? (
      <div className="w-full">
        <header className="flex w-full bg-[#6B728E] border-b-2 p-4">
          <div className="flex w-full">
            <h1 className="text-white font-semibold text-sm uppercase">Dashboard</h1>
          </div>
        </header>

        <div className="flex">
          <div className="flex flex-col justify-center w-full min-h-[634px] bg-[#474E68] p-10">
            {/* Inbound History */}
            <div className="mb-5 bg-[#ffffff] rounded-lg shadow-lg">
              {/* Subtitle */}
              <h2 className="font-bold mt-4 ml-8 text-xl uppercase">Inbound History</h2>
              <div className="flex items-center">
                <div className="search ml-8">
                  <label htmlFor="search" className="text-black">
                    Search:
                  </label>
                  <input
                    onChange={(e) => setSearchInbound(e.target.value)}
                    value={searchInbound}
                    type="search"
                    id="search"
                    name="search"
                    placeholder="Search..."
                    className="w-1/2 border border-black rounded-lg ml-2 pl-2 shadow-none outline-none focus:outline-none hover:outline-none"
                  />
                  {/* <span className="px-2"><SearchSharpIcon/></span> */}
                </div>
              </div>
              <div className="py-2 sm:px-6 lg:px-8">
                <div className="overflow-auto">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                      <TableHead>
                        <TableRow>
                          {columnsInbound.map((column) => (
                            <TableCell key={column._id} sortDirection={inboundOrderBy === column.id ? inboundOrder : false}>
                              <TableSortLabel hideSortIcon direction={inboundOrderBy === column.id ? inboundOrder : "asc"} onClick={() => handleRequestSortInbound(column.id)}>
                                <span className="font-bold">{column.label}</span>
                              </TableSortLabel>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stableSortInbound(dataInbound && filteredDataInbound, getComparatorInbound(inboundOrder, inboundOrderBy), (a, b) => moment(b.date) - moment(a.date))
                          .slice(pageInbound * rowsPerPageInbound, pageInbound * rowsPerPageInbound + rowsPerPageInbound)
                          .map((row) => (
                            <TableRow key={row.id}>
                              <TableCell>{row.sku}</TableCell>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.quantity}</TableCell>
                              <TableCell>{row.category}</TableCell>
                              <TableCell>{row.Supplier?.name}</TableCell>
                              <TableCell>
                                <span className="font-bold">Updated : </span>
                                {moment(row.updatedAt).format("DD MMMM YYYY, LT")} <br></br>
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
                  count={dataInbound.length}
                  rowsPerPage={rowsPerPageInbound}
                  page={Math.max(0, Math.min(pageInbound, Math.ceil(dataInbound.length / rowsPerPageInbound) - 1))}
                  onPageChange={handleChangePageInbound}
                  onRowsPerPageChange={handleChangeRowsPerPageInbound}
                />
              </div>
            </div>

            {/* Outbound History */}
            <div className="bg-[#ffffff] rounded-lg shadow-lg">
              {/* Subtitle */}
              <h2 className="font-bold mt-4 ml-8 text-xl uppercase">Outbound History</h2>
              <div className="flex items-center">
                <div className="search ml-8">
                  <label htmlFor="search" className="text-black">
                    Search:
                  </label>
                  <input
                    onChange={(e) => setSearchOutbound(e.target.value)}
                    value={searchOutbound}
                    type="search"
                    id="search"
                    name="search"
                    placeholder="Search..."
                    className="w-1/2 border border-black rounded-lg ml-2 pl-2 shadow-none outline-none focus:outline-none hover:outline-none"
                  />
                </div>
              </div>
              <div className="py-2 sm:px-6 lg:px-8">
                <div className="overflow-auto">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                      <TableHead>
                        <TableRow>
                        {columnsOutbound.map((column) => (
                            <TableCell key={column._id} sortDirection={outboundOrderBy === column.id ? outboundOrder : false}>
                              <TableSortLabel hideSortIcon direction={outboundOrderBy === column.id ? outboundOrder : "asc"} onClick={() => handleRequestSortOutbound(column.id)}>
                                <span className="font-bold">{column.label}</span>
                              </TableSortLabel>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {stableSortOutbound(dataOutbound && filteredDataOutbound, getComparatorOutbound(outboundOrder, outboundOrderBy), (a, b) => moment(b.date) - moment(a.date))
                          .slice(pageOutbound * rowsPerPageOutbound, pageOutbound * rowsPerPageOutbound + rowsPerPageOutbound)
                          .map((row) => (
                            <TableRow key={row.id}>
                              <TableCell>{row.product.sku}</TableCell>
                              <TableCell>{row.product.name}</TableCell>
                              <TableCell>{row.quantity}</TableCell>
                              <TableCell>{row.product.category}</TableCell>
                              <TableCell>{row.product.supplierId?.name}</TableCell>
                              <TableCell>
                                <span className="font-bold">Created : </span>
                                {moment(row.date).format("DD MMMM YYYY, LT")} <br></br>
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
                  count={dataOutbound.length}
                  rowsPerPage={rowsPerPageOutbound}
                  page={Math.max(0, Math.min(pageOutbound, Math.ceil(dataOutbound.length / rowsPerPageOutbound) - 1))}
                  onPageChange={handleChangePageOutbound}
                  onRowsPerPageChange={handleChangeRowsPerPageOutbound}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default Dashboard;
