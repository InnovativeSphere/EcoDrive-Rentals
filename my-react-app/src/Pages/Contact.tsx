import React, { useState } from "react";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../redux/store";
import { submitComplaint } from "../redux/complaintSlice";
import type { ComplaintFormData } from "../redux/userTypes";

const Contact: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector(
    (state: RootState) => state.complaints
  );

  // ✅ use ComplaintFormData instead of Omit<Complaint, "_id">
  const [formData, setFormData] = useState<ComplaintFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  // Ensure correct type
  const resultAction = await dispatch(submitComplaint(formData));

  if (submitComplaint.fulfilled.match(resultAction)) {
    setShowModal(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  } else if (submitComplaint.rejected.match(resultAction)) {
    console.error("Complaint submission failed:", resultAction.payload);
  }
};


  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/my-complaints");
  };

  const sectionClasses = "py-16 md:py-24";
  const containerClasses = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
  const inputClasses =
    "w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600";
  const buttonClasses =
    "w-full bg-red-600 text-white font-bold py-3 px-6 rounded-md hover:bg-red-700 transition-colors duration-300 text-lg";

  return (
    <div className="bg-gray-900 text-gray-300">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-96 flex items-center justify-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1549490218-1c4b184f4204?auto=format&fit=crop&w=2070&q=80")',
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300">
            We're here to help and answer any question you might have.
          </p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className={`${sectionClasses} bg-gray-800`}>
        <div className={containerClasses}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-700">
              <h2 className="text-3xl font-bold mb-8 text-white">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-gray-400 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-400 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-400 text-sm font-bold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={inputClasses}
                    placeholder="Regarding your rental..."
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-400 text-sm font-bold mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClasses} resize-y`}
                    placeholder="Tell us how we can help..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`${buttonClasses} ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {error && (
                  <p className="text-red-500 text-center font-semibold">
                    Failed to submit complaint. Try again.
                  </p>
                )}
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-white">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-red-600 text-3xl mt-1 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white text-xl mb-1">Our Location</h3>
                    <p className="text-lg">123 EcoDrive Lane, Greenville, GA</p>
                    <p className="text-lg">United States</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-red-600 text-3xl mr-4" />
                  <div>
                    <h3 className="font-bold text-white text-xl mb-1">Phone Number</h3>
                    <a href="tel:+15551234567" className="text-lg text-gray-300 hover:text-white">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="text-red-600 text-3xl mr-4" />
                  <div>
                    <h3 className="font-bold text-white text-xl mb-1">Email Address</h3>
                    <a href="mailto:info@ecodriverentals.com" className="text-lg text-gray-300 hover:text-white">
                      info@ecodriverentals.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaClock className="text-red-600 text-3xl mt-1 mr-4" />
                  <div>
                    <h3 className="font-bold text-white text-xl mb-1">Business Hours</h3>
                    <p className="text-lg">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-lg">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-lg">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl p-8 max-w-md w-full shadow-lg border border-gray-700 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">✅ Thank You!</h2>
            <p className="text-gray-300 mb-6 text-lg">
              Your complaint has been submitted successfully. Our support team will reach out soon.
            </p>
            <button
              onClick={handleCloseModal}
              className="bg-red-600 text-white py-2 px-6 rounded-md hover:bg-red-700 transition"
            >
              View My Complaints
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
