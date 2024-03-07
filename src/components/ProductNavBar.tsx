import { Button } from "antd";
import { CiCirclePlus } from "react-icons/ci";

export default function ProductNavBar() {
  return (
    <div>
      <h1>Products</h1>
      <Button type="link">
        <CiCirclePlus />
        Add new product
      </Button>
    </div>
  );
}
