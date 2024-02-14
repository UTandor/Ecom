import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ProductView = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://coveee.netlify.app/.netlify/functions/api/products"
    );
    console.log(response.data.products[id - 1]);
    setProduct(response.data.products[id - 1]);
    setProducts(response.data.products);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-primary-foreground px-6 /40">
        <div className="w-full flex-row justify-between"></div>
      </header>
      <div className="grid md:grid-cols-2 items-start max-w-6xl px-4 mx-auto gap-6 lg:gap-12 py-6">
        <div className="grid gap-4 md:gap-10 items-start">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
            <p className="text-2xl font-bold">Rs. {product.price}</p>
            <div className="grid gap-4 text-sm leading-loose md:text-base">
              <p>Category: {product.category}</p>
            </div>
            <div className="grid gap-4 text-sm leading-loose md:text-base">
              <p>{product.description}</p>
            </div>
            <form className="grid gap-4 md:gap-10">
              <div className="grid gap-2">
                <Label className="text-base" htmlFor="color">
                  Color
                </Label>
                <RadioGroup
                  className="flex items-center gap-2"
                  defaultValue="black"
                  id="color"
                >
                  <Label
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor="color-black"
                  >
                    <RadioGroupItem id="color-black" value="black" />
                    Black
                  </Label>
                  <Label
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor="color-white"
                  >
                    <RadioGroupItem id="color-white" value="white" />
                    White
                  </Label>
                  <Label
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor="color-blue"
                  >
                    <RadioGroupItem id="color-blue" value="blue" />
                    Blue
                  </Label>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label className="text-base" htmlFor="size">
                  Size
                </Label>
                <RadioGroup
                  className="flex items-center gap-2"
                  defaultValue="m"
                  id="size"
                >
                  <Label
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor="size-xs"
                  >
                    <RadioGroupItem id="size-xs" value="xs" />
                    XS
                  </Label>
                  <Label
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor="size-s"
                  >
                    <RadioGroupItem id="size-s" value="s" />S
                  </Label>
                  <Label
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor="size-m"
                  >
                    <RadioGroupItem id="size-m" value="m" />M
                  </Label>
                  <Label
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor="size-l"
                  >
                    <RadioGroupItem id="size-l" value="l" />L
                  </Label>
                  <Label
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor="size-xl"
                  >
                    <RadioGroupItem id="size-xl" value="xl" />
                    XL
                  </Label>
                </RadioGroup>
              </div>
              <div className="grid gap-2">
                <Label className="text-base" htmlFor="quantity">
                  Quantity
                </Label>
                <Select defaultValue="1">
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button size="lg">Add to cart</Button>
            </form>
          </div>
        </div>
        <div className="grid gap-6 md:gap-3 items-start">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            <LazyLoadImage
              alt={product.name}
              width={600}
              height={600}
              className=" bg-cover rounded-lg w-full h-full"
              src={product.imgSrc}
              loading="lazy"
              style={{
                objectFit: "cover",
                filter: "blur(20px)",
                transition: "filter 0.5s ease",
              }}
              onLoad={(event) => {
                event.target.style.filter = "blur(0px)";
              }}
            />
            <LazyLoadImage
              alt={product.name}
              width={600}
              height={600}
              className=" bg-cover rounded-lg w-full h-full"
              src={product.imgSrc}
              loading="lazy"
              style={{
                objectFit: "cover",
                filter: "blur(20px)",
                transition: "filter 0.5s ease",
              }}
              onLoad={(event) => {
                event.target.style.filter = "blur(0px)";
              }}
            />
            <LazyLoadImage
              alt={product.name}
              width={600}
              height={600}
              className=" bg-cover rounded-lg w-full h-full"
              src={product.imgSrc}
              loading="lazy"
              style={{
                objectFit: "cover",
                filter: "blur(20px)",
                transition: "filter 0.5s ease",
              }}
              onLoad={(event) => {
                event.target.style.filter = "blur(0px)";
              }}
            />
            <LazyLoadImage
              alt={product.name}
              width={600}
              height={600}
              className=" bg-cover rounded-lg w-full h-full"
              src={product.imgSrc}
              loading="lazy"
              style={{
                objectFit: "cover",
                filter: "blur(20px)",
                transition: "filter 0.5s ease",
              }}
              onLoad={(event) => {
                event.target.style.filter = "blur(0px)";
              }}
            />
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:gap-12 max-w-6xl px-4 mx-auto py-6">
        <div className="grid md:grid-cols-2 items-start gap-6 md:gap-12">
          <div className="grid gap-4 md:gap-10 items-start">
            <h2 className="font-bold text-2xl sm:text-3xl">
              You might also like
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {products.map((p) => (
              <div className="flex flex-col items-start gap-2 relative group">
                <Link className="absolute inset-0 z-10" to="#">
                  <span className="sr-only">View</span>
                </Link>
                <img
                  alt={p.imgSrc}
                  className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden group-hover:scale-105 transition-transform translate-y-0.5 dark:border-gray-800"
                  height={250}
                  src="/placeholder.svg"
                  width={250}
                />
                <div className="grid gap-1">
                  <h3 className="font-semibold tracking-tight-2line-2line-2line">
                    Sporty Sneakers
                  </h3>
                  <p className="font-semibold tracking-tight-2line-2line-2line">
                    $99
                  </p>
                </div>
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductView;
