import axios from "axios"
import React, {createContext, useState} from "react"
import swal from "sweetalert"

export const OrderContext = createContext()

export const OrderProvider = props => {
    const [showModal, setShowModal] = useState(false)
    const [open, setOpen] = useState(false)
    const [page, setPage] = useState(1) // Table Pagination
    const [data, setData] = useState([]) // fetching data
    const [fetchStatus, setFetchStatus] = useState(true) // indikator
    const [search, setSearch] = useState("") // Search
    const [currentId, setCurrentId] = useState(-1)

    const handleClickOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    // sort table data
    const [order, setOrder] = useState("ASC")
    const sorting = (col) => {
      if (order === "ASC") {
        const sorted = [...data].sort((a,b) => 
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
        )
        setData(sorted)
        setOrder("DSC")
      }

      if (order === "DSC") {
        const sorted = [...data].sort((a,b) => 
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
        )
        setData(sorted)
        setOrder("ASC")
      }

    }

    // Handling Input
    const [input, setInput] = useState (
      {
          name : "",
          quantity : "",
          sku : "",
          category : ""
      }
    )

    const handleInput = (event) => {
        let name = event.target.name
        let value = event.target.value

        setInput({...input, [name] : value})
    }

    // Handling Submit
    const handleSubmit = (event) => {
      event.preventDefault()

      let { 
        name,
        quantity,
        sku,
        category 
      } = input

      if (currentId === -1) {
        // Created Data
        axios.post("http://localhost:5000/api/v1/products", {name, quantity, sku, category})
        .then((result) => {
            window.location.reload()
            setFetchStatus(true)
            swal(result.data.message)
        }).catch((error)=>{
          alert(error.message)
          console.log(error.message)
        })
      } else {
        // Update Data
        axios.put(`http://localhost:5000/api/v1/products/${currentId}`,{name , quantity, sku, category})
        .then((result)=>{
          // window.location.reload()
          setFetchStatus(true)
          alert(result.data.message)
        }).catch((error)=>{
          console.log(error)
        })
      }

      setCurrentId(-1)

      setInput(
        {
          name: "",
          quantity: "",
          sku: "",
          category: ""
        }
      )
    }

    // Handling Edit
    const handleEdit = (event) => {
      let _idData = event.target.value
      
      setCurrentId(_idData)
      axios.get(`http://localhost:5000/api/v1/products/${_idData}`)
      .then((result) => {
        
        setShowModal(true)
        console.log(_idData)

        setCurrentId(result.data._id)
        setInput(
          {
            name : result.data.name,
            quantity : result.data.quantity,
            sku : result.data.sku,
            category : result.data.category
          }
        )
      })
    }

    // Handling Delete
    const handleDelete = async (event) => {
      try {
        let _idData = event.target.value
        await axios.delete(`http://localhost:5000/api/v1/products/${_idData}`)
        swal({
          title: 'Are you sure?',
          text: "You want to delete this item? this process cannot be undone",
          icon: 'warning',
          dangerMode: true,
          buttons: true,
        }).then((willDelete) => {
          if (willDelete) {
            window.location.reload()
            setFetchStatus(true)
            swal("Item Deleted Successfully", {
              icon: "success",
            })
        } else {

        }
        
      })
    } catch {
      
    }
    }

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
        setInput
    }
    

    let handleFunction = {
        handleClickOpen,
        handleClose,
        sorting,
        handleInput,
        handleSubmit,
        handleEdit,
        handleDelete
    }

    return (
        <OrderContext.Provider value = {{state,handleFunction}}>
            {props.children}
        </OrderContext.Provider>
    )
}
