import './App.css'
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './pages/Sidebar'
import Dashboard from './components/Dashboard'
import Admin from './pages/Admin'
import Inventory from './components/Inventory'
import Order from './components/Order'
import Supplier from './components/Supplier'
import Home from './pages/Home'
import Orderdata from './components/Orderdata'
import { InventoryProvider } from './context/InventoryContext'
import { SupplierProvider } from './context/SupplierContext'

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <InventoryProvider>
        <SupplierProvider>
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="Admin" element={<Admin/>}/>
            <Route path="Dashboard" index element={<Dashboard/>}/>
            <Route path='Inventory' element={<Inventory/>}/>
            <Route path="Order" element={<Order/>}/>
            <Route path="Supplier" element={<Supplier/>}/>
            <Route path='OrderData' element={<Orderdata/>}/>
            <Route path="*" element={<Home/>}/>
          </Routes>
        </SupplierProvider>
        </InventoryProvider>
      </Sidebar>
    </BrowserRouter>
  )
}

export default App;
