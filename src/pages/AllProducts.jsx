import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router";
import usePageTitle from "../Hooks/usePageTitle";
import Loader from "../components/Loader";

const AllProducts = () => {
  usePageTitle("Export Import Hub | All Products");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Search products
  const handleSearch = async (e) => {
    e.preventDefault();
    const search_text = e.target.search.value;
    try {
      setLoading(true);
      const res = await api.get(`/search?search=${search_text}`);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl text-pink-600 md:text-4xl font-bold mb-5 text-center">All <span className="text-purple-600">Products</span></h1>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="flex flex-wrap justify-center items-center gap-4 mb-8"
      >
        <div className="relative w-full sm:w-80">
          <input
            name="search"
            type="search"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-sm transition-all duration-300"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" strokeWidth="2" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
          </svg>
        </div>
        <button
          type="submit"
          className="btn bg-linear-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white font-semibold rounded-full px-6 py-2 shadow-md hover:shadow-lg transition-all duration-300"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Loader */}
      {loading && <Loader />}

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
         <div key={p._id} className="card bg-white shadow-md hover:shadow-2xl border border-gray-100 rounded-2xl transition-all duration-300 hover:-translate-y-2">
              {/* Product Image */}
              <figure className="relative h-52 overflow-hidden rounded-t-2xl">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                {/* Rating badge */}
                <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                  ⭐ {p.rating}
                </div>
              </figure>
        
              {/* Card Body */}
              <div className="card-body px-5 py-4">
                <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                  {p.name}
                </h2>
        
               
                <div className="flex flex-col gap-1 text-sm text-gray-600">
                  <p>
                    <span className="font-semibold text-gray-700">Available:</span>{" "}
                    {p.available_quantity}
                  </p>
                  <p>
                    <span className="font-semibold text-gray-700">Origin:</span>{" "}
                    {p.origin_country}
                  </p>
                  <p className="text-base font-semibold text-indigo-600 mt-1">
                    💲{p.price}
                  </p>
                </div>
        
                <div className="card-actions mt-4">
                  <Link
                    to={`/product/${p._id}`}
                    className="w-full text-center bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 rounded-full font-medium hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
