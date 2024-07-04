import { Button } from "antd";

import { Link } from "react-router-dom";
import "./index.scss";
const Header = () => {
  return (
    <div className="header">
      <nav className="header__nav">
        <li>
          <Link to={"/"}>Product List</Link>
        </li>
        <li>
          <Link to={"/product-list-management"}>Product list Management</Link>
        </li>
        <li>
          <Link to={"/add-page"}>
            <Button type="primary">Add New Device</Button>
          </Link>
        </li>
      </nav>
    </div>
  );
};

export default Header;
