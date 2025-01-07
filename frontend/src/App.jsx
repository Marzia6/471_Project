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
import QualificationTest from "./pages/QualificationTest";
import TrainingProgram from "./pages/TrainingProgram";
import axios from "axios";
import { Toaster } from "react-hot-toast";

const Home = () => {
	const [quote, setQuote] = useState("");

	useEffect(() => {
		const fetchQuote = async () => {
			try {
				// const randomNumber = Math.floor(Math.random() * 30) + 1;
				const response = await axios.get(`https://dummyjson.com/quotes/random`);
				setQuote(response.data.quote);
			} catch (error) {
				setQuote("Welcome to a peaceful space for meaningful connections");
			}
		};
		fetchQuote();
	}, []);

	return (
		<div className="relative">
			{/* Hero Section */}
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
				<div className="text-center">
					<h1 className="text-6xl font-bold text-indigo-900 mb-8 tracking-tight">
						Welcome to CareCircle
					</h1>
					<p className="text-2xl text-indigo-800 mb-12 max-w-3xl mx-auto">
						Connect, Share, and Support Each Other
					</p>

					{/* Quote Card */}
					<div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-2xl mx-auto transform hover:scale-105 transition-all duration-300">
						<p className="text-xl text-indigo-800 italic leading-relaxed">
							"{quote}"
						</p>
					</div>

					{/* Feature Cards */}
					<div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
						<div className="bg-gradient-to-br from-indigo-800 to-indigo-900 p-6 rounded-xl shadow-lg text-white">
							<h3 className="text-xl font-semibold mb-3">Connect</h3>
							<p>Join a supportive community of like-minded individuals</p>
						</div>
						<div className="bg-gradient-to-br from-indigo-800 to-indigo-900 p-6 rounded-xl shadow-lg text-white">
							<h3 className="text-xl font-semibold mb-3">Share</h3>
							<p>Share your experiences and learn from others</p>
						</div>
						<div className="bg-gradient-to-br from-indigo-800 to-indigo-900 p-6 rounded-xl shadow-lg text-white">
							<h3 className="text-xl font-semibold mb-3">Grow</h3>
							<p>Develop meaningful connections and personal growth</p>
						</div>
					</div>
				</div>
			</div>

			{/* Background Decoration */}
			<div className="absolute inset-0 -z-10 bg-gradient-to-br from-sage-50 via-slate-50 to-sage-100" />
		</div>
	);
};
const App = () => {
	const [currentUser, setCurrentUser] = useState(null);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	useEffect(() => {
		const interval = setInterval(async () => {
			const token = localStorage.getItem("token");
			const response = await axios.get("http://localhost:5000/profile", {
				headers: { Authorization: `Bearer ${token}` },
			});
			console.log(response.data.user);
			const user = response.data.user;
			setCurrentUser(user);
			setIsLoggedIn(!!token);
		}, 500);

		return () => clearInterval(interval);
	}, []);
	const handleLogout = () => {
		localStorage.removeItem("token");
		location.reload();
	};

	return (
		<Router>
			<Toaster />
			<nav className="bg-white/90 backdrop-blur-sm border-b border-indigo-100 p-4 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto flex justify-between items-center">
					<div>
						<Link
							to="/"
							className="text-2xl font-bold bg-gradient-to-r from-indigo-800 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2"
						>
							CareCircle <span className="text-2xl">🌱</span>
						</Link>
					</div>

					<div className="flex items-center gap-6">
						{currentUser && currentUser.role != 'companion' && (
							<Link
								to="/become-a-companion"
								className="text-indigo-800 hover:text-indigo-600 font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-300"
							>
								Become A Companion
							</Link>
						)}


						{!isLoggedIn ? (
							<>
								<Link
									to="/login"
									className="text-indigo-800 hover:text-indigo-600 font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-300"
								>
									Login
								</Link>
								<Link
									to="/signup"
									className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
								>
									Sign Up
								</Link>
							</>
						) : (
							<>
								{currentUser && currentUser.userType === "admin" && (
									<Link
										to="/admin"
										className="text-indigo-800 hover:text-indigo-600 font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-300"
									>
										Admin Dashboard
									</Link>
								)}
								<Link
									to="/new-post"
									className="text-indigo-800 hover:text-indigo-600 font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-300"
								>
									New Post
								</Link>
								<Link
									to="/showposts"
									className="text-indigo-800 hover:text-indigo-600 font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-300"
								>
									Show Posts
								</Link>
								<Link
									to="/profile"
									className="text-indigo-800 hover:text-indigo-600 font-medium px-4 py-2 rounded-lg hover:bg-indigo-50 transition-all duration-300"
								>
									Profile
								</Link>
								<button
									onClick={handleLogout}
									className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300"
								>
									Logout
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
					<Route
						path="/become-a-companion"
						element={<QualificationTest />}
					/>
					<Route
						path="/training-program"
						element={<TrainingProgram />}
					/>
					<Route path="/admin" element={<Admin />} />
					<Route
						path="/admin/manage-users"
						element={<ManageUsers />}
					/>
					<Route
						path="/admin/manage-groups"
						element={<ManageGroups />}
					/>
					<Route
						path="/admin/manage-reports"
						element={<ManageReport />}
					/>
					<Route path="/new-post" element={<NewPost />} />
					<Route path="/report/:id" element={<NewReport />} />
					<Route path="/showposts" element={<ShowPosts />} />
					<Route
						path="/admin/analytics"
						element={<ManageAnalytics />}
					/>
				</Routes>
			</div>
		</Router>
	);
};

export default App;
