// src/Components/Profile.tsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdOutlinePerson,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineWc,
  MdOutlineLocationOn,
  MdOutlineLock,
  MdOutlineDeleteForever,
} from "react-icons/md";
import ProfileField from "../Components/ProfileField";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  logoutUser, // ✅ updated
  updateUser,
  deleteUser,
  resetAuthStatus,
} from "../redux/userSlice";

// Helper function to format dates
const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "N/A";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Invalid Date";
  }
};

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, success, error, message } = useAppSelector(
    (state: { user: any }) => state.user
  );

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formData, setFormData] = useState<Partial<typeof userInfo>>({
    firstName: userInfo?.firstName || "",
    lastName: userInfo?.lastName || "",
    email: userInfo?.email || "",
    phoneNumber: userInfo?.phoneNumber || "",
    address: userInfo?.address || "",
    gender: userInfo?.gender || "",
    dob: userInfo?.dob || "",
  });

  // Sync formData with userInfo after updates
  useEffect(() => {
    if (userInfo) {
      setFormData({
        firstName: userInfo.firstName || "",
        lastName: userInfo.lastName || "",
        email: userInfo.email || "",
        phoneNumber: userInfo.phoneNumber || "",
        address: userInfo.address || "",
        gender: userInfo.gender || "",
        dob: userInfo.dob || "",
      });
    }
  }, [userInfo]);

  // Reset status after 3s
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => dispatch(resetAuthStatus()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const token = userInfo?.token || localStorage.getItem("token");
    if (userInfo?._id && token) {
      dispatch(
        updateUser({
          id: userInfo._id,
          updates: formData,
          token,
        })
      );
    }
  };

  const handleDeleteProfile = () => {
    const token = userInfo?.token || localStorage.getItem("token");
    if (userInfo?._id && token) {
      dispatch(deleteUser({ id: userInfo._id, token }))
        .unwrap()
        .then(() => {
          // ✅ Use logoutUser thunk to clear everything (user + complaints)
          dispatch(logoutUser());
          navigate("/");
        })
        .catch((err: any) => console.error("Delete error:", err));
    }
  };

  if (!userInfo && !loading) {
    return (
      <div className="bg-gray-900 text-gray-300 min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center border border-gray-700">
          <h1 className="text-3xl font-extrabold text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-400 mb-6">
            User data not found. Please log in to view your profile.
          </p>
          <Link
            to="/login"
            className="bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-700"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const userInitials =
    userInfo?.firstName && userInfo?.lastName
      ? `${userInfo.firstName[0]}${userInfo.lastName[0]}`
      : userInfo?.username?.[0] || "NA";

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 text-white">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
        <h1 className="text-4xl font-bold text-center mb-8">
          Your <span className="text-red-600">Profile</span>
        </h1>

        {loading && (
          <p className="text-center text-blue-400 mb-4">
            {isEditing ? "Saving changes..." : "Loading profile..."}
          </p>
        )}
        {success && <p className="text-center text-green-400">{message}</p>}
        {error && <p className="text-center text-red-400">{message}</p>}

        {/* Avatar */}
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="w-36 h-36 rounded-full border-4 border-red-600 flex items-center justify-center bg-gray-700 text-5xl font-bold text-red-500">
            {userInitials}
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-semibold">
              {userInfo?.firstName} {userInfo?.lastName}
            </h2>
            <p className="text-gray-400">
              Member Since: {formatDate(userInfo?.createdAt)}
            </p>
            <div className="mt-4 flex gap-4 justify-center">
              <button
                type="button"
                onClick={() => setIsEditing(!isEditing)}
                className="px-6 py-2 bg-red-600 rounded-full"
              >
                {isEditing ? "Cancel Edit" : "Edit Profile"}
              </button>
              {isEditing && (
                <button
                  type="submit"
                  form="profile-form"
                  className="px-6 py-2 bg-green-600 rounded-full"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Info */}
        <form id="profile-form" onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileField
              label="Username"
              value={userInfo?.username || ""}
              name="username"
              icon={<MdOutlinePerson className="text-red-600" />}
              isEditing={false}
            />
            <ProfileField
              label="First Name"
              value={formData.firstName || ""}
              name="firstName"
              icon={<MdOutlinePerson className="text-red-600" />}
              isEditing={isEditing}
              onChange={handleChange}
              type="text"
            />
            <ProfileField
              label="Last Name"
              value={formData.lastName || ""}
              name="lastName"
              icon={<MdOutlinePerson className="text-red-600" />}
              isEditing={isEditing}
              onChange={handleChange}
              type="text"
            />
            <ProfileField
              label="Email"
              value={formData.email || ""}
              name="email"
              icon={<MdOutlineEmail className="text-red-600" />}
              isEditing={false}
            />
            <ProfileField
              label="Phone Number"
              value={formData.phoneNumber || ""}
              name="phoneNumber"
              icon={<MdOutlinePhone className="text-red-600" />}
              isEditing={isEditing}
              onChange={handleChange}
            />
            <ProfileField
              label="Gender"
              value={userInfo?.gender || ""}
              name="gender"
              icon={<MdOutlineWc className="text-red-600" />}
              isEditing={false}
            />
            <ProfileField
              label="Address"
              value={formData.address || ""}
              name="address"
              icon={<MdOutlineLocationOn className="text-red-600" />}
              isEditing={isEditing}
              onChange={handleChange}
            />
          </div>
        </form>

        {/* Account Management */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <h2 className="text-2xl font-semibold mb-6">Account Management</h2>
          <div className="space-y-4">
            <Link
              to="/change-password"
              className="flex items-center p-4 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              <MdOutlineLock className="text-xl mr-3 text-blue-400" />
              Change Password
            </Link>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full flex items-center p-4 bg-red-700 rounded-lg hover:bg-red-800"
            >
              <MdOutlineDeleteForever className="text-xl mr-3" />
              Delete Account
            </button>
          </div>
        </div>

        {/* Delete Modal */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl text-center border border-gray-700">
              <h3 className="text-xl font-bold mb-4">
                Confirm Account Deletion
              </h3>
              <p className="text-gray-300 mb-6">
                Are you sure? This action cannot be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDeleteProfile}
                  className="bg-red-600 py-2 px-5 rounded-md"
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-gray-600 py-2 px-5 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
