//@ts-nocheck
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  ChevronUpIcon,
  MicroscopeIcon,
  Package2Icon,
  SearchIcon,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import axios from "axios";
import { Checkbox } from "../ui/checkbox";
import { Card, CardContent } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Oval } from "react-loader-spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Main = () => {
  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<string[] | null>([]);
  const [prices, setPrices] = useState<number[] | null>([]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchItem, setSearchItem] = useState("");
  const [sliderValues, setSliderValues] = useState<number[]>([0, 100]);

  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [sortType, setSortType] = useState("featured");

  const fetchData = async () => {
    setLoading(true);
    const response = await axios.get(
      "https://coveee.netlify.app/.netlify/functions/api/products"
    );
    setProducts(response.data.products);
    let cats = response.data.products.map((product) => product.category[0]);
    cats = [...new Set(cats)];
    setCategories(cats);
    setPrices(response.data.products.map((product) => product.price));

    const minPrice = Math.min(
      ...response.data.products.map((product) => product.price)
    );
    const maxPrice = Math.max(
      ...response.data.products.map((product) => product.price)
    );
    setSliderValues([minPrice, maxPrice]);
    setLoading(false);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);

    setSliderValues([Math.min(...prices), Math.max(...prices)]);
    setSearchItem("");
  };

  const handleCategoryChange = (e) => {
    const category = e.target.id.split("-")[1];
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleFilteredProducts();
  };
  const handleFilteredProducts = async () => {
    const selectedCategoryValues = selectedCategories.map((index) => {
      return categories[index];
    });

    const categoryQueryParam = selectedCategoryValues.join(",");
    let apiUrl = `https://coveee.netlify.app/.netlify/functions/api/products?category=${categoryQueryParam}`;
    apiUrl = apiUrl.concat(
      "&minPrice=",
      sliderValues[0].toString(),
      "&maxPrice=",
      sliderValues[1].toString()
    );
    apiUrl = apiUrl.concat("&name=", searchItem);

    switch (sortType) {
      case "price-low-high":
        apiUrl = apiUrl.concat("&sort=price");
        break;
      case "price-high-low":
        apiUrl = apiUrl.concat("&sort=-price");
        break;
      case "name-a-z":
        apiUrl = apiUrl.concat("&sort=name");
        break;
      case "name-z-a":
        apiUrl = apiUrl.concat("&sort=-name");
        break;
    }

    const response = await axios.get(apiUrl);
    setProducts(response.data.products);
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategories]);

  useEffect(() => {
    handleFilteredProducts();
  }, [sliderValues, searchItem, sortType]);

  return (
    <div className="flex min-h-screen text-foreground w-full">
      <Sheet>
        <div className="flex h-full max-h-screen flex-col gap-2">
          <SheetContent className="border-r w-2/3 lg:w-1/4" side={"left"}>
            <div className="flex h-[60px] items-center border-b px-6">
              <Link className="flex items-center gap-2 font-semibold" to="#">
                <Package2Icon className="h-6 w-6" />
                <span className="">Ecom Store</span>
              </Link>
              <Button className="ml-auto h-8 w-8" size="icon" variant="ghost">
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1 overflow-auto py-2">
              <nav className="grid items-start px-4 text-sm font-medium">
                <h3 className="font-semibold text-lg">Filters</h3>
                <div className="w-full mt-5 space-y-4">
                  <div className="grid gap-2">
                    <details
                      onToggle={() => setIsOpen1(!isOpen1)}
                      open
                      className="group duration-300 transition-all ease-in-out"
                    >
                      <summary className="text-lg font-semibold cursor-pointer">
                        Category
                        <ChevronUpIcon
                          className={`float-right transition-all duration-300 ${
                            isOpen1 ? "rotate-180" : ""
                          } `}
                        />
                      </summary>
                      <div className="py-4 space-y-2">
                        {categories?.map((category, id) => (
                          <div className="flex items-center space-x-2" key={id}>
                            <Checkbox
                              id={`category-${id}`}
                              checked={selectedCategories.includes(
                                id.toString()
                              )}
                              onClick={(e) => handleCategoryChange(e)}
                            />
                            <Label
                              className="flex items-center gap-2 font-normal"
                              htmlFor={`category-${id}`}
                            >
                              {category}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </details>
                  </div>
                  <Separator />
                  <div className="grid gap-2">
                    <details
                      onToggle={() => setIsOpen2(!isOpen2)}
                      className="group"
                      open
                    >
                      <summary className="text-lg font-semibold cursor-pointer">
                        Price
                        <ChevronUpIcon
                          className={`float-right transition-all duration-300  ${
                            isOpen2 ? "rotate-180" : ""
                          }`}
                        />
                      </summary>

                      <div className="py-4 space-y-2">
                        <div className="w-full flex justify-between ">
                          <Label className="">Rs. {sliderValues[0]}</Label>
                          <Label className="">Rs. {sliderValues[1]}</Label>
                        </div>
                        <Slider
                          defaultValue={[
                            Math.min(...prices),
                            Math.max(...prices),
                          ]}
                          max={Math.max(...prices)}
                          min={Math.min(...prices)}
                          step={10}
                          onValueChange={(values) => setSliderValues(values)}
                        />
                      </div>
                    </details>
                  </div>
                </div>
                <Separator></Separator>
                <div className="flex mt-5 justify-around space-x-8">
                  <Button
                    className="mx-auto w-full"
                    onClick={(e) => handleFilteredProducts(e)}
                  >
                    Filter
                  </Button>
                  <Button
                    className="mx-auto w-full"
                    onClick={handleResetFilters}
                    variant={"outline"}
                  >
                    Reset
                  </Button>
                </div>
              </nav>
            </div>
          </SheetContent>
        </div>
        <div className="flex flex-col w-full">
          <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-primary-foreground px-6 /40">
            <div className="w-full flex-row justify-between">
              <form onSubmit={(e) => handleFormSubmit(e)}>
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-foreground " />
                  <Input
                    className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 "
                    placeholder="Search products..."
                    type="search"
                    onChange={(e) => setSearchItem(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <div className="flex  justify-between mb-6 sticky top-5 z-10 space-x-4">
              <SheetTrigger asChild>
                <Button
                  className="flex w-full lg:w-1/2  items-center space-x-2"
                  variant="outline"
                >
                  <MicroscopeIcon className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </SheetTrigger>
              <Select
                onValueChange={(e) => {
                  setSortType(e);
                  console.log("Value: ", e);
                  handleFilteredProducts();
                  console.log("Actual sort type", sortType);
                }}
              >
                <SelectTrigger id="sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high-low">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="name-a-z">Name: A-Z</SelectItem>
                  <SelectItem value="name-z-a">Name: Z-A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-6 md:gap-8 grid-cols-2 md:grid-cols-3  lg:grid-cols-5">
              {!loading ? (
                products.map((product) => (
                  <Card
                    className="w-full   hover:cursor-pointer group p-0 border shadow-sm"
                    key={product.id}
                  >
                    <CardContent>
                      <div className="w-full flex justify-between items-center">
                        <div className="rounded-t-lg  relative   items-center overflow-hidden pt-[100%] w-full mb-4">
                          <LazyLoadImage
                            alt={product.name}
                            className="absolute  transition-all duration-300 ease-in-out top-0 left-0 -z-5 bg-cover w-full h-full"
                            src={product.imgSrc}
                            loading="lazy"
                            id={`image-${product.id}`}
                            style={{
                              objectFit: "cover",
                              filter: "blur(20px)",
                              transition: "filter 0.5s ease",
                            }}
                            onLoad={(event) => {
                              event.target.style.filter = "blur(0px)";
                            }}
                            onMouseOver={(e) => {
                              e.target.style.filter = "blur(10px)";
                            }}
                            onMouseOut={(e) => {
                              e.target.style.filter = "blur(0px)";
                            }}
                          />
                          <Button 
                          className="transform translate-y-20 opacity-0 mb-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out absolute bottom-0 w-[95%] left-2 right-2 ">
                            Quick View
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-col ml-4">
                        <h3 className="text-lg font-semibold mb-1">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3">
                          {product.category}
                        </p>
                        <div className="mb-2">
                          <p className="font-semibold text-lg">
                            Rs. {product.price}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="flex flex-col mx-auto  w-screen justify-center items-center space-y-4">
                  <Oval
                    visible={true}
                    height="80"
                    width="80"
                    color="#000000"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    secondaryColor="#ffffff"
                  />
                  <h1 className="font-semibold text-lg">Loading...</h1>
                </div>
              )}
            </div>
          </main>
        </div>
      </Sheet>
    </div>
  );
};

export default Main;
