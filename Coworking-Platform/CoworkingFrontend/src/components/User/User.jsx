import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function User() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) {
      navigate("/loginpriya");
    }
  }, [user, navigate]);

  if (!user?._id) {
    return null;
  }

  const avatarUrl = user.avatar?.secure_url;

  return (
    <section className="container max-w-md px-4 py-10 mx-auto">
      <div className="p-6 text-center bg-white rounded-lg shadow">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 overflow-hidden text-3xl text-white bg-pink-700 rounded-full">
          {avatarUrl ? (
            <img src={avatarUrl} alt={user.name} className="object-cover w-full h-full" />
          ) : (
            (user.name?.[0] || "U").toUpperCase()
          )}
        </div>
        <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
        <p className="text-gray-500">{user.email}</p>
        <span className="inline-block px-3 py-1 mt-3 text-xs font-medium text-pink-700 bg-pink-100 rounded-full">
          {user.role}
        </span>
      </div>
    </section>
  );
}

export default User;
