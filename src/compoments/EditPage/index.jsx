import { Form, Input, InputNumber, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPage = () => {
  const { id } = useParams();
  const [value, setValue] = useState({});
  const [form] = useForm();
  useEffect(() => {
    axios
      .get("https://667d255b297972455f63b481.mockapi.io/Products/" + id)
      .then((res) => {
        setValue({
          ...value,
          name: res.data.name,
          description: res.data.description,
          price: res.data.price,
          currentPrice: res.data.currentPrice,
        });
        form.setFieldsValue({
          name: res.data.name,
          description: res.data.description,
          price: res.data.price,
          currentPrice: res.data.currentPrice,
        });
      });
  }, []);
  const navigate = useNavigate();
  const handleUpdateForm = (values) => {
    axios.put(
      `https://667d255b297972455f63b481.mockapi.io/Products/${id}`,
      values
    );
    setOpen(false);
    navigate("/product-details/" + id);
  };
  console.log(id);
  const [open, setOpen] = useState(true);
  return (
    <Modal
      onCancel={() => {
        setOpen(false), navigate("/product-details/" + id);
      }}
      onOk={() => form.submit()}
      open={open}
      title="Edit product"
    >
      <Form onFinish={handleUpdateForm} form={form} labelCol={{ span: 24 }}>
        <Form.Item
          label="Name"
          name={"name"}
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Input
            name="name"
            value={value.name}
            onChange={(e) => setValue({ ...value, name: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="Description"
          name={"description"}
          rules={[
            {
              required: true,
              message: "Description is required",
            },
          ]}
        >
          <Input
            name="description"
            value={value.description}
            onChange={(e) =>
              setValue({ ...value, description: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Price"
          name={"price"}
          rules={[
            {
              required: true,
              message: "Price is required",
            },
          ]}
        >
          <InputNumber
            name="price"
            value={value.price}
            onChange={(e) => setValue({ ...value, price: e.target.value })}
          />
        </Form.Item>
        <Form.Item
          label="Current Price"
          name={"currentPrice"}
          rules={[
            {
              required: true,
              message: "CurrentPrice is required",
            },
          ]}
        >
          <InputNumber
            name="currentPrice"
            value={value.currentPrice}
            onChange={(e) =>
              setValue({ ...value, currentPrice: e.target.value })
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditPage;
