import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
 

  const [product, setProduct] = useState({
    name: "",
    price: "",
    origin_country: "",
    available_quantity: "",
    rating: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);

  //  Fetch product details
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/product/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data || {});
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load product");
        setLoading(false);
      });
  }, [id]);

  // 🔹 Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // 🔹 Submit update (PUT Request)
  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Confirm Update?",
      text: "Are you sure you want to update this product?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Update",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/product/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        })
          .then((res) => res.json())
          .then(() => {
            toast.success(" Product updated successfully!");
            navigate("/my-products");
          })
          .catch(() => {
            toast.error("Failed to update product!");
          });
      }
    });
  };

  //  Loading Spinner
  if (loading){
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-dots loading-lg text-purple-600"></span>
      </div>
    );
  }
    

  // Form 
  return (
    <div className="max-w-3xl mx-auto bg-base-100 shadow-xl rounded-2xl p-6 my-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-pink-600">
         Update Product
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block font-medium">Product Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Origin Country */}
        <div>
          <label className="block font-medium">Origin Country</label>
          <input
            type="text"
            name="origin_country"
            value={product.origin_country}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Available Quantity */}
        <div>
          <label className="block font-medium">Available Quantity</label>
          <input
            type="number"
            name="available_quantity"
            value={product.available_quantity}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block font-medium">Rating</label>
          <input
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
           className="btn w-full text-white font-semibold py-2 mt-4 rounded-full bg-linear-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
