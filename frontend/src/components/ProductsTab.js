import React from 'react';
import { useSelector } from 'react-redux';

const ProductsTab = () => {
  const invoiceData = useSelector((state) => state.file.data);

  if (!invoiceData) {
    return <p>No data available. Please upload a file.</p>;
  }

  return (
    <div>
      <h2>Products</h2>
      {invoiceData.items && invoiceData.items.map((item, index) => (
        <div key={index}>
          <p>Product: {item.name}</p>
          <p>Quantity: {item.quantity}</p>
          {/* Render other product details... */}
        </div>
      ))}
    </div>
  );
};

export default ProductsTab;
