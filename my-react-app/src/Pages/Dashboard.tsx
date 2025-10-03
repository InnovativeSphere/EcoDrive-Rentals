import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../redux/store";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaCar, FaClock, FaCheckCircle, FaCircle, FaInfo } from "react-icons/fa";

interface Rental {
  _id: string;
  carId: number;
  startDate: string;
  endDate: string;
  totalCost: number;
  status: string;
  car?: {
    id: number;
    name: string;
    image: string;
    pricePerDay: number;
  } | null;
}

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.userInfo);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRentals = async () => {
      if (!user?.token) return;
      try {
        const { data } = await axios.get("http://localhost:5000/api/rentals", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setRentals(data);
      } catch (error) {
        console.error("Error fetching rentals:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRentals();
  }, [user]);

  if (!user) {
    return (
      <div className="bg-gray-900 text-gray-300 min-h-screen flex items-center justify-center">
        <div className="bg-gray-800 p-8 md:p-12 rounded-lg shadow-xl w-full max-w-md border border-gray-700 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Access Denied
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            User data not found. Please log in to view your dashboard.
          </p>
          <Link
            to="/login"
            className="w-full inline-block bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-700"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const activeCount = rentals.filter((r) => r.status === "active").length;
  const completedCount = rentals.filter((r) => r.status === "completed").length;

  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen p-8 relative">
      <div className="max-w-6xl mx-auto py-8 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-12">
          Welcome Back, <span className="text-red-500">{user.firstName}</span>
        </h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 text-center hover:shadow-red-500/20 transition">
            <FaCar className="w-10 h-10 mx-auto text-red-500 mb-3" />
            <h3 className="text-2xl font-bold">{rentals.length}</h3>
            <p className="text-gray-400">Total Rentals</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 text-center hover:shadow-blue-500/20 transition">
            <FaClock className="w-10 h-10 mx-auto text-blue-500 mb-3" />
            <h3 className="text-2xl font-bold">{activeCount}</h3>
            <p className="text-gray-400">Active Rentals</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 text-center hover:shadow-green-500/20 transition">
            <FaCheckCircle className="w-10 h-10 mx-auto text-green-500 mb-3" />
            <h3 className="text-2xl font-bold">{completedCount}</h3>
            <p className="text-gray-400">Completed Rentals</p>
          </div>
        </div>

        {/* Rental History */}
        <section>
          <h2 className="text-3xl font-semibold mb-8 text-white border-b border-gray-700 pb-4">
            Rental History
          </h2>

          {loading ? (
            <p className="text-gray-400">Loading rentals...</p>
          ) : rentals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rentals.map((rental) => (
                <div
                  key={rental._id}
                  className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg hover:shadow-red-500/20 transition transform hover:-translate-y-1"
                >
                  {rental.car && (
                    <img
                      src={rental.car.image}
                      alt={rental.car.name}
                      className="w-full h-40 object-cover rounded-t-xl"
                    />
                  )}
                  <div className="p-5 space-y-3">
                    <h3 className="text-xl font-bold text-white">
                      {rental.car ? rental.car.name : `Car #${rental.carId}`}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      <span className="font-semibold text-gray-300">Dates:</span>{" "}
                      {new Date(rental.startDate).toLocaleDateString()} -{" "}
                      {new Date(rental.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-gray-400 text-sm">
                      <span className="font-semibold text-gray-300">
                        Total Cost:
                      </span>{" "}
                      ${rental.totalCost}
                    </p>

                    {/* Status Badge */}
                    <div className="mt-3 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                          rental.status === "completed"
                            ? "bg-green-600 text-white"
                            : rental.status === "active"
                            ? "bg-blue-600 text-white"
                            : "bg-yellow-600 text-white"
                        }`}
                      >
                        {rental.status === "completed" && <FaCheckCircle size={16} />}
                        {rental.status === "active" && <FaClock size={16} />}
                        {rental.status === "cancelled" && <FaCircle size={16} />}
                        {rental.status}
                      </span>

                      {/* ✅ View Details Button */}
                      <Link
                        to={`/rental/${rental._id}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-400 transition"
                      >
                        <FaInfo /> View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-800 rounded-lg p-8 shadow-xl border border-gray-700 text-center">
              <p className="text-gray-400 text-lg mb-4">
                No rentals found. Start your first booking today.
              </p>
              <Link
                to="/categories"
                className="inline-block bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
              >
                Start a New Rental
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
