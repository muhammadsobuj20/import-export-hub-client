import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router";
import api from "../api/api";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import usePageTitle from "../Hooks/usePageTitle";

const ProductDetails = () => {
  usePageTitle("Export Import Hub | Products Details")
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const [importQuantity, setImportQuantity] = useState(0);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading || !product) return <Loader />;

  // Handle Import Submit
  const handleImport = async () => {
    if (!user?.email) return toast.error("Please login first!");
    if (importQuantity <= 0) return toast.error("Enter valid quantity");
    if (importQuantity > product.availableQuantity)
      return toast.error("Quantity exceeds available stock");

    try {
      const res = await api.post(`/import/${id}`, {
        email: user.email,
        importedQuantity: Number(importQuantity),
      });
      if (res.data.success) {
        toast.success("Product imported successfully!");
        setProduct((prev) => ({
          ...prev,
          availableQuantity: prev.availableQuantity - importQuantity,
        }));
        setModalOpen(false);
        setImportQuantity(0);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to import product");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="card lg:card-side bg-base-100 shadow-xl rounded-2xl overflow-hidden">
        <figure className="lg:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-3xl font-bold">{product.name}</h2>
          <p className="text-lg">Price: ${product.price}</p>
          <p className="text-lg">Origin: {product.origin_country}</p>
          <p className="text-lg">Rating: ⭐ {product.rating}</p>
          <p className="text-lg">
            Available Quantity: {product.available_quantity}
          </p>

          {/* Import Button */}
          <Link to="/all-product"
            htmlFor="import-modal"
            className={`btn  bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 rounded-full font-medium hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 shadow-md hover:shadow-lg mt-4 ${
              product.available_quantity === 0 ? "btn-disabled" : ""
            }`}
            onClick={() => setModalOpen(true)}
          >
            Import Now
          </Link>
        </div>
      </div>

      {/* DaisyUI Modal */}
      <input
        type="checkbox"
        id="import-modal"
        className="modal-toggle"
        checked={modalOpen}
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="import-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2 text-center bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 rounded-full font-medium hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 shadow-md hover:shadow-lg"
            onClick={() => {
              setModalOpen(false);
              setImportQuantity(0);
            }}
          >
            ✕
          </label>
          <h3 className="font-bold text-lg mb-4">
            Import "{product.name}"
          </h3>
          <div className="flex flex-col gap-3">
            <input
              type="number"
              placeholder="Enter quantity"
              className="input input-bordered w-full"
              value={importQuantity}
              onChange={(e) => setImportQuantity(Number(e.target.value))}
              min={1}
              max={product.available_quantity}
            />
            <button
            className="w-full text-center bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 rounded-full font-medium hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 shadow-md hover:shadow-lg"
              disabled={
                importQuantity <= 0 || importQuantity > product.available_quantity
              }
              onClick={handleImport}
            >
              Submit
            </button>
            {importQuantity > product.available_quantity && (
              <p className="text-red-500 text-sm">
                Quantity cannot exceed available stock!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
