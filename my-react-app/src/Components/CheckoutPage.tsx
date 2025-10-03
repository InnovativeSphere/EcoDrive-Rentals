// src/components/CheckoutPage.tsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import axios from "axios";
import {
  MdOutlineCalendarToday,
  MdElectricCar,
  MdOutlineLocalGasStation,
  MdAttachMoney,
  MdArrowBack,
  MdInfoOutline,
} from "react-icons/md";

interface ElectricCar {
  id: number;
  make: string;
  model: string;
  year: number;
  range: string;
  images: string[];
  description: string;   // ✅ fixed: should be string, not string[]
  features: string[];
  pricePerDay: number;
  seatingCapacity: number;
  batteryCapacity: string;
}

interface MechanicalCar {
  id: number;
  make: string;
  model: string;
  year: number;
  images: string[];
  description: string;   // ✅ fixed: should be string, not string[]
  features: string[];
  pricePerDay: number;
  seatingCapacity: number;
  engineType: string;
  horsepower: number;
}

type Car = ElectricCar | MechanicalCar;

function isElectricCar(car: Car): car is ElectricCar {
  return (car as ElectricCar).range !== undefined;
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const car = location.state?.car as Car | undefined;

  const user = useSelector((state: RootState) => state.user.userInfo);

  const [pickupDate, setPickupDate] = useState<string>("");
  const [returnDate, setReturnDate] = useState<string>("");
  const [pickupLocation, setPickupLocation] = useState<string>(
    "EcoDrive Main Office"
  );
  const [returnLocation, setReturnLocation] = useState<string>(
    "EcoDrive Main Office"
  );
//   const [cardNumber, setCardNumber] = useState<string>("");
//   const [expiryDate, setExpiryDate] = useState<string>("");
//   const [cvv, setCvv] = useState<string>("");

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (!user) {
      alert("You need to be logged in to access the checkout page.");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    if (!car) {
      alert("No car selected. Please go back and select a car.");
      navigate("/cars");
    }
  }, [user, car, navigate, location.pathname]);

  const calculateRentalDuration = () => {
    if (!pickupDate || !returnDate) return 0;
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const rentalDuration = calculateRentalDuration();
  const totalPrice = car ? car.pricePerDay * rentalDuration : 0;

  // ✅ Handle booking with backend call
 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!car || !user) return;

  try {
    const newRental = {
      user: user._id,          // 🔥 add this line
      carId: car.id,           // required
      startDate: pickupDate,   // required
      endDate: returnDate,     // required
      totalCost: totalPrice,   // required
      status: "active",
    };

    console.log("Car object:", car);
    console.log("New rental payload:", newRental);

    await axios.post("https://ecodrive-rentals.onrender.com/api/rentals", newRental, {
      headers: { Authorization: `Bearer ${user.token}` },
    });

    alert("Booking successful!");
    navigate("/dashboard");
  } catch (error: any) {
    console.error(error);
    alert(error.response?.data?.message || "Booking failed.");
  }
};


  if (!user || !car) return null;

  const electric = isElectricCar(car);

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-8">
        {/* Back Button */}
        <div className="pb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300"
          >
            <MdArrowBack className="mr-2" /> Back to Car Details
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-white text-center mb-8">
          Complete Your <span className="text-red-500">Booking</span>
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Car Details */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
              <MdInfoOutline className="mr-3 text-red-400" /> Car Details
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={car.images[0]}
                alt={`${car.make} ${car.model}`}
                className="w-32 h-24 object-cover rounded-md shadow-lg"
              />
              <div>
                <p className="text-2xl font-semibold">
                  {car.make} {car.model} ({car.year})
                </p>
                <div className="flex items-center text-lg text-gray-300 mt-1">
                  {electric ? (
                    <MdElectricCar className="mr-2 text-red-400" />
                  ) : (
                    <MdOutlineLocalGasStation className="mr-2 text-blue-400" />
                  )}
                  <span>{electric ? "Electric" : "Mechanical"}</span>
                  <MdAttachMoney className="ml-4 mr-2 text-green-400" />
                  <span>{car.pricePerDay} / day</span>
                </div>
              </div>
            </div>
          </section>

          {/* Rental Info */}
          <section className="bg-gray-700 p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-white mb-4 flex items-center">
              <MdOutlineCalendarToday className="mr-3 text-red-400" /> Rental
              Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">Pickup Date</label>
                <input
                  type="date"
                  value={pickupDate}
                  min={today}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-600 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-2">Return Date</label>
                <input
                  type="date"
                  value={returnDate}
                  min={pickupDate || today}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-600 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-2">Pickup Location</label>
                <input
                  type="text"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-600 rounded-md"
                />
              </div>
              <div>
                <label className="block mb-2">Return Location</label>
                <input
                  type="text"
                  value={returnLocation}
                  onChange={(e) => setReturnLocation(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-600 rounded-md"
                />
              </div>
            </div>
          </section>

          {/* Total */}
          <div className="mt-10 flex justify-between bg-red-800 bg-opacity-30 p-6 rounded-lg">
            <div>
              <p className="text-xl">Rental Duration:</p>
              <p className="text-3xl font-bold">{rentalDuration} days</p>
            </div>
            <div>
              <p className="text-xl">Total Price:</p>
              <p className="text-3xl font-bold">${totalPrice.toFixed(2)}</p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-8 py-4 rounded-full font-semibold text-2xl shadow-lg bg-red-600 hover:bg-red-700 text-white transition-colors duration-300"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
