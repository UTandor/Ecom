import axios from "axios";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const ProductView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://coveee.netlify.app/.netlify/functions/api/products"
    );
    console.log(response.data.products[id - 1]);
    setProduct(response.data.products[id - 1]);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="h-screen">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-primary-foreground px-6 /40">
        <div className="w-full flex-row">
          <ShoppingBag className="ml-auto" />
        </div>
      </header>
      <div className="w-full grid grid-cols-2 h-full">
        <div className="bg-gray-200 w-full h-3/4">
          <LazyLoadImage
            alt={product.name}
            className="  bg-cover w-full h-full"
            src={product.imgSrc}
            loading="lazy"
            id={`image-${product.id}`}
          />
        </div>
        <div className="bg-blue-200 w-full h-3/4"></div>
      </div>
    </div>
  );
};

export default ProductView;
