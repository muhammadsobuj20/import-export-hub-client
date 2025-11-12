import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import usePageTitle from "../Hooks/usePageTitle";

const MyExports = () => {
  usePageTitle("Export Import Hub | MyExports")
  const { user } = useContext(AuthContext);
  const [exports, setExports] = useState([]);
  const [editing, setEditing] = useState(null); 
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originCountry: "",
    rating: "",
    availableQuantity: "",
    image: "",
  });

  //  Load user's exports
  useEffect(() => {
    if (user?.email) {
      fetch(`${import.meta.env.VITE_API_URL}/exports?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setExports(data))
        .catch(() => toast.error("Failed to load exports"));
    }
  }, [user]);

  //  Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //  Add export
  const handleAddExport = async (e) => {
    e.preventDefault();
    if (!user?.email) return toast.error("Please login first");

    const newExport = {
      ...formData,
      addedBy: user.email,
      createdAt: new Date(),
    };

    const res = await fetch(`${import.meta.env.VITE_API_URL}/exports`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExport),
    });
    const data = await res.json();

    if (data.insertedId || data.acknowledged) {
      toast.success("Export added successfully!");
      setExports((prev) => [...prev, { ...newExport, _id: data.insertedId }]);
      setFormData({
        name: "",
        price: "",
        originCountry: "",
        rating: "",
        availableQuantity: "",
        image: "",
      });
    } else toast.error("Failed to add export");
  };

  //  Delete export
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this export?")) return;
    const res = await fetch(`${import.meta.env.VITE_API_URL}/exports/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data.deletedCount || data.acknowledged) {
      toast.success("Export deleted successfully!");
      setExports((prev) => prev.filter((item) => item._id !== id));
    } else toast.error("Failed to delete export");
  };

  //  Open update modal
  const openUpdateModal = (item) => {
    setEditing(item);
    setFormData({
      name: item.name,
      price: item.price,
      originCountry: item.originCountry,
      rating: item.rating,
      availableQuantity: item.availableQuantity,
      image: item.image,
    });
  };

  //  Submit update
  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/exports/${editing._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();

    if (data.modifiedCount || data.acknowledged) {
      toast.success("Export updated successfully!");
      setExports((prev) =>
        prev.map((item) =>
          item._id === editing._id ? { ...item, ...formData } : item
        )
      );
      setEditing(null);
    } else toast.error("Failed to update");
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">My Exports</h1>

      {/*  Export Form */}
      <form
        onSubmit={handleAddExport}
        className="bg-base-100 shadow-lg border p-6 rounded-2xl space-y-3"
      >
        <h2 className="text-xl font-semibold mb-3">Add New Export Product</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            "name",
            "price",
            "origin_country",
            "rating",
            "available_quantity",
            "image",
          ].map((field) => (
            <input
              key={field}
              type={
                field === "price" ||
                field === "rating" ||
                field === "available_quantity"
                  ? "number"
                  : "text"
              }
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="input input-bordered w-full"
              required={field !== "image"}
            />
          ))}
        </div>
        <button className="btn bg-linear-to-r w-full from-indigo-500 via-purple-500 to-pink-500 text-white py-2 rounded-md font-medium hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 shadow-md hover:shadow-lg mt-3">Add Export</button>
      </form>

      {/* Export List */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">My Exported Products</h2>
        {exports.length === 0 ? (
          <p className="text-gray-500 text-center">No exports added yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {exports.map((item) => (
              <div
                key={item._id}
                className="card bg-base-100 shadow-md border rounded-xl"
              >
                <figure>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{item.name}</h2>
                  <p>Price: ${item.price}</p>
                  <p>Origin: {item.originCountry}</p>
                  <p>Rating: ⭐ {item.rating}</p>
                  <p>Available: {item.availableQuantity}</p>
                  <div className="flex justify-between mt-3">
                    <label
                      htmlFor="update-modal"
                      className="btn btn-info btn-sm"
                      onClick={() => openUpdateModal(item)}
                    >
                      Update
                    </label>
                    <button
                      className="btn btn-error btn-sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* DaisyUI Modal */}
      <input
        type="checkbox"
        id="update-modal"
        className="modal-toggle"
        checked={!!editing}
        readOnly
      />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="update-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setEditing(null)}
          >
            ✕
          </label>
          <h3 className="font-bold text-lg mb-4">Update Product</h3>
          <form onSubmit={handleUpdate} className="space-y-3">
            {[
              "name",
              "price",
              "originCountry",
              "rating",
              "availableQuantity",
              "image",
            ].map((field) => (
              <input
                key={field}
                type={
                  field === "price" ||
                  field === "rating" ||
                  field === "availableQuantity"
                    ? "number"
                    : "text"
                }
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="input input-bordered w-full"
              />
            ))}
            <div className="modal-action">
              <button type="submit" className="btn btn-primary w-full">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyExports;
