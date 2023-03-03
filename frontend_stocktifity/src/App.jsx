import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Sidebar from './pages/Sidebar'
import Dashboard from './components/Dashboard'
import Inventory from './components/Inventory'
import Order from './components/Order'
import Supplier from './components/Supplier'
import Orderdata from './components/Orderdata'
import { InventoryProvider } from './context/InventoryContext'
import { SupplierProvider } from './context/SupplierContext'

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Login/>}/> */}
        <Route path="Login" element={<Login/>}/>
      </Routes>

      <Sidebar>
        <InventoryProvider>
        <SupplierProvider>
          <Routes>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="Dashboard" index element={<Dashboard/>}/>
            <Route path="Inventory" element={<Inventory/>}/>
            <Route path="Order" element={<Order/>}/>
            <Route path="Supplier" element={<Supplier/>}/>
            <Route path="OrderData" element={<Orderdata/>}/>
          </Routes>
        </SupplierProvider>
        </InventoryProvider>
      </Sidebar>
    </Router>
  )
}

export default App;
