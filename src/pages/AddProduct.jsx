import { useContext } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import usePageTitle from "../Hooks/usePageTitle";

const AddProduct = () => {
   usePageTitle("Export Import Hub | Add Product");
  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      image: e.target.image.value,
      price: e.target.price.value,
      downloads: 0,
      rating: e.target.rating.value,
      available_quantity:e.target.Available.value,
      origin_country: e.target.country.value,
      created_by: user?.email || "anonymous",
    };

    fetch("http://localhost:3000/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("Product added successfully!");
        e.target.reset();
       
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen md:flex items-center justify-center py-10">
      <div className="card bg-white/80 backdrop-blur-md shadow-2xl border border-gray-100 w-full max-w-md mx-auto rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full input input-bordered rounded-xl focus:ring-2 focus:ring-pink-400"
              placeholder="Enter product name"
            />
          </div>
          {/* Available */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Available
            </label>
            <input
              type="text"
              name="Available"
              required
              className="w-full input input-bordered rounded-xl focus:ring-2 focus:ring-pink-400"
              placeholder="Available Quantity"
            />
          </div>

         
          {/* Image URL */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              required
              className="w-full input input-bordered rounded-xl focus:ring-2 focus:ring-pink-400"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          {/* Country */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Origin of Country
            </label>
            <input
              type="text"
              name="country"
              required
              className="w-full input input-bordered rounded-xl focus:ring-2 focus:ring-pink-400"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          {/* Price */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Price
            </label>
            <input
              type="text"
              name="price"
              required
              className="w-full input input-bordered rounded-xl focus:ring-2 focus:ring-pink-400"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          {/* Rating*/}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Rating
            </label>
            <input
              type="text"
              name="rating"
              required
              className="w-full input input-bordered rounded-xl focus:ring-2 focus:ring-pink-400"
              placeholder="⭐5.0"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn w-full text-white font-semibold py-2 mt-4 rounded-full bg-linear-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
