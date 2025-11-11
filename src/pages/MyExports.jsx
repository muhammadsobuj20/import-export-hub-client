import { use, useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import usePageTitle from "../Hooks/usePageTitle";


const MyExports = () => {
  usePageTitle("ExportImportHub | MyExports")
  const { user } = use(AuthContext);
  const [exports, setExports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/my-products?email=${user.email}`, {
    method:"GET",
      headers: {
        authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setExports(data);
        setLoading(false);
      });
  }, [user]);

  if (loading) return <Loader/>

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {exports.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MyExports;

// import { useEffect, useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import toast from "react-hot-toast";

// const MyExport = () => {
//   const { user } = useContext(AuthContext);
//   const [imports, setImports] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchImports = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/my-exports/${user?.email}`);
//         const data = await res.json();
//         if (data.success) setImports(data.data);
//       } catch (error) {
//         toast.error("Failed to load imports");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (user?.email) fetchImports();
//   }, [user]);

//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:3000/my-exports/${id}`, {
//         method: "DELETE",
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("Deleted successfully!");
//         setImports(imports.filter((i) => i._id !== id));
//       } else {
//         toast.error("Delete failed!");
//       }
//     } catch (error) {
//       toast.error("Error deleting import");
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center p-10">Loading...</div>;
//   }

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h2 className="text-3xl font-bold mb-6">My Exported Products</h2>
//       {imports.length === 0 ? (
//         <p>No products downloaded yet.</p>
//       ) : (
//         <div className="grid md:grid-cols-3 gap-6">
//           {imports.map((imp) => (
//             <div key={imp._id} className="card bg-base-100 shadow-lg p-4">
//               <img src={imp.image} alt={imp.name} className="rounded-lg mb-4" />
//               <h3 className="text-lg font-semibold">{imp.name}</h3>
//               <p className="text-gray-500">{imp.origin_country}</p>
//               <button
//                 onClick={() => handleDelete(imp._id)}
//                 className="btn btn-outline btn-error mt-4"
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyExport;
