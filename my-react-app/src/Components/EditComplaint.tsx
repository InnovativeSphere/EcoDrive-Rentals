import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  fetchComplaints,
  updateComplaint,
  deleteComplaint,
  resetStatus,
} from "../redux/complaintSlice";
import { MdOutlineArrowBack, MdDeleteForever } from "react-icons/md";

const EditComplaint: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { complaints, loading, success, error } = useAppSelector(
    (state) => state.complaints
  );
  const { userInfo } = useAppSelector((state) => state.user);

  // ✅ Redirect if not logged in
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  // ✅ Fetch complaints if not loaded
  useEffect(() => {
    if (complaints.length === 0) {
      dispatch(fetchComplaints());
    }
  }, [dispatch, complaints.length]);

  // ✅ Find complaint by ID
  const complaint = complaints.find((c) => c._id === id);

  // ✅ Local form state
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    status: "pending",
    priority: "Normal",
  });

  // ✅ Pre-fill when complaint loads
  useEffect(() => {
    if (complaint) {
      setFormData({
        subject: complaint.subject || "",
        message: complaint.message || "",
        status: complaint.status || "pending",
        priority: complaint.priority || "Normal",
      });
    }
  }, [complaint]);

  // ✅ Reset success/error after 3s
  useEffect(() => {
    if (success || error) {
      const t = setTimeout(() => dispatch(resetStatus()), 3000);
      return () => clearTimeout(t);
    }
  }, [success, error, dispatch]);

  // ✅ Handle field change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Save update
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    dispatch(updateComplaint({ id, updatedData: formData }))
      .unwrap()
      .then(() => navigate("/my-complaints"));
  };

  // ✅ Delete complaint
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this complaint?")) {
      dispatch(deleteComplaint(id!))
        .unwrap()
        .then(() => navigate("/my-complaints"));
    }
  };

  if (loading && !complaint) {
    return <p className="text-center text-blue-400 mt-20">Loading complaint...</p>;
  }

  if (!complaint) {
    return (
      <div className="text-center mt-20 text-red-400">
        <p>❌ Complaint not found.</p>
        <Link to="/my-complaints" className="text-blue-400 underline">
          Back to My Complaints
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 text-white">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-700">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">
            ✏️ Edit <span className="text-red-500">Complaint</span>
          </h1>
          <Link
            to="/my-complaints"
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            <MdOutlineArrowBack /> Back
          </Link>
        </div>

        {/* ✅ Feedback */}
        {success && (
          <p className="text-green-400 mb-4 text-center">✅ Complaint updated successfully!</p>
        )}
        {error && <p className="text-red-400 mb-4 text-center">❌ {error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-red-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Priority</label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-red-500"
            >
              <option value="Low">Low</option>
              <option value="Normal">Normal</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold w-1/2 mr-4"
              disabled={loading}
            >
              {loading ? "Saving..." : "💾 Save Changes"}
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold w-1/2 flex items-center justify-center gap-2"
            >
              <MdDeleteForever /> Delete Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditComplaint;
