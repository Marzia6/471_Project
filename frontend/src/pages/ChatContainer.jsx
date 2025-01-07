import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../components/Chat/Card";

const ChatContainer = () => {
  const [id, setId] = useState(0);
  const [user, setUser] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const user = response.data.user;
        setId(user._id);
      })
      .catch((err) => {
        setError(err.response?.data?.message);
      });

    axios
      .get("http://localhost:5000/api/users")
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-8">
          Welcome to the Home Page
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {user
            .filter((item) => item._id != id)
            .map((item) => {
              return (
                <Link
                  key={item._id}
                  to={`/chat/${item._id}?userId=${id}`}
                  className="block rounded-lg shadow-lg hover:shadow-2xl transition-all"
                >
                  <Card data={item} />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
