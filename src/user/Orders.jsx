import React from "react";
import Layout from "../components/layouts/Layout";
import UserMenu from "../components/layouts/UserMenu";
import { Table, Tag } from "antd";

const Orders = () => {
  // Define columns for the table
  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        if (status === "Delivered") {
          color = "green";
        } else if (status === "Shipped") {
          color = "blue";
        } else if (status === "Processing") {
          color = "orange";
        } else {
          color = "red";
        }
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Order Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Total Amount",
      dataIndex: "total",
      key: "total",
    },
  ];
  // src/ordersData.js

  const ordersData = [
    {
      id: "ORD001",
      productName: "Wireless Headphones",
      status: "Shipped",
      date: "2024-10-25",
      total: "$99.99",
    },
    {
      id: "ORD002",
      productName: "Smart Watch",
      status: "Processing",
      date: "2024-10-26",
      total: "$199.99",
    },
    {
      id: "ORD003",
      productName: "Bluetooth Speaker",
      status: "Delivered",
      date: "2024-10-20",
      total: "$49.99",
    },
    {
      id: "ORD004",
      productName: "Laptop Stand",
      status: "Canceled",
      date: "2024-10-15",
      total: "$29.99",
    },
  ];

  return (
    <Layout title={"Dashboard - Orders"}>
      <div className="container-fluid m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 p-3">
            <h2 className="mb-4">All Orders</h2>
            <Table
              dataSource={ordersData}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 5 }} // Change page size as needed
              bordered
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
