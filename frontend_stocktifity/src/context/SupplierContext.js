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

      if (currentId === -1) {
        // Created Data
        axios.post("http://localhost:5000/api/v1/suppliers", {name, email, phone, address})
        .then((res) => {
          setFetchStatus(true) 
          alert(res.data.message)
        }).catch((result) => {
          alert(result.error)
          console.log(result.error)
        })
      } else {
        // Update Data
        axios.put(`http://localhost:5000/api/v1/suppliers/${currentId}`, {name, email, phone, address})
        .then((res)=>{
          setFetchStatus(true)
          alert(res.data.message)
        })
      }

      setCurrentId(-1)

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

      setCurrentId(_idData)
      axios.get(`http://localhost:5000/api/v1/suppliers/${_idData}`)
      .then((res) => {
        console.log(res)
        setShowModal(true)
        
        setCurrentId(_idData)
        setInput(
            {
                name : res.data.name,
                email : res.data.email,
                phone : res.data.phone,
                address : res.data.address
            }
        )
      })
    }

    // const handleEdit = async (event) => {
    //     try {
    //         let idData = event.target.id
    //         setCurrentId(idData)            
    //         const resp = await axios.get(`http://localhost:5000/api/v1/suppliers/${idData}`)
    //         console.log(resp.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // Handling Delete
    const handleDelete = (event) => {
      let _idData = event.target.value
      axios.delete(`http://localhost:5000/api/v1/suppliers/${_idData}`)
      .then((res) => {
        setFetchStatus(true)
        alert(res.data.message)
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