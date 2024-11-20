import React from 'react';
import { useSelector } from 'react-redux';

const CustomersTab = () => {
  const invoiceData = useSelector((state) => state.file.data);

  if (!invoiceData) {
    return <p>No data available. Please upload a file.</p>;
  }

  return (
    <div>
      <h2>Customer Details</h2>
      <p>Name: {invoiceData.customer.name}</p>
      <p>Phone: {invoiceData.customer.phone}</p>
      {/* Render other customer details... */}
    </div>
  );
};

export default CustomersTab;
