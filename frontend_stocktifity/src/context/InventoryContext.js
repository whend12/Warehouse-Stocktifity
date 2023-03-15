import axios from "axios";
import React, { createContext, useState } from "react";
import swal from "sweetalert";

export const InventoryContext = createContext();

export const InventoryProvider = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1); // Table Pagination
  const [data, setData] = useState(null); // fetching data
  const [fetchStatus, setFetchStatus] = useState(true); // indikator
  const [search, setSearch] = useState(""); // Search
  const [currentId, setCurrentId] = useState(-1);

  // handleError
  const [errorName, setErrorName] = useState("");
  const [errorSku, setErrorSku] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // sort table data
  const [order, setOrder] = useState("ASC");
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) => (a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1));
      setData(sorted);
      setOrder("DSC");
    }

    if (order === "DSC") {
      const sorted = [...data].sort((a, b) => (a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1));
      setData(sorted);
      setOrder("ASC");
    }
  };

  // Handling Input
  const [input, setInput] = useState({
    name: "",
    quantity: "",
    sku: "",
    category: "",
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    setInput({ ...input, [name]: value });
  };

  // Handling Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    let { name, quantity, sku, category } = input;

    try {
      if (currentId === -1) {
        // Create Data
        const result = await axios.post("http://localhost:5000/api/v1/products", { name, quantity, sku, category });
        window.location.reload();
        setFetchStatus(true);
        swal(result.data.message);
      } else {
        // Update Data
        const result = await axios.put(`http://localhost:5000/api/v1/products/${currentId}`, { name, quantity, sku, category });
        setFetchStatus(true);
        alert(result.data.message);
      }

      setInput({
        name: "",
        quantity: "",
        sku: "",
        category: "",
      });

      setCurrentId(-1);
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data;
        setErrorName(errorMessage.messageName);
        setErrorSku(errorMessage.messageSku);
      }
    }
  };

  // Handling Edit
  const handleEdit = async (_idData) => {
    console.log(_idData);

    try {
      const res = await axios.get(`http://localhost:5000/api/v1/products/${_idData}`);
      setShowModal(true);
      setCurrentId(res.data._id);
      setInput({ ...input, name: res.data.name, quantity: res.data.quantity, sku: res.data.sku, category: res.data.category });
    } catch (error) {
      console.log(error);
    }
  };

  // Handling Delete
  const handleDelete = async (_idData) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/products/${_idData}`);
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

  // const handleDelete = async (event) => {
  //   try {
  //     let skuData = String(event.target.value)
  //     axios.delete(`http://localhost:5000/api/v1/products/${skuData}`)
  //     swal({
  //       title: 'Are you sure?',
  //       text: "You want to delete this item? this process cannot be undone",
  //       icon: 'warning',
  //       dangerMode: true,
  //       buttons: true,
  //     }).then((willDelete) => {
  //       if (willDelete) {
  //         window.location.reload()
  //         setFetchStatus(true)
  //         swal("Item Deleted Successfully", {
  //           icon: "success",
  //         })
  //     } else {

  //     }
  //   })
  //   } catch {
  //     console.log("error")
  //   }
  // }

  let state = {
    showModal,
    setShowModal,
    open,
    setOpen,
    search,
    setSearch,
    order,
    setOrder,
    page,
    setPage,
    data,
    setData,
    fetchStatus,
    setFetchStatus,
    input,
    setInput,
    errorName,
    setErrorName,
    errorSku,
    setErrorSku,
  };

  let handleFunction = {
    handleClickOpen,
    handleClose,
    sorting,
    handleInput,
    handleSubmit,
    handleEdit,
    handleDelete,
  };

  return <InventoryContext.Provider value={{ state, handleFunction }}>{props.children}</InventoryContext.Provider>;
};
