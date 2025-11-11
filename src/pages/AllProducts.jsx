import { useLoaderData } from "react-router";
import { useState } from "react";
import ProductCard from "../components/ProductCard";


const AllProducts = () => {
  const product = useLoaderData();

  const [products, setProducts] = useState(product);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = e.target.search.value;
  
    setLoading(true);

    fetch(`http://localhost:3000/search?search=${search_text}`)
      .then((res) => res.json())
      .then((data) => {
     
        setProducts(data);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className=" text-center text-5xl font-extrabold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"> All <span
      className="text-purple-600">Products</span>
      </div>
      <p className=" text-center ">Explore Export Import Hub. </p>

      <form
        onSubmit={handleSearch}
        className="mt-5 mb-10 flex flex-wrap gap-3 items-center justify-center"
      >
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            name="search"
            type="search"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-sm transition-all duration-300"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="btn bg-linear-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white font-semibold rounded-full px-6 py-2 shadow-md hover:shadow-lg transition-all duration-300"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
