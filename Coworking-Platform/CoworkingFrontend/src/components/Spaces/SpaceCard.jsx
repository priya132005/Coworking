import React from "react";
import { Link } from "react-router-dom";

export default function SpaceCard({ space }) {
  const image =
    space.images?.[0] ||
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80";

  return (
    <div className="overflow-hidden transition bg-white rounded-lg shadow hover:shadow-lg">
      <img src={image} alt={space.name} className="object-cover w-full h-48" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-800">{space.name}</h3>
          <span className="px-2 py-1 text-xs font-medium text-pink-700 bg-pink-100 rounded-full whitespace-nowrap">
            {space.category}
          </span>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {space.city} • Capacity {space.capacity}
        </p>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{space.description}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-pink-700">
            ₹{space.pricePerHour}
            <span className="text-sm font-normal text-gray-500">/hour</span>
          </span>
          <Link
            to={`/book/${space._id}`}
            className="px-4 py-2 text-sm font-medium text-white bg-pink-700 rounded-lg hover:bg-pink-800"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
}
