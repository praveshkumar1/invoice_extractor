import React from 'react';
import { useSelector } from 'react-redux';

const InvoicesTab = () => {
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
      <h2>Invoice Details</h2>
      <p>Invoice Number: {getDisplayValue(invoiceData.number || invoiceData.invoice_number)}</p>
      <p>Date: {getDisplayValue(invoiceData.date || invoiceData.invoice_date)}</p>
    </div>
  );
};

export default InvoicesTab;
