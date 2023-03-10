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
import { OrderProvider } from './context/OrderContext'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="Login" element={<Login/>}/>
      </Routes>
      
      <Sidebar>
        <OrderProvider>
        <InventoryProvider>
        <SupplierProvider>
          <Routes>
            <Route exact path="/" element={<Dashboard/>}/>
            <Route path="Dashboard" element={<Dashboard/>}/>
            <Route path="Inventory" element={<Inventory/>}/>
            <Route path="Order" element={<Order/>}/>
            <Route path="Supplier" element={<Supplier/>}/>
            <Route path="OrderData" element={<Orderdata/>}/>
          </Routes>
        </SupplierProvider>
        </InventoryProvider>
        </OrderProvider>
      </Sidebar>
    </Router>
  )
}

export default App;
