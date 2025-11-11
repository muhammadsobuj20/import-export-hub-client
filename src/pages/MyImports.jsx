import { use, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../context/AuthContext";
import usePageTitle from "../Hooks/usePageTitle";

const MyDownloads = () => {
   usePageTitle("Export Import Hub | MyImports");
  const { user } = use(AuthContext);
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/my-imports?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
  
        setImports(data);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-dots loading-lg text-pink-600"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {imports.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MyDownloads;
