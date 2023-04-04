import axios from "axios";
import React, { createContext, useState } from "react";
import swal from "sweetalert";

export const SupplierContext = createContext();

export const SupplierProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null); // fetching data
  const [fetchStatus, setFetchStatus] = useState(true); // indikator
  const [search, setSearch] = useState(""); // Search
  const [currentId, setCurrentId] = useState(-1);

  // Handle Success
  const [success, setSuccess] = useState("");

  // handleError
  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // // sort table data
  // const [order, setOrder] = useState("ASC");
  // const sorting = (col) => {
  //   if (order === "ASC") {
  //     const sorted = [...data].sort((a, b) => (a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1));
  //     setData(sorted);
  //     setOrder("DSC");
  //   }

  //   if (order === "DSC") {
  //     const sorted = [...data].sort((a, b) => (a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1));
  //     setData(sorted);
  //     setOrder("ASC");
  //   }
  // };

  // Handling Input
  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setInput({ ...input, [name]: value });
  };

  // Handling Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    let { name, email, phone, address } = input;

    try {
      if (currentId === -1) {
        // Create Data
        const result = await axios.post("http://localhost:5000/api/v1/suppliers", { name, email, phone, address });
        setFetchStatus(true);
        setSuccess(result.data.message);
      } else {
        // Update Data
        const result = await axios.put(`http://localhost:5000/api/v1/suppliers/${currentId}`, { name, email, phone, address });
        setFetchStatus(true);
        setSuccess(result.data.message);
      }

      setInput({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

      setCurrentId(-1);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data;
        setErrorName(errorMessage.messageName);
        setErrorEmail(errorMessage.messageEmail);
        setErrorPhone(errorMessage.messagePhone);
      }
    }
  };

  // Handling Edit
  const handleEdit = async (_idData) => {
    console.log(_idData);

    try {
      const res = await axios.get(`http://localhost:5000/api/v1/suppliers/${_idData}`);
      setShowModal(true);
      setCurrentId(res.data._id);
      setInput({ ...input, name: res.data.name, email: res.data.email, phone: res.data.phone, address: res.data.address });
    } catch (error) {
      console.log(error);
    }
  };

  // Handling Delete
  const handleDelete = async (_idData) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/suppliers/${_idData}`);
      swal({
        title: "Are you sure?",
        text: "You want to delete this item? this process cannot be undone",
        icon: "warning",
        dangerMode: true,
        buttons: true,
      }).then((willDelete) => {
        if (willDelete) {
          window.location.reload();
          setFetchStatus(true);
          swal("Item Deleted Successfully", {
            icon: "success",
          });
        } else {
        }
      });
    } catch {}
  };

  // Sort table data
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("sku");

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const getComparator = (order, orderBy) => {
    return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  // Table Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let state = {
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
    success,
    setSuccess,
    errorName,
    setErrorName,
    errorEmail,
    setErrorEmail,
    errorPhone,
    setErrorPhone,
  };

  let handleFunction = {
    handleClickOpen,
    handleClose,
    handleInput,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleRequestSort,
    getComparator,
    descendingComparator,
    stableSort,
    handleChangePage,
    handleChangeRowsPerPage,
  };

  return <SupplierContext.Provider value={{ state, handleFunction }}>{props.children}</SupplierContext.Provider>;
};
