import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // Import Link
import { findCarById } from "../mockData";
import {
  MdElectricCar,
  MdOutlineLocalGasStation,
  MdAttachMoney,
  MdAirlineSeatReclineExtra,
  MdOutlineSpeed,
  MdEngineering,
  MdFlashOn,
  MdOutlineBatteryChargingFull,
  MdInfoOutline,
  MdChevronLeft,
  MdChevronRight,
  MdArrowBack,
} from "react-icons/md";

interface ElectricCar {
  id: number;
  make: string;
  model: string;
  year: number;
  range: string;
  images: string[];
  description: string;
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
  description: string;
  features: string[];
  pricePerDay: number;
  seatingCapacity: number;
  engineType: string;
  horsepower: number;
}

function isElectricCar(car: ElectricCar | MechanicalCar): car is ElectricCar {
  return (car as ElectricCar).range !== undefined;
}

const CarDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const carId = id ? parseInt(id, 10) : undefined;
  const car = carId !== undefined ? findCarById(carId) : undefined;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!car || car.images.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car.images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [car, car?.images.length]);

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center p-8">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Car Not Found</h2>
          <p className="text-lg mb-8">
            The car you are looking for does not exist.
          </p>
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg
                       transition-colors duration-300 flex items-center justify-center mx-auto"
          >
            <MdArrowBack className="mr-2" /> Go Back
          </button>
        </div>
      </div>
    );
  }

  const electric = isElectricCar(car);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % car.images.length);
  };

  const goToPreviousImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + car.images.length) % car.images.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Back Button */}
        <div className="p-6 pb-0">
          <button
            onClick={() => navigate(-1)} // Go back to the previous page
            className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg
                       transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <MdArrowBack className="mr-2" /> Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Image Slider Section */}
          <div className="relative rounded-lg overflow-hidden shadow-lg h-96 lg:h-auto">
            <img
              src={car.images[currentImageIndex]}
              alt={`${car.make} ${car.model} image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out"
            />
            {car.images.length > 1 && (
              <>
                <button
                  onClick={goToPreviousImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white text-3xl
                             hover:bg-opacity-75 transition-all duration-300 z-10"
                  aria-label="Previous image"
                >
                  <MdChevronLeft />
                </button>
                <button
                  onClick={goToNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white text-3xl
                             hover:bg-opacity-75 transition-all duration-300 z-10"
                  aria-label="Next image"
                >
                  <MdChevronRight />
                </button>
              </>
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {car.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-3 h-3 rounded-full ${
                    currentImageIndex === idx ? "bg-white" : "bg-gray-400"
                  }
                             hover:bg-white transition-colors duration-200`}
                  aria-label={`Go to image ${idx + 1}`}
                ></button>
              ))}
            </div>
          </div>

          {/* Car Details Section */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-extrabold text-white mb-2 leading-tight">
                {car.year} {car.make}{" "}
                <span
                  className={`${electric ? "text-red-400" : "text-blue-400"}`}
                >
                  {car.model}
                </span>
              </h2>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                  electric ? "bg-red-600" : "bg-blue-600"
                }`}
              >
                {electric ? (
                  <MdElectricCar className="mr-1" />
                ) : (
                  <MdOutlineLocalGasStation className="mr-1" />
                )}
                {electric ? "Electric Vehicle" : "Mechanical Vehicle"}
              </div>

              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                {car.description}
              </p>

              {/* Key Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-6">
                <div className="flex items-center text-lg">
                  <MdAirlineSeatReclineExtra className="text-gray-400 mr-3 text-2xl" />
                  <span>
                    Seating Capacity:{" "}
                    <span className="font-semibold">{car.seatingCapacity}</span>
                  </span>
                </div>
                {electric ? (
                  <>
                    <div className="flex items-center text-lg">
                      <MdOutlineSpeed className="text-green-400 mr-3 text-2xl" />
                      <span>
                        Range:{" "}
                        <span className="font-semibold">{car.range}</span>
                      </span>
                    </div>
                    <div className="flex items-center text-lg col-span-full">
                      <MdOutlineBatteryChargingFull className="text-yellow-400 mr-3 text-2xl" />
                      <span>
                        Battery Capacity:{" "}
                        <span className="font-semibold">
                          {car.batteryCapacity}
                        </span>
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center text-lg">
                      <MdEngineering className="text-orange-400 mr-3 text-2xl" />
                      <span>
                        Engine Type:{" "}
                        <span className="font-semibold">{car.engineType}</span>
                      </span>
                    </div>
                    <div className="flex items-center text-lg">
                      <MdFlashOn className="text-purple-400 mr-3 text-2xl" />
                      <span>
                        Horsepower:{" "}
                        <span className="font-semibold">
                          {car.horsepower} HP
                        </span>
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Features List */}
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center">
                <MdInfoOutline className="mr-2 text-red-400" /> Key Features
              </h3>
              <ul className="list-disc list-inside text-gray-300 text-base space-y-2 mb-8">
                {car.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">&bull;</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price and Action Button */}
            <div className="mt-auto pt-6 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between">
              <div className="flex items-baseline mb-4 sm:mb-0">
                <MdAttachMoney className="text-green-500 text-4xl mr-1" />
                <span className="text-5xl font-extrabold text-white">
                  {car.pricePerDay}
                </span>
                <span className="text-gray-400 text-xl">/day</span>
              </div>
              {/* Corrected Link usage */}
              <Link to="/checkout" state={{ car: car }}>
                <button
                  className={`px-8 py-3 rounded-full font-semibold text-xl shadow-lg
                             ${
                               electric
                                 ? "bg-red-600 hover:bg-red-700"
                                 : "bg-blue-600 hover:bg-blue-700"
                             }
                             text-white transition-colors duration-300 transform hover:scale-105
                             focus:outline-none focus:ring-4 ${
                               electric
                                 ? "focus:ring-red-500"
                                 : "focus:ring-blue-500"
                             } focus:ring-opacity-50`}
                >
                  Book This Car Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailsPage;