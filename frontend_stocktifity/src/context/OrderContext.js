import axios from "axios";
import React, { createContext, useState } from "react";
import swal from "sweetalert";

export const OrderContext = createContext();

export const OrderProvider = (props) => {
  const [showModal, setShowModal] = useState(false); // modal input
  const [open, setOpen] = useState(false);
  const [dataPending, setDataPending] = useState([]); // fetching data
  const [dataProducts, setDataProducts] = useState(); // fetching data Products
  const [fetchStatus, setFetchStatus] = useState(true); // indikator
  const [currentId, setCurrentId] = useState(-1);

  // Search
  const [search, setSearch] = useState("");

  // Handle Success
  const [success, setSuccess] = useState(null);

  // Handle Error
  const [error, setError] = useState("");
  const [errorName, setErrorName] = useState("");
  const [errorSku, setErrorSku] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handling Input
  const [suppliers, setSuppliers] = useState([]);

  const [input, setInput] = useState({
    name: "",
    quantity: "",
    sku: "",
    category: "",
    Supplier: "",
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setInput({ ...input, [name]: value });
  };

  const handleSelect = (event) => {
    let sku = event.target.value;
    let selectedProduct = dataProducts.find((product) => product.sku === sku);
    console.log(selectedProduct.Supplier);
    setInput({...selectedProduct, quantity: 0});
  };

  // Handling Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    let { name, quantity, sku, category, Supplier } = input;

    try {
      const supplierId = suppliers.find((supplier) => supplier.name === Supplier)?._id;

      if (currentId === -1) {
        // Create Data
        const result = await axios.post("http://localhost:5000/api/v1/pending", { name, quantity, sku, category, Supplier: supplierId || input.Supplier });
        setFetchStatus(true);
        setSuccess("Success Create");
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }

      setInput({
        name: "",
        sku: "",
        quantity: "",
        category: "",
        Supplier: "",
      });

      setCurrentId(-1);
    } catch (error) {
      console.log(error.message);
      if (error.response) {
        const errorMessage = error.response.data;
        setErrorName(errorMessage.messageName);
        setErrorSku(errorMessage.messageSku);
      }
    }
  };

  // Handling Confirm
  const handleConfirm = async (_id) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/v1/outbond/${_id}`);
      setFetchStatus(true);
      setSuccess(response.data.message);
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    } catch (error) {
      if (error.response) {
        setError(error.response.data);
        // setTimeout(() => {
        //   setError(null);
        // }, 2000);
      }
    }
  };

  // Handling Delete
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/pending/${_id}`);
      swal({
        title: "Are you sure?",
        text: "You want to delete this item? this process cannot be undone",
        icon: "warning",
        dangerMode: true,
        buttons: true,
      }).then((willDelete) => {
        if (willDelete) {
          setFetchStatus(true);
          swal("Item Deleted Successfully", {
            icon: "success",
          });
        } else {
        }
      });
    } catch (error) {
      console.log(error.message);
    }
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
    dataPending,
    setDataPending,
    dataProducts,
    setDataProducts,
    fetchStatus,
    setFetchStatus,
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
  };

  let handleFunction = {
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
  };

  return <OrderContext.Provider value={{ state, handleFunction }}>{props.children}</OrderContext.Provider>;
};
