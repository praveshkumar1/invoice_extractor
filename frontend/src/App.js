import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./redux/store"; // Import the store
import InvoicesTab from "./components/InvoicesTab";
import ProductsTab from "./components/ProductsTab";
import CustomersTab from "./components/CustomersTab";
import FileUpload from "./components/FileUpload";
import "./App.css"; // Import the styles for better look and feel

const App = () => {
  // State to manage which tab is currently active
  const [activeTab, setActiveTab] = useState("invoices");

  // Function to handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Provider store={store}>
      <div className="App">
        <h1>Invoice Management System</h1>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === "invoices" ? "active" : ""}`}
            onClick={() => handleTabClick("invoices")}
          >
            Invoices
          </button>
          <button
            className={`tab-button ${activeTab === "products" ? "active" : ""}`}
            onClick={() => handleTabClick("products")}
          >
            Products
          </button>
          <button
            className={`tab-button ${activeTab === "customers" ? "active" : ""}`}
            onClick={() => handleTabClick("customers")}
          >
            Customers
          </button>
        </div>

        {/* Render content based on active tab */}
        <div className="tab-content">
          {activeTab === "invoices" && <InvoicesTab />}
          {activeTab === "products" && <ProductsTab />}
          {activeTab === "customers" && <CustomersTab />}
        </div>

        {/* File Upload Component */}
        <div className="file-upload">
          <FileUpload />
        </div>
      </div>
    </Provider>
  );
};

export default App;
