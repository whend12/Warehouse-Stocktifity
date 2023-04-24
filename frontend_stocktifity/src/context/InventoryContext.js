import axios from "axios";
import React, { createContext, useState } from "react";
import swal from "sweetalert";

export const InventoryContext = createContext();

export const InventoryProvider = (props) => {
  const [showModal, setShowModal] = useState(false); // modal input
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]); // fetching data
  const [fetchStatus, setFetchStatus] = useState(true); // indikator
  const [currentId, setCurrentId] = useState(-1);

  // Search
  const [search, setSearch] = useState("");

  // Handle Success
  const [success, setSuccess] = useState("");

  // Handle Error
  const [errorName, setErrorName] = useState("");
  const [errorSku, setErrorSku] = useState("");

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

  // Handling Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    let { name, quantity, sku, category, Supplier } = input;

    try {

      const supplierId = suppliers.find((supplier) => supplier.name === Supplier)?._id;

      if (currentId === -1) {
        // Create Data
        const result = await axios.post("http://localhost:5000/api/v1/products", { name, quantity, sku, category, Supplier: supplierId });
        setFetchStatus(true);
        setSuccess(result.data.message);
        setTimeout(() => {
          window.location.reload();
          setSuccess(null);
        }, 4000);
      } else {
        // Update Data
        const result = await axios.put(`http://localhost:5000/api/v1/products/${currentId}`, { name, quantity, sku, category, Supplier: supplierId });
        setFetchStatus(true);
        setSuccess(result.data.message);
        setTimeout(() => {
          setSuccess(null);
        }, 4000);
      }

      setInput({
        name: "",
        quantity: "",
        sku: "",
        category: "",
        Supplier: "",
      });

      setCurrentId(-1);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data;
        setErrorName(errorMessage.messageName);
        setErrorSku(errorMessage.messageSku);
        console.log(error.response.data);
      }
    }
  };

  // Handling Edit
  const [edit, setEdit] = useState(false);

  const handleEdit = async (_id) => {
    console.log(_id);

    try {
      const res = await axios.get(`http://localhost:5000/api/v1/products/${_id}`);
      setShowModal(true);
      setEdit(true);
      setCurrentId(res.data._id);
      setInput({ ...input, name: res.data.name, quantity: res.data.quantity, sku: res.data.sku, category: res.data.category, Supplier: res.data.Supplier });
    } catch (error) {
      console.log(error);
    }
  };

  // Handling Delete
  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/products/${_id}`);
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
    errorSku,
    setErrorSku,
    rowsPerPage,
    setRowsPerPage,
    suppliers,
    setSuppliers,
    edit,
    setEdit,
  };

  let handleFunction = {
    handleClickOpen,
    handleClose,
    handleInput,
    handleSubmit,
    handleEdit,
    handleDelete,
    handleChangePage,
    handleChangeRowsPerPage,
    handleRequestSort,
    getComparator,
    descendingComparator,
    stableSort,
  };

  return <InventoryContext.Provider value={{ state, handleFunction }}>{props.children}</InventoryContext.Provider>;
};
