import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [successMessage, setSuccessMessage] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        newPassword: "",
        profile: {
            gender: "",
            genderPreference: "",
            problemAreas: [],
            language: [],
            ageRange: "",
            bio: ""
        }
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in to view this page.");
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                console.log(token)
                const response = await axios.get("http://localhost:5000/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const user = response.data.user;
                console.log(user)
                setProfile(user);
                setFormData({
                    name: user.name,
                    email: user.email,
                    profile: {
                        gender: user.profile.gender,
                        genderPreference: user.profile.genderPreference,
                        problemAreas: user.profile.problemAreas,
                        language: user.profile.language,
                        ageRange: user.profile.ageRange,
                        bio: user.profile.bio
                    },
                    password: "",
                    newPassword: ""
                });
                console.log(user);
                console.log(formData);
                setError(null);
            } catch (err) {
                setError("Failed to load profile. Please log in again.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('profile.')) {
            const profileField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                profile: {
                    ...prev.profile,
                    [profileField]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put("http://localhost:5000/profile", formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProfile(response.data.user);
            setIsEditing(false);
            setError(null);
            setSuccessMessage("Profile updated successfully!");
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.message || "Invalid data. Please check your inputs.");
            } else {
                setError("Failed to update profile. Please try again.");
            }
        }
    };
    if (loading) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-500 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden">
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4" role="alert">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}
                {successMessage && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4" role="alert">
                        <p className="text-green-700">{successMessage}</p>
                    </div>
                )}
                
                <div className="md:flex">
                    <div className="md:w-1/3 bg-gradient-to-b from-fuchsia-500 via-purple-500 to-indigo-500 p-8 text-white">
                        <div className="text-center">
                            {!isEditing && (
                                <>
                                    <h2 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-pink-200">{profile?.name}</h2>
                                    <p className="text-pink-100 mb-6">{profile?.email}</p>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="w-full px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/30 transition-all duration-300"
                                    >
                                        Edit Profile
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="md:w-2/3 p-8">
                        {isEditing ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Name"
                                        className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                                    />
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <select
                                            name="profile.gender"
                                            value={formData.profile.gender}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:ring-2 focus:ring-purple-400"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                        
                                        <select
                                            name="profile.genderPreference"
                                            value={formData.profile.genderPreference}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:ring-2 focus:ring-purple-400"
                                        >
                                            <option value="">Preferred Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="any">Any</option>
                                        </select>
                                    </div>

                                    <select
                                        name="profile.ageRange"
                                        value={formData.profile.ageRange}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:ring-2 focus:ring-purple-400"
                                    >
                                        <option value="">Select Age Range</option>
                                        <option value="18-24">18-24</option>
                                        <option value="25-34">25-34</option>
                                        <option value="35-44">35-44</option>
                                        <option value="45+">45+</option>
                                    </select>

                                    <textarea
                                        name="profile.bio"
                                        value={formData.profile.bio}
                                        onChange={handleChange}
                                        placeholder="Bio"
                                        rows="4"
                                        className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:ring-2 focus:ring-purple-400"
                                    />

                                    <div className="space-y-4">
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Current Password"
                                            className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:ring-2 focus:ring-purple-400"
                                        />
                                        <input
                                            type="password"
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            placeholder="New Password (optional)"
                                            className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:ring-2 focus:ring-purple-400"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300"
                                >
                                    Save Changes
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Profile Information</h3>
                                    <p className="text-gray-600">Gender: {profile?.profile?.gender || 'Not specified'}</p>
                                    <p className="text-gray-600">Preferred Gender: {profile?.profile?.genderPreference || 'Not specified'}</p>
                                    <p className="text-gray-600">Age Range: {profile?.profile?.ageRange || 'Not specified'}</p>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Bio</h3>
                                    <p className="text-gray-600">{profile?.profile?.bio || 'No bio provided'}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;