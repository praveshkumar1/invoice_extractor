import React from 'react';
import { useSelector } from 'react-redux';

const InvoicesTab = () => {
  const invoiceData = useSelector((state) => state.file.data);

  if (!invoiceData) {
    return <p>No data available. Please upload a file.</p>;
  }

  return (
    <div>
      <h2>Invoice Details</h2>
      <p>Invoice Number: {invoiceData.number}</p>
      <p>Date: {invoiceData.date}</p>
      {/* Render other invoice details... */}
    </div>
  );
};

export default InvoicesTab;
