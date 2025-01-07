import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Admin from "./components/Admin/Admin";
import ManageUsers from "./components/Admin/ManageUsers/ManageUsers";
import ManageGroups from "./components/Admin/ManageGroups/ManageGroups";
import ManageReport from "./components/Admin/ManageReports/ManageReports";
import ManageAnalytics from "./components/Admin/ManageAnalytics/ManageAnalytics";
import NewPost from "./components/NewPost/NewPost";
import NewReport from "./components/Report/NewReport";
import ShowPosts from "./components/ShowPosts/ShowPosts";
import CompanionText from "./pages/CompanionText";
import TrainingProgram from "./pages/TrainingProgram";
import axios from "axios";
import { useAuth } from "./Context/AuthContext";
import { Toaster } from "react-hot-toast";
import ChatContainer from "./pages/ChatContainer";
import Chat from "./components/Chat/Chat";

const Home = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get("https://api.adviceslip.com/advice");
        setQuote(response.data.slip.advice);
        const data = response.data;
        console.log("Fetched quote:", data);
      } catch (error) {
        console.log("Error fetching quote:", error);
        setQuote({
          content: "Welcome to a peaceful space for meaningful connections",
          author: "CareCircle",
        });
      }
    };

    fetchQuote();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-16 p-8 text-center">
      <h1 className="text-4xl font-semibold text-slate-700 mb-6">
        Welcome to CareCircle
      </h1>
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
        <p className="text-xl text-slate-600 italic mb-4">"{quote}"</p>
      </div>
    </div>
  );
};
const App = () => {
  const { user, logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <Toaster />
      <nav className="bg-gradient-to-r from-indigo-800 to-indigo-900 p-4 shadow-sm">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <Link
              to="/"
              className="text-white text-2xl font-semibold hover:text-sage-100 transition-all duration-300"
            >
              CareCircle ✨
            </Link>
          </div>
          <div className="space-x-8">
            <Link
              to="/become-a-companion"
              className="text-white hover:text-sage-100 transition-all duration-300"
            >
              <span className="hover:-translate-y-0.5 inline-block transform">
                Become A Companion
              </span>
            </Link>
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-sage-100 transition-all duration-300"
                >
                  <span className="hover:-translate-y-0.5 inline-block transform">
                    Login
                  </span>
                </Link>
                <Link
                  to="/signup"
                  className="text-white hover:text-sage-100 transition-all duration-300"
                >
                  <span className="hover:-translate-y-0.5 inline-block transform">
                    Sign Up
                  </span>
                </Link>
              </>
            ) : (
              <>
                {user && user.userType === "admin" && (
                  <Link
                    to="/admin"
                    className="text-white hover:text-sage-100 transition-all duration-300"
                  >
                    Admin Dashboard
                  </Link>
                )}

                <Link
                  to="/chat"
                  className="text-white hover:text-sage-100 transition-all duration-300"
                >
                  Chat
                </Link>
                <Link
                  to="/new-post"
                  className="text-white hover:text-sage-100 transition-all duration-300"
                >
                  New Post
                </Link>
                <Link
                  to="/showposts"
                  className="text-white hover:text-sage-100 transition-all duration-300"
                >
                  Show Posts
                </Link>
                <Link
                  to="/timeline"
                  className="text-white hover:text-sage-100 transition-all duration-300"
                >
                  <span className="hover:-translate-y-0.5 inline-block transform">
                    My Timeline
                  </span>
                </Link>
                <Link
                  to="/profile"
                  className="text-white hover:text-sage-100 transition-all duration-300"
                >
                  <span className="hover:-translate-y-0.5 inline-block transform">
                    Profile
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-sage-100 transition-all duration-300"
                >
                  <span className="hover:-translate-y-0.5 inline-block transform">
                    Logout
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      <div className="bg-gradient-to-br from-sage-50 via-slate-50 to-sage-100 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/become-a-companion" element={<CompanionText />} />
          <Route path="/training-program" element={<TrainingProgram />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/manage-users" element={<ManageUsers />} />
          <Route path="/admin/manage-groups" element={<ManageGroups />} />
          <Route path="/admin/manage-reports" element={<ManageReport />} />
          <Route path="/new-post" element={<NewPost />} />
          <Route path="/report/:id" element={<NewReport />} />
          <Route path="/showposts" element={<ShowPosts />} />
          <Route path="/admin/analytics" element={<ManageAnalytics />} />
          <Route path="/chat" element={<ChatContainer />} />
          <Route path="/chat/:id" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
