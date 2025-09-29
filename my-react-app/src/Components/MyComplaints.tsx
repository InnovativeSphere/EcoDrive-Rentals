import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchComplaints,
  deleteComplaint,
  resetStatus,
} from "../redux/complaintSlice";

const MyComplaints: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { complaints, loading, success, error } = useAppSelector(
    (state) => state.complaints
  );
  const { userInfo } = useAppSelector((state) => state.user);

  const [deleteId, setDeleteId] = useState<string | null>(null);

  // 🔒 Redirect if not logged in
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  // 📜 Fetch complaints on mount
  useEffect(() => {
    dispatch(fetchComplaints());
  }, [dispatch]);

  // 🔄 Reset status after 3s (like toast)
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => dispatch(resetStatus()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      dispatch(deleteComplaint(deleteId));
      setDeleteId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 text-white">
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-red-600">My</span> Complaints
          </h1>
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            ← Back
          </Link>
        </div>

        {/* Loading */}
        {loading && <p className="text-center text-blue-400">Loading...</p>}

        {/* Success & Error */}
        {success && (
          <p className="text-center text-green-400 mb-4">
            ✅ Operation successful
          </p>
        )}
        {error && <p className="text-center text-red-400 mb-4">❌ {error}</p>}

        {/* Empty state */}
        {!loading && complaints.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl mb-4">No complaints found</p>
            <Link
              to="/complaint-form"
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md"
            >
              Submit a Complaint
            </Link>
          </div>
        )}

        {/* Complaints list */}
        {!loading && complaints.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {complaints.map((c) => (
              <div
                key={c._id}
                className="bg-gray-700 rounded-lg p-6 border border-gray-600 hover:border-red-600 transition"
              >
                <h2 className="text-xl font-semibold mb-2">
                  {c.subject || "No Subject"}
                </h2>
                <p className="text-gray-300 mb-4">{c.message}</p>

                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <span>
                    📅 {new Date(c.createdAt || "").toLocaleDateString()}
                  </span>
                  <span>
                    🏷 {c.status || "pending"}
                  </span>
                </div>

                <div className="flex gap-3">
                  <Link
                    to={`/complaints/edit/${c._id}`}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md w-full text-center"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => c._id && handleDelete(c._id)}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md w-full"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this complaint?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyComplaints;
