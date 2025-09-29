// src/components/RentalDetails.tsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import {
  MdOutlineArrowBack,
  MdOutlineAccessTime,
  MdCancel,
} from "react-icons/md";
import { allCars } from "../mockData";

interface RentalFromApi {
  _id: string;
  carId: number;
  startDate: string;
  endDate: string;
  totalCost: number;
  status: "active" | "completed" | "cancelled" | string;
  createdAt?: string;
  // optional enriched car object (if backend added it)
  car?: {
    id: number;
    name?: string;
    image?: string;
    pricePerDay?: number;
    make?: string;
    model?: string;
  } | null;
}

const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;

const formatTwo = (n: number) => String(n).padStart(2, "0");

const msToHms = (ms: number) => {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (days > 0) {
    return `${days}d ${formatTwo(hours)}:${formatTwo(minutes)}:${formatTwo(
      seconds
    )}`;
  }
  return `${formatTwo(hours)}:${formatTwo(minutes)}:${formatTwo(seconds)}`;
};

const RentalDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const user = useSelector((s: RootState) => s.user.userInfo);

  const [rental, setRental] = useState<RentalFromApi | null>(null);
  const [loading, setLoading] = useState(true);
  const [countdownMs, setCountdownMs] = useState<number | null>(null); // positive => time left to cancel, negative => elapsed beyond 12h
  const [intervalTick, setIntervalTick] = useState(0); // used to trigger re-render each second
  const [showConfirm, setShowConfirm] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch rentals and pick the one matching param id
  useEffect(() => {
    const fetch = async () => {
      if (!user?.token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const { data } = await axios.get<RentalFromApi[]>(
          "http://localhost:5000/api/rentals",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const found = data.find((r) => r._id === id);
        if (!found) {
          setToast({ type: "error", message: "Rental not found." });
          setRental(null);
        } else {
          setRental(found);
        }
      } catch (err: any) {
        console.error("Error fetching rental:", err);
        setToast({
          type: "error",
          message: err.response?.data?.message || "Failed to load rental.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user?.token]);

  // Timer interval to update countdown/elapsed every second
  useEffect(() => {
    const timer = setInterval(() => {
      setIntervalTick((t) => t + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // compute countdownMs based on rental.createdAt (or startDate fallback)
  useEffect(() => {
    if (!rental) {
      setCountdownMs(null);
      return;
    }
    const createdAt = rental.createdAt
      ? new Date(rental.createdAt).getTime()
      : new Date(rental.startDate).getTime();
    const elapsed = Date.now() - createdAt;
    const remaining = TWELVE_HOURS_MS - elapsed;
    setCountdownMs(remaining); // positive => time left, negative => passed
  }, [rental, intervalTick]);

  // Toast auto-hide
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(t);
  }, [toast]);

  const canCancel = useMemo(() => {
    if (!rental) return false;
    if (rental.status !== "active") return false;
    return (countdownMs ?? 0) > 0;
  }, [rental, countdownMs]);

  // Progress (0-100) for 12h cancel window
  const cancelProgress = useMemo(() => {
    if (!rental) return 0;
    const createdAt = rental.createdAt
      ? new Date(rental.createdAt).getTime()
      : new Date(rental.startDate).getTime();
    const elapsed = Date.now() - createdAt;
    const percent = Math.min(
      100,
      Math.max(0, (elapsed / TWELVE_HOURS_MS) * 100)
    );
    return percent;
  }, [rental, intervalTick]);

  const handleCancel = async () => {
    if (!rental || !user?.token) return;
    setActionLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/rentals/${rental._id}/cancel`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      // update rental locally
      setRental((r) => (r ? { ...r, status: "cancelled" } : r));
      setShowConfirm(false);
      setToast({
        type: "success",
        message: res.data?.message || "Rental cancelled",
      });
    } catch (err: any) {
      console.error("Cancel error:", err);
      setToast({
        type: "error",
        message: err.response?.data?.message || "Cancel failed",
      });
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-300 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-700">
          <p className="text-lg">Loading rental details...</p>
        </div>
      </div>
    );
  }

  if (!rental) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-300 flex items-center justify-center p-8">
        <div className="bg-gray-800 p-10 rounded-lg shadow-xl border border-gray-700 text-center">
          <h2 className="text-2xl font-bold mb-3">Rental Not Found</h2>
          <p className="text-gray-400 mb-6">
            We couldn't locate this rental. It may have been removed.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-red-600 rounded-md text-white"
            >
              Go Back
            </button>
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-gray-700 rounded-md text-white border border-gray-600"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const carName = rental.car
    ? rental.car.name || `Car #${rental.car.id}`
    : `Car #${rental.carId}`;
  const matchedCar = allCars.find((c) => c.id === rental.carId);

  const carImage = matchedCar?.images || "/placeholder-car.jpg";
  const createdAtToUse = rental.createdAt ?? rental.startDate;
  const createdAtDate = new Date(createdAtToUse);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 py-12 px-4">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed right-6 top-6 z-50 transform transition-all duration-300 ${
            toast ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
          role="status"
        >
          <div
            className={`px-5 py-3 rounded-lg shadow-lg ${
              toast.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {toast.message}
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition"
              aria-label="Go back"
            >
              <MdOutlineArrowBack className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-3xl font-extrabold text-white">{carName}</h1>
              <p className="text-sm text-gray-400">
                Rented: {createdAtDate.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Status</span>
            <span
              className={`px-3 py-1 rounded-full font-semibold text-sm ${
                rental.status === "completed"
                  ? "bg-green-600 text-white"
                  : rental.status === "active"
                  ? "bg-blue-600 text-white"
                  : "bg-yellow-600 text-white"
              }`}
            >
              {rental.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Left column: image */}
          <div className="lg:col-span-1">
            <div className="rounded-xl overflow-hidden border border-gray-700 shadow">
              <img
                src={carImage[0]}
                alt={carName}
                className="w-full h-64 object-cover"
              />
              <div className="p-4 bg-gray-900">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold">
                      {rental.car?.pricePerDay
                        ? `$${rental.car.pricePerDay}/day`
                        : "Pricing"}
                    </p>
                    <p className="text-xs text-gray-400">
                      Total booked: ${rental.totalCost}
                    </p>
                  </div>
                  <div className="text-right text-xs text-gray-400">
                    <p>Pickup</p>
                    <p className="font-semibold">
                      {new Date(rental.startDate).toLocaleDateString()}
                    </p>
                    <p className="mt-2">Return</p>
                    <p className="font-semibold">
                      {new Date(rental.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* quick actions */}
            <div className="mt-4 space-y-3">
              <Link
                to={`/car/${rental.carId}`}
                className="block text-center px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
              >
                View Car Details
              </Link>
              <Link to="/categories">
                <button
                  onClick={() => {
                    // Book again - navigate to the car's page
                    navigate(`/cars/${rental.carId}`, {
                      state: { preselect: true },
                    });
                  }}
                  className="w-full px-4 py-2 bg-red-600 rounded-md hover:bg-red-700 text-white"
                >
                  Book Again
                </button>
              </Link>
            </div>
          </div>

          {/* Middle column: timers, progress, details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress + Countdown */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Cancellation Window</h3>
                <div className="flex items-center gap-2 text-gray-400">
                  <MdOutlineAccessTime className="w-5 h-5" />
                  <span className="text-sm">
                    {countdownMs !== null && countdownMs > 0
                      ? "Time left to cancel"
                      : "Cancellation window closed"}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-700">
                <div
                  className="h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${cancelProgress}%`,
                    background:
                      countdownMs !== null && countdownMs > 0
                        ? "linear-gradient(90deg,#f43f5e,#fb7185)"
                        : "#10b981",
                  }}
                />
              </div>

              {/* timer text */}
              <div className="mt-4 flex items-center justify-between">
                <div>
                  {countdownMs !== null && countdownMs > 0 ? (
                    <div className="text-2xl font-bold">
                      {msToHms(countdownMs)}
                      <div className="text-sm text-gray-400">
                        remaining to cancel
                      </div>
                    </div>
                  ) : (
                    <div className="text-2xl font-bold">
                      {msToHms(Math.abs(countdownMs ?? 0))}
                      <div className="text-sm text-gray-400">
                        elapsed since 12h window
                      </div>
                    </div>
                  )}
                </div>

                {/* Cancel button */}
                <div>
                  <button
                    disabled={!canCancel || actionLoading}
                    onClick={() => setShowConfirm(true)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition ${
                      canCancel
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-gray-700 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <MdCancel className="w-5 h-5" />
                    Cancel Rental
                  </button>
                </div>
              </div>
            </div>

            {/* Rental details */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-sm">
              <h3 className="text-xl font-semibold mb-3">Rental Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <div className="text-gray-400">Rental ID</div>
                  <div className="font-medium text-white">{rental._id}</div>
                </div>
                <div>
                  <div className="text-gray-400">Vehicle</div>
                  <div className="font-medium text-white">{carName}</div>
                </div>
                <div>
                  <div className="text-gray-400">Start</div>
                  <div className="font-medium text-white">
                    {new Date(rental.startDate).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">End</div>
                  <div className="font-medium text-white">
                    {new Date(rental.endDate).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Total Cost</div>
                  <div className="font-medium text-white">
                    ${rental.totalCost}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Booked On</div>
                  <div className="font-medium text-white">
                    {createdAtDate.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer actions */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Need help?{" "}
                <Link to="/support" className="text-red-500 underline">
                  Contact support
                </Link>
              </div>
              <div>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md border border-gray-700 shadow-lg">
            <h3 className="text-xl font-semibold mb-3">Confirm Cancellation</h3>
            <p className="text-gray-400 mb-6">
              Cancelling this booking will mark it as <strong>cancelled</strong>
              . This action can only be done within the first 12 hours of
              booking.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600"
              >
                Go Back
              </button>
              <button
                onClick={handleCancel}
                disabled={actionLoading || !canCancel}
                className={`px-4 py-2 rounded-md text-white font-semibold ${
                  canCancel
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-700 cursor-not-allowed"
                }`}
              >
                {actionLoading ? "Cancelling..." : "Confirm Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalDetails;
