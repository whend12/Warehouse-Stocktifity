import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

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
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("token") !== null
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <OrderProvider>
        <InventoryProvider>
          <SupplierProvider>
            <Routes>
              {/* Route Login */}
              <Route
                path="Login"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" />
                  ) : (
                    <Login setIsAuthenticated={setIsAuthenticated} />
                  )
                }
              />

              {/* Route Dashboard */}
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Sidebar handleLogout={handleLogout}>
                      <Dashboard />
                    </Sidebar>
                  ) : (
                    <Navigate to="/Login" />
                  )
                }
              >
                <Route path="/" element={<Dashboard />} />
                <Route path="Dashboard" element={<Dashboard />} />
                <Route path="Inventory" element={<Inventory />} />
                <Route path="Order" element={<Order />} />
                <Route path="Supplier" element={<Supplier />} />
              </Route>
            </Routes>
          </SupplierProvider>
        </InventoryProvider>
      </OrderProvider>
    </Router>
  );
};

export default App;