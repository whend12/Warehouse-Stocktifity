import axios from "axios"
import React, {createContext, useState} from "react"

export const SupplierContext = createContext()

export const SupplierProvider = props => {
    const [showModal, setShowModal] = useState(false)
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(null) // Fetching Data
    const [fetchStatus, setFetchStatus] = useState(true) // Indikator
    const [currentId, setCurrentId] = useState(-1)

    const handleClickOpen = () => {
        setOpen(true)
      }
  
      const handleClose = () => {
        setOpen(false)
      }

    // Handling Input
    const [input, setInput] = useState (
        {
            name : "",
            email : "",
            phone : "",
            address : ""
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
        email,
        phone,
        address 
      } = input

      // Created Data
      axios.post("http://localhost:5000/api/v1/suppliers", {name, email, phone, address})
      .then((res) => {
        setFetchStatus(true) 
        alert(res.data.message)
      }).catch((res) => {
        alert(res.data.error)
      })

      setInput(
        {
          name: "",
          email: "",
          phone: "",
          address: ""
        }
      )
  }

    // Handling Edit
    const handleEdit = (event) => {
      let _idData = event.target.value
      setShowModal(true)
      setCurrentId(_idData)
      axios.get(`http://localhost:5000/api/v1/suppliers/${_idData}`)
      .then((res) => {
        console.log(res)

        let data = res.data._id

        setInput(
            {
                name : res.data.name,
                email : res.data.email,
                phone : res.data.phone,
                address : res.data.address
            }
        )
        console.log(setInput)
      })
    }

    // const handleEdit = async (event) => {
    //   try {
    //     let _idData = event.target.value
    //     setCurrentId(_idData)            
    //     const resp = await axios.get(`http://localhost:5000/api/v1/suppliers/${_idData}`)
        
    //     if (resp.data === null) {
    //       // Handle case where data is null
    //       console.log("Data not found")
    //       return;
    //     }
        
    //     console.log(resp.data)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

    // Handling Delete
    const handleDelete = (event) => {
      let _idData = event.target.value
      axios.delete(`http://localhost:5000/api/v1/suppliers/${_idData}`)
      .then((res) => {
        setFetchStatus(true)
      })
    }

    let state = {
        showModal,
        setShowModal,
        open,
        setOpen,
        data,
        setData,
        fetchStatus,
        setFetchStatus,
        currentId,
        setCurrentId,
        input,
        setInput
    }

    let handleFunction = {
        handleClickOpen,
        handleClose,
        handleInput,
        handleSubmit,
        handleEdit,
        handleDelete
    }

    return (
        <SupplierContext.Provider value = {{state, handleFunction}}>
            {props.children}
        </SupplierContext.Provider>
    )
}