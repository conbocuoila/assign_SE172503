import { Button, Image } from "antd";
import axios from "axios";
import { useEffect } from "react";
import "./index.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add, clearAll } from "../../redux/feature/listproductSlice";
import { setReload } from "../../redux/feature/reloadSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  // const [dataSource, setDataSource] = useState([]);
  const reload = useSelector((store) => store.reload);

  const fetchData = async () => {
    const response = await axios.get(
      "https://667d255b297972455f63b481.mockapi.io/Products"
    );
    response.data.forEach((item) => dispatch(add(item)));
    // setDataSource(response.data);
  };
  useEffect(() => {
    if (reload) {
      dispatch(clearAll());
      fetchData().then(() => {
        dispatch(setReload(false));
      });
    } else {
      dispatch(clearAll());
      fetchData();
    }
  }, [reload]);

  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/product-details/${id}`);
  };
  const dataSource = useSelector((store) => store.listproduct);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        background: "#ccc",
        color: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Product List</h2>
      {dataSource.length >= 1 ? (
        <div className="productList">
          {dataSource.map((item) => {
            return (
              <div className="productList__wrapper" key={item.id}>
                <div className="productList__image">
                  <Image src={item.image} width={200} preview={false} />
                </div>
                <div className="productList__content">
                  <h1>{item.name}</h1>
                  <p className="description">{item.description}</p>
                  <p className="price">{item.price?.toLocaleString()} đ</p>
                  <p className="current-price">
                    {item.currentPrice?.toLocaleString()} đ
                  </p>
                </div>
                <div className="productList__button">
                  <Button
                    onClick={() => handleNavigate(item.id)}
                    type="primary"
                    danger
                  >
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p style={{ textAlign: "center" }} className="noproduct">
          No products found.
        </p>
      )}
    </div>
  );
};

export default ProductList;
