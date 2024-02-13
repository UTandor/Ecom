import { useParams } from "react-router-dom";

const ProductView = () => {
  const { id } = useParams();
  return <div>View data of {id}</div>;
};

export default ProductView;
