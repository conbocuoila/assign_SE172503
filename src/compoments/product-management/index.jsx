import { Button, Popconfirm, Table, message } from "antd";
import axios from "axios";

import { useEffect, useState } from "react";

const ProductManagement = () => {
  const [dataSource, setDataSource] = useState([]);
  const fetchData = async () => {
    const response = await axios.get(
      "https://667d255b297972455f63b481.mockapi.io/Products"
    );
    setDataSource(response.data);
  };
  useEffect(() => {
    let timeId = setInterval(() => {
      fetchData();
    }, 1000);
    return () => {
      clearInterval(timeId);
    };
  }, []);
  const handleDelete = async (id) => {
    const response = await axios.delete(
      `https://667d255b297972455f63b481.mockapi.io/Products/${id}`
    );
    console.log(response);
    setDataSource(dataSource.filter((item) => item.id != id));
    message.success("Delete successfully");
  };
  // const handleNavigateDetails = (id) => {
  //   navigate(`/product-details/${id}`);
  // };
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => {
        return (
          <p style={{ textDecoration: "line-through" }}>
            {price?.toLocaleString()} đ
          </p>
        );
      },
    },
    {
      title: "Current Price",
      dataIndex: "currentPrice",
      key: "currentPrice",
      render: (currentPrice) => {
        return <p>{currentPrice?.toLocaleString()} đ</p>;
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <Popconfirm
            title="Delete the device"
            description="Are you sure to delete this device?"
            onConfirm={() => handleDelete(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
          {/* <Button onClick={() => handleNavigateDetails(id)} type="primary" danger>
            Edit
          </Button> */}
        </div>
      ),
    },
  ];
  return <Table columns={columns} dataSource={dataSource} />;
};

export default ProductManagement;
