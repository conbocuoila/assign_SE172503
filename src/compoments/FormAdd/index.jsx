import { Form, Image, Input, InputNumber, Modal, Upload, message } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../utils/upload";
import { useDispatch } from "react-redux";
import { setReload } from "../../redux/feature/reloadSlice";
const AddPage = () => {
  const [open, setOpen] = useState(true);
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (value) => {
    const url = await uploadFile(value.image.file.originFileObj);
    value.image = url;
    axios.post("https://667d255b297972455f63b481.mockapi.io/Products", value);
    form.resetFields();
    setOpen(false);
    // navigate("/product-list-management");
    dispatch(setReload(true));
    navigate("/");
    message.success("Add successfully");
  };
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  {
    previewImage && (
      <Image
        wrapperStyle={{
          display: "none",
        }}
        preview={{
          visible: previewOpen,
          onVisibleChange: (visible) => setPreviewOpen(visible),
          afterOpenChange: (visible) => !visible && setPreviewImage(""),
        }}
        src={previewImage}
      />
    );
  }
  return (
    <div>
      <Modal
        onCancel={() => {
          setOpen(false), navigate("/");
        }}
        onOk={() => form.submit()}
        open={open}
        title="Create New Device"
      >
        <Form onFinish={handleSubmit} form={form} labelCol={{ span: 24 }}>
          <Form.Item
            label="Name"
            name={"name"}
            rules={[
              {
                required: true,
                message: "Please input name!!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name={"description"}
            rules={[
              {
                required: true,
                message: "Please input description!!",
              },
            ]}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Price"
            name={"price"}
            rules={[
              {
                required: true,
                message: "Please input price!!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Current"
            name={"currentPrice"}
            rules={[
              {
                required: true,
                message: "Please input currentPrice!!",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            label="Image"
            name={"image"}
            rules={[
              {
                required: true,
                message: "Please upload image!!",
              },
            ]}
          >
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddPage;
