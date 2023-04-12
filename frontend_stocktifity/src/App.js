import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Components
import Login from "./components/Login";
import Sidebar from "./pages/Sidebar";
import Dashboard from "./components/Dashboard";
import Inventory from "./components/Inventory";
import Order from "./components/Order";
import Supplier from "./components/Supplier";

// Import useContext
import { InventoryProvider } from "./context/InventoryContext";
import { SupplierProvider } from "./context/SupplierContext";
import { OrderProvider } from "./context/OrderContext";
import Header from "./pages/Header";

const App = () => {
  return (
    <Router>
      <OrderProvider>
        <InventoryProvider>
          <SupplierProvider>
            <Routes>
              <Route path="Login" element={<Login />} />

              <Route
                path="/"
                element={<Sidebar />}
                children={
                  <>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="Dashboard" element={<Dashboard />} />
                    <Route path="Inventory" element={<Inventory />} />
                    <Route path="Order" element={<Order />} />
                    <Route path="Supplier" element={<Supplier />} />
                    <Route path="Header" element={<Header/>}/>
                  </>
                }
              />
            </Routes>
          </SupplierProvider>
        </InventoryProvider>
      </OrderProvider>
    </Router>
  );
};

export default App;
