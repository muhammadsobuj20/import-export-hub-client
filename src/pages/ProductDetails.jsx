import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [refetch, setRefetch] = useState(false);

  // 🔹 Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/product/${id}`);
        const data = await res.json();
        setProduct(data || {}); // ✅ Backend সরাসরি object পাঠাচ্ছে
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, refetch]);

  // 🔹 Handle Delete Product
  const handleDelete = async () => {
    if (!product?._id) {
      toast.error("Product ID not found!");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`http://localhost:3000/product/${product._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await res.json();

        if (data.success) {
          toast.success("Product deleted successfully!");
          navigate("/all-products");
        } else {
          toast.error("Delete failed!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
      }
    }
  };

  // 🔹 Handle Download (Import)
  const handleDownload = async () => {
    if (!product?._id) {
      toast.error("Product ID not found!");
      navigate("/my-exports")
      return;
    }

    const finalProduct = {
      name: product?.name,
      origin_country: product?.origin_country,
      image: product?.image,
      downloaded_by: user?.email, // ✅ backend এ এটা expected ফিল্ড
      downloaded_at: new Date(),
    };

    try {
      const res = await fetch(`http://localhost:3000/imports/${product._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalProduct),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Product imported successfully!");
        setRefetch(!refetch);
      } else {
        toast.error("Import failed!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Download failed!");
    }
  };

  // 🔹 Loader UI
  if (loading || !product?._id) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-dots loading-lg text-pink-600"></span>
      </div>
    );
  }

  // 🔹 Main UI
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          {/* Product Image */}
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={product?.image || "/placeholder.png"}
              alt={product?.name || "Product"}
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {product?.name}
            </h1>

            <div className="flex gap-3">
              <div className="badge badge-lg badge-outline text-pink-600 border-pink-600 font-medium">
                {product?.origin_country}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mt-6">
              <Link
                to={`/update-product/${product._id}`}
                className="btn btn-primary rounded-full bg-gradient-to-r from-pink-500 to-red-600 text-white border-0 hover:from-pink-600 hover:to-red-700"
              >
                Update
              </Link>

              <button
                onClick={handleDownload}
                className="btn btn-secondary rounded-full"
              >
                Download
              </button>

              <Link 
            
                onClick={handleDelete}
                className="btn btn-outline rounded-full border-gray-300 hover:border-pink-500 hover:text-pink-600"
              >
                Delete
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
