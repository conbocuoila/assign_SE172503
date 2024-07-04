import { Button, Image } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./index.scss";
const ProductDetails = () => {
  const { id } = useParams();
  const [value, setValue] = useState({});
  useEffect(() => {
    let timeId = setInterval(() => {
      axios
        .get("https://667d255b297972455f63b481.mockapi.io/Products/" + id)
        .then((res) => {
          setValue({
            ...value,
            name: res.data.name,
            description: res.data.description,
            price: res.data.price,
            currentPrice: res.data.currentPrice,
            image: res.data.image,
          });
        });
    }, 1000);
    return () => {
      clearInterval(timeId);
    };
  }, []);
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate("/");
  };
  const handleNavigateEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  //   const formatPrice = (price) => {
  //     return price
  //       .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
  //       .replace("VND", " đ");
  //   };
  return (
    <div className="product-details">
      <div className="product-details__container">
        <h1>{value.name}</h1>
        <div className="img">
          <Image src={value.image} width={200} />
        </div>
        <p className="description">{value.description}</p>
        <p className="price">Price: {value.price?.toLocaleString()} đ</p>

        <p className="current-price">
          Current Price: {value.currentPrice?.toLocaleString()} đ
        </p>
        <p className="discount">Discount: 20%</p>
        <div className="product-details__button">
          <Button onClick={handleNavigateHome} type="primary">
            Back Home
          </Button>
          <Button onClick={() => handleNavigateEdit(id)} type="primary" danger>
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
