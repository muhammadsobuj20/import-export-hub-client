import React from "react";
import { useLoaderData } from "react-router";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const products=useLoaderData()

  return (
    <div className="">
 

    <div className=" text-center text-5xl font-extrabold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"> Latest <span
      className="text-purple-600">Products</span>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
