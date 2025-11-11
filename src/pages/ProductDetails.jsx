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
        setProduct(data || {});
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error("Failed to load product details.");
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
        const res = await fetch(
          `http://localhost:3000/product/${product._id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          toast.success("Product deleted successfully!");
          navigate("/all-product");
        } else {
          toast.error("Delete failed!");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
      }
    }
  };

  //  Handle Download (Import)
  const handleDownload = async () => {
    if (!product?._id) {
      toast.error("Product ID not found!");
      navigate("/all-product");
      return;
    }

    try {
      const checkRes = await fetch(
        `http://localhost:3000/imports/check/${product._id}?email=${user?.email}`
      );
      const checkData = await checkRes.json();

      if (checkData.exists) {
        toast.error("You already downloaded this product!");
        return;
      }

      const finalProduct = {
        name: product?.name,
        origin_country: product?.origin_country,
        image: product?.image,
        downloaded_by: user?.email,
        downloaded_at: new Date(),
      };

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

  //  Loader UI
  // if (loading || !product?._id) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[60vh]">
  //       <span className="loading loading-dots loading-lg text-purple-600"></span>
  //     </div>
  //   );
  // }

  //  Main UI
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
                className="btn  text-white font-semibold py-2 mt-4 rounded-full bg-linear-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Update
              </Link>

              <button
                onClick={handleDownload}
                className="btn text-white font-semibold py-2 mt-4 rounded-full bg-linear-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Download
              </button>

              <Link
                onClick={handleDelete}
                className="btn text-white font-semibold py-2 mt-4 rounded-full bg-linear-to-r from-pink-500 to-purple-600 hover:from-purple-600 hover:to-pink-500 transition-all duration-300 shadow-md hover:shadow-lg"
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



// import { useContext, useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router";
// import { AuthContext } from "../context/AuthContext";
// // import Swal from "sweetalert2";
// import toast from "react-hot-toast";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const [product, setProduct] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // ✅ Fetch product details
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/product/${id}`);
//         // Handle non-ok responses (404, 500, etc.)
//         if (!res.ok) {
//             throw new Error(`Failed to fetch product: ${res.status}`);
//         }
//         const data = await res.json();
//         setProduct(data || {});
//       } catch (error) {
//         console.error("Error fetching product:", error);
//         toast.error("Failed to load product details");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   // ✅ Import Now Handler
//   const handleImport = async () => {
//     if (!user) {
//       toast.error("You must be logged in to import a product!");
//       navigate("/login");
//       return;
//     }

//     // Basic client-side validation for quantity
//     const quantityInt = parseInt(quantity);
//     if (!quantityInt || quantityInt <= 0 || quantityInt > product.available_quantity) {
//         toast.error("Please enter a valid quantity within the available stock.");
//         return;
//     }
    
//     setIsSubmitting(true);
//     try {
//       const res = await fetch("http://localhost:3000/imports", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           authorization: `Bearer ${user.accessToken}`,
//         },
//         body: JSON.stringify({
//           productId: product._id,
//           productName: product.name,
//           image: product.image,
//           price: product.price,
//           importedQuantity: quantityInt,
//           downloaded_by: user.email,
//         }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         toast.success("Product imported successfully!");
//         setShowModal(false);
//         setQuantity("");

//         // update local state to reduce quantity
//         setProduct((prev) => ({
//           ...prev,
//           // FIX 2: Use available_quantity for consistent state update
//           available_quantity: prev.available_quantity - quantityInt, 
//         }));
//       } else {
//         // This handles server errors (e.g., 400 Bad Request with message)
//         toast.error(data.message || "Import failed!");
//       }
//     } catch (error) {
//       console.error("Import error:", error);
//       toast.error("Something went wrong with the import request!");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <span className="loading loading-dots loading-lg text-pink-600"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="card lg:card-side bg-base-100 shadow-xl">
//         <figure>
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-[350px] object-cover"
//           />
//         </figure>
//         <div className="card-body">
//           <h2 className="card-title text-2xl font-bold">{product.name}</h2>
//           {/* <p className="text-gray-600">{product.origin_country}</p>npm */}
//           <p className="text-lg font-semibold text-blue-600">
//             Price: ${product.price}
//           </p>
//           <p className="text-lg text-gray-700">
//             Available Quantity:{" "}
//             <span className="font-semibold">{product.available_quantity}</span>
//           </p>
//           <p className="text-gray-500">Origin: {product.origin_country}</p>

//           <div className="card-actions justify-end mt-4">
//             <button
//               className="btn btn-primary"
//               onClick={() => setShowModal(true)}
//               // FIX 3: Use available_quantity for disable check
//               disabled={product.available_quantity <= 0} 
//             >
//               Import Now
//             </button>
//           </div>
//         </div>
//       </div>

//       {/*  Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
//           <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
//             <h3 className="text-lg font-semibold mb-4">
//               Import Quantity for {product.name}
//             </h3>
//             <input
//               type="number"
//               min="1"
//               // FIX 1: Use available_quantity for max attribute
//               max={product.available_quantity} 
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               placeholder="Enter quantity"
//               className="input input-bordered w-full mb-4"
//             />

//             {quantity > product.available_quantity && (
//               <p className="text-red-600 text-sm mb-2">
//                 Quantity exceeds available stock!
//               </p>
//             )}

//             <div className="flex justify-end gap-2">
//               <button
//                 className="btn btn-ghost"
//                 onClick={() => setShowModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="btn btn-primary"
//                 onClick={handleImport}
//                 disabled={
//                   !quantity ||
//                   quantity <= 0 ||
//                   // FIX 1: Use available_quantity for disable check
//                   quantity > product.available_quantity || 
//                   isSubmitting
//                 }
//               >
//                 {isSubmitting ? "Importing..." : "Submit"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;