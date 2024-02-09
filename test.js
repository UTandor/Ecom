const products = [
  {
    _id: "65c247f490940b2047b2c538",
    id: 1,
    name: "Chanel No. 5",
    category: ["Floral"],
    price: 129.99,
    description: "Classic and timeless fragrance with floral notes.",
  },
  {
    _id: "65c247f490940b2047b2c539",
    id: 2,
    name: "Dior Sauvage",
    category: ["Men's"],
    price: 89.99,
    description: "Bold and masculine scent",
  },
  {
    _id: "65c247f490940b2047b2c53a",
    id: 3,
    name: "Viktor&Rolf Flowerbomb",
    category: ["Fruity-Floral"],
    price: 149.99,
    description: "A burst of floral and sweet notes for a captivating aroma.",
  },
  {
    _id: "65c247f490940b2047b2c53b",
    id: 4,
    name: "Tom Ford Black Orchid",
    category: ["Spicy-Oriental"],
    price: 199.99,
    description: "Sensual and luxurious fragrance with a blend of spices.",
  },
  {
    _id: "65c247f490940b2047b2c53c",
    id: 5,
    name: "Jo Malone English Pear & Freesia",
    category: ["Fresh"],
    price: 79.99,
    description: "A refreshing and elegant scent with fruity undertones.",
  },
];

const selectedCategories = ["1", "0", "2", "3", "4"];

const selectedCategoryValues = selectedCategories.map(
  (index) => products[index].category[0]
);

// Create a comma-separated string of category values
const categoryQueryParam = selectedCategoryValues.join(",");
const apiUrl = `https://coveee.netlify.app/.netlify/functions/api/products?category=${categoryQueryParam}`;

console.log(apiUrl);
// https://coveee.netlify.app/.netlify/functions/api/products?category=products[1].category.incommaseperatedform,products[0].category.incommasform,products[2].category.incommasform
