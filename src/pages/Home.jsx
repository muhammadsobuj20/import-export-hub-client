import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ProductCard from "../components/ProductCard";
import usePageTitle from "../Hooks/usePageTitle";
import GlobalPartner from "../components/GlobalPartner";
import ExportImportMission from "../components/ExportImportMission";
import ExportImportVision from "../components/ExportImportVision";
import api from "../api/api";

const Home = () => {
   usePageTitle("ExportImportHub | Home");
    const [products, setProducts] = useState([]);
    useEffect(() => {
      api.get('/latest-products').then(res => setProducts(res.data)).catch(console.error);
    }, []);

  return (
    <div className="">
      <div className=" text-center text-5xl font-extrabold bg-linear-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
        {" "}
        Latest <span className="text-purple-600">Products</span>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className=" text-center mt-4">
        <Link to="/all-product"
      className="btn bg-linear-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 text-white font-semibold rounded-full px-6 py-2 shadow-md hover:shadow-lg transition-all duration-300"
      >See All</Link>
    </div>
      <GlobalPartner/>
      <ExportImportVision/>
      <ExportImportMission/>
    </div>
  );
};

export default Home;
