import { Link } from "react-router";

export const ProductCard = ({ product }) => {
  const {
    name,
    image,
    price,
    description,
    _id,
    available_quantity,
    origin_country,
    rating,
  } = product;

  return (
    <div className="card bg-white shadow-md hover:shadow-2xl border border-gray-100 rounded-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Product Image */}
      <figure className="relative h-52 overflow-hidden rounded-t-2xl">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 ease-in-out"
        />
        {/* Rating badge */}
        <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md">
          ⭐ {rating}
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body px-5 py-4">
        <h2 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
          {name}
        </h2>

        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{description}</p>

        <div className="flex flex-col gap-1 text-sm text-gray-600">
          <p>
            <span className="font-semibold text-gray-700">Available:</span>{" "}
            {available_quantity}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Origin:</span>{" "}
            {origin_country}
          </p>
          <p className="text-base font-semibold text-indigo-600 mt-1">
            💲{price}
          </p>
        </div>

        <div className="card-actions mt-4">
          <Link
            to={`/product-details/${_id}`}
            className="w-full text-center bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-2 rounded-full font-medium hover:from-pink-500 hover:to-indigo-500 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
