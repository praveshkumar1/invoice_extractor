import React from 'react';
import { useSelector } from 'react-redux';

const Tabs = () => {
  const { invoices, products, customers } = useSelector((state) => state.data);
  const [activeTab, setActiveTab] = React.useState('invoices');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'invoices':
        return <DataTable data={invoices} columns={['Serial', 'Customer', 'Total']} />;
      case 'products':
        return <DataTable data={products} columns={['Name', 'Qty', 'Price']} />;
      case 'customers':
        return <DataTable data={customers} columns={['Name', 'Phone', 'Total Purchase']} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <nav>
        <button onClick={() => setActiveTab('invoices')}>Invoices</button>
        <button onClick={() => setActiveTab('products')}>Products</button>
        <button onClick={() => setActiveTab('customers')}>Customers</button>
      </nav>
      <div>{renderTabContent()}</div>
    </div>
  );
};

const DataTable = ({ data, columns }) => (
  <table>
    <thead>
      <tr>
        {columns.map((col) => (
          <th key={col}>{col}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          {columns.map((col) => (
            <td key={col}>{row[col.toLowerCase()] || ''}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

export default Tabs;
