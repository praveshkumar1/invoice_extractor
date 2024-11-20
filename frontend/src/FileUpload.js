import React, { useState } from "react";

const FileUpload = () => {
  const [data, setData] = useState(null);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/process-file", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process the file.");
      }

      const result = await response.json();
      console.log("Processed Data:", result);
      setData(result.invoice); // Set the invoice data in state
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred while processing the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>File Upload and Processing</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept=".pdf" />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Upload"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {data && (
        <div key={JSON.stringify(data)}> {/* Force re-render */}
          <h2>Invoice Details</h2>
          <p>Invoice Number: {data.number}</p>
          <p>Date: {data.date}</p>

          <h3>Supplier Details</h3>
          <p>Name: {data.supplier.name}</p>
          <p>GST: {data.supplier.gst}</p>
          <p>Address: {data.supplier.address}</p>
          <p>Phone: {data.supplier.mobile}</p>
          <p>Email: {data.supplier.email}</p>

          <h3>Customer Details</h3>
          <p>Name: {data.customer.name}</p>
          <p>GST: {data.customer.gst}</p>
          <p>Phone: {data.customer.phone}</p>

          <h3>Items</h3>
          {data.items.map((item, index) => (
            <div key={index}>
              <p>Item: {item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Unit Price: {item.unitPrice}</p>
              <p>Tax: {item.tax}</p>
              <p>Price With Tax: {item.priceWithTax}</p>
            </div>
          ))}

          <h3>Total</h3>
          <p>Total Items: {data.total_items}</p>
          <p>Total Quantity: {data.total_quantity}</p>
          <p>Total Amount: {data.total}</p>
          <p>Amount Payable: {data.amount_payable}</p>

          <h3>Amount in Words</h3>
          <p>{data.amount_in_words}</p>

          <h3>Bank Details</h3>
          <p>Bank: {data.bank_details.bank}</p>
          <p>Account Number: {data.bank_details.account_number}</p>
          <p>IFSC Code: {data.bank_details.ifsc_code}</p>
          <p>Branch: {data.bank_details.branch}</p>
          <p>Beneficiary Name: {data.bank_details.beneficiary_name}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
