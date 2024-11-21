import React from 'react';
import { useSelector } from 'react-redux';

const ProductsTab = () => {
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
      <h2>Products</h2>
      {invoiceData.products && invoiceData.products.map((item, index) => (
        <div key={index}>
          <p>Product: {getDisplayValue(item.description)}</p>
          <p>Quantity: {getDisplayValue(item.quantity)}</p>
          <p>GST :{getDisplayValue(item.gst)}</p>
          <p>GST Rate :{getDisplayValue(item.gst_rate)}</p>
          <p>Amount : {getDisplayValue(item.amount)}</p>
          <p>Rate:{getDisplayValue(item.rate)}</p>
          <p>Taxable Value :{getDisplayValue(item.taxable_value)}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsTab;
