import React from 'react';
import { useSelector } from 'react-redux';

const CustomersTab = () => {
  const invoiceData = useSelector((state) => state.file.data);

  if (!invoiceData) {
    return <p>No data available. Please upload a file.</p>;
  }

  
  const getDisplayValue = (value) =>
    value ? (
      value
    ) : (
      <span style={{ color: 'red' }}>Not Present</span>
    );

  return (
    <div>
      <h2>Customer Details</h2>
      <p>Name: {getDisplayValue(invoiceData.customer.name)}</p>
      <p>Phone: {getDisplayValue(invoiceData.customer.phone)}</p>
      <p>GST: {getDisplayValue(invoiceData.customer.gst || invoiceData.customer.gst_number)}</p>
    </div>
  );
};

export default CustomersTab;
