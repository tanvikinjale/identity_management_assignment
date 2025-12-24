import React, { useEffect, useState } from "react";
import { getUserProfile, setUserProfile } from "../Services/repository/UserRepo.js";
import { logout } from "../Services/repository/AuthRepo.js";
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const [profile, setProfile] = useState({});
  const [editedProfile, setEditedProfile] = useState({});
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [errors, setErrors] = useState({});
  const [activeTab, setActiveTab] = useState("profile");

  const navigate = useNavigate();


  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

   useEffect(() => {
  const loadProfile = async () => {
    const data = await getUserProfile(navigate);
    console.log("Fetched profile data:", data);
    if (data) {
      setProfile(data);
      setEditedProfile(data);
    }
  };

  loadProfile();
}, [navigate]);

  const handleEditProfile = () => {
    setEditedProfile({...profile});
    setIsEditingProfile(true);
    setErrors({});
  };

  const handleCancelEdit = () => {
    setIsEditingProfile(false);
    setEditedProfile({...profile});
    setErrors({});
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateProfileEdit = () => {
    const newErrors = {};

    if (!editedProfile.first_name.trim()) newErrors.first_name = "First name is required";
    if (!editedProfile.last_name.trim()) newErrors.last_name = "Last name is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(editedProfile.email)) {
      newErrors.email = "Invalid email address";
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(editedProfile.contact_number)) {
      newErrors.contact_number = "Contact number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
  if (validateProfileEdit()) {
    await setUserProfile(editedProfile);
    setProfile({ ...editedProfile });
    setIsEditingProfile(false);
  }
};



  const handleLogout = async() => {
    if (confirm("Are you sure you want to logout?")) {
      alert("Logged out successfully!");
      await logout(navigate);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 mx-auto rounded-full bg-indigo-100 flex items-center justify-center mb-4">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-indigo-600">
                      {profile?.first_name?.[0]}
                      {profile?.last_name?.[0]}
                    </span>
                  )}

                </div>
                <h3 className="text-xl font-bold text-gray-800">
                  {profile.first_name} {profile.last_name}
                </h3>
                <p className="text-gray-600 text-sm">{profile.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition duration-200 ${
                    activeTab === "profile"
                      ? "bg-indigo-50 text-indigo-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Profile Information
                </button>
                
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>
                  {!isEditingProfile && (
                    <button
                      onClick={handleEditProfile}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                {!isEditingProfile ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-500">First Name</label>
                      <p className="text-lg text-gray-800 mt-1">{profile.first_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Middle Name</label>
                      <p className="text-lg text-gray-800 mt-1">{profile.middle_name || "—"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Last Name</label>
                      <p className="text-lg text-gray-800 mt-1">{profile.last_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="text-lg text-gray-800 mt-1">{profile.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Contact Number</label>
                      <p className="text-lg text-gray-800 mt-1">{profile.contact_number}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Date of Birth</label>
                      <p className="text-lg text-gray-800 mt-1">{profile.birthdate}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">Gender</label>
                      <p className="text-lg text-gray-800 mt-1 capitalize">{profile.gender}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">State</label>
                      <p className="text-lg text-gray-800 mt-1">{profile.state}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-500">Aadhar ID</label>
                      <p className="text-lg text-gray-800 mt-1">{profile.aadhar_id}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="first_name"
                          value={editedProfile.first_name}
                          onChange={handleProfileChange}
                          className={`w-full px-4 py-3 border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none`}
                        />
                        {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Middle Name
                        </label>
                        <input
                          type="text"
                          name="middle_name"
                          value={editedProfile.middle_name}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="last_name"
                          value={editedProfile.last_name}
                          onChange={handleProfileChange}
                          className={`w-full px-4 py-3 border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none`}
                        />
                        {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={editedProfile.email}
                          onChange={handleProfileChange}
                          className={`w-full px-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Number *
                        </label>
                        <input
                          type="tel"
                          name="contact_number"
                          value={editedProfile.contact_number}
                          onChange={handleProfileChange}
                          maxLength="10"
                          className={`w-full px-4 py-3 border ${errors.contact_number ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none`}
                        />
                        {errors.contact_number && <p className="text-red-500 text-sm mt-1">{errors.contact_number}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Gender *
                        </label>
                        <select
                          name="gender"
                          value={editedProfile.gender}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State *
                        </label>
                        <select
                          name="state"
                          value={editedProfile.state}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none"
                        >
                          {indianStates.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={handleSaveProfile}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition duration-200"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;