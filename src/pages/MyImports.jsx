import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import usePageTitle from "../Hooks/usePageTitle";

const MyImports = () => {
  usePageTitle("Export Import Hub | MyImports")
  const { user } = useContext(AuthContext);
  const [imports, setImports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImports = async () => {
    try {
      if (!user) return;
      const res = await api.get("/imports", { params: { email: user.email } });
      setImports(res.data);
    } catch (error) {
      console.error("Error fetching imports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImports();
  }, [user]);

  const handleRemove = async (id) => {
    const confirmRemove = confirm(
      "Are you sure you want to remove this import?"
    );
    if (!confirmRemove) return;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/imports/${id}`);
          setImports((prev) => prev.filter((item) => item._id !== id));

          Swal.fire({
            title: "Deleted!",
            text: "Your import has been removed successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        } catch (error) {
          console.error("Failed to remove import:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to remove import. Please try again.",
            icon: "error",
          });
        }
      }
    });

    if (!user) {
      return (
        <div className="text-center text-xl mt-10">
          Please login to view your imports.
        </div>
      );
    }

  };
  if (loading) {
    return <Loader/>;
  }
  return (
    <div className="container mx-auto p-6">
      {" "}
        <h1 className="text-2xl text-pink-600 md:text-4xl font-bold mb-5 text-center">My<span className="text-purple-600"> Imports</span></h1>
      {imports.length === 0 ? (
        <div className="text-center text-lg text-gray-600">
          You haven’t imported any products yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imports.map((item) => (
            <div
              key={item._id}
              className="card bg-base-100 shadow-md border p-4 rounded-xl"
            >
              <img
                src={item.productSnapshot?.image}
                alt={item.productSnapshot?.name}
                className="h-48 w-full object-cover rounded-md"
              />

              <div className="mt-4 space-y-1">
                <h2 className="text-lg font-semibold">
                  {item.productSnapshot?.name}
                </h2>
                <p className="text-gray-600">
                  Price: ${item.productSnapshot?.price}
                </p>
                <p className="text-gray-600">
                  Rating: {item.productSnapshot?.rating}
                </p>
                <p className="text-gray-600">
                  Origin: {item.productSnapshot?.originCountry}
                </p>
                <p className="text-gray-600 font-medium">
                  Imported Quantity: {item.importedQuantity}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleRemove(item._id)}
                  className="btn  bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 rounded-md font-medium hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 shadow-md hover:shadow-lg btn-sm"
                >
                  Remove
                </button>
                <Link
                  to={`/product/${item.productId}`}
                  className="btn  bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 rounded-full font-medium hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 shadow-md hover:shadow-lg btn-sm"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyImports;
