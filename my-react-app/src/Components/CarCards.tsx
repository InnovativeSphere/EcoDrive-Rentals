import React from "react";
import { Link } from "react-router-dom";
import {
  MdElectricCar,
  MdOutlineLocalGasStation,
  MdAttachMoney,
  MdAirlineSeatReclineExtra,
  MdOutlineSpeed,
  MdEngineering,
  MdFlashOn,
  MdOutlineBatteryChargingFull,
} from "react-icons/md";

interface CommonCar {
  id: number;
  make: string;
  model: string;
  year: number;
  images: string[];
  description: string;
  features: string[];
  pricePerDay: number;
  seatingCapacity: number;
}

interface ElectricCar extends CommonCar {
  range: string;
  batteryCapacity: string;
}

interface MechanicalCar extends CommonCar {
  engineType: string;
  horsepower: number;
}

function isElectricCar(car: ElectricCar | MechanicalCar): car is ElectricCar {
  return (car as ElectricCar).range !== undefined;
}

interface CarCardProps {
  car: ElectricCar | MechanicalCar;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  const electric = isElectricCar(car);

  return (
    <Link to={`/car/${car.id}`} className="block h-full">
      <div
        className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden
                      transform transition-all duration-500 ease-out hover:scale-[1.02]
                      border border-gray-700 hover:border-red-500 relative group
                      flex flex-col h-full cursor-pointer"
      >
        <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden">
          <img
            src={car.images[0]}
            alt={`${car.make} ${car.model}`}
            className="w-full h-full object-cover object-center
                       transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div
            className={`absolute top-4 right-4 p-2 rounded-full shadow-lg ${
              electric ? "bg-red-600" : "bg-blue-600"
            }`}
          >
            {electric ? (
              <MdElectricCar className="text-white text-2xl" />
            ) : (
              <MdOutlineLocalGasStation className="text-white text-2xl" />
            )}
          </div>
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
            {car.year} {car.make}{" "}
            <span className={`${electric ? "text-red-400" : "text-blue-400"}`}>
              {car.model}
            </span>
          </h3>
          <p className="text-gray-300 text-sm mb-4 flex-grow line-clamp-3">
            {car.description}
          </p>

          <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm text-gray-200 mb-4">
            <div className="flex items-center">
              <MdAirlineSeatReclineExtra className="text-gray-400 mr-2 text-lg" />
              <span>{car.seatingCapacity} Seater</span>
            </div>
            {electric ? (
              <>
                <div className="flex items-center">
                  <MdOutlineSpeed className="text-green-400 mr-2 text-lg" />
                  <span>{car.range} Range</span>
                </div>
                <div className="flex items-center col-span-2">
                  <MdOutlineBatteryChargingFull className="text-yellow-400 mr-2 text-lg" />
                  <span>Battery: {car.batteryCapacity}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center">
                  <MdEngineering className="text-orange-400 mr-2 text-lg" />
                  <span>{car.engineType}</span>
                </div>
                <div className="flex items-center col-span-2">
                  <MdFlashOn className="text-purple-400 mr-2 text-lg" />
                  <span>{car.horsepower} HP</span>
                </div>
              </>
            )}
          </div>

          <div
            className="mt-auto pt-4 border-t border-gray-700
                      flex flex-col sm:flex-row items-center justify-between
                      sm:space-x-4 space-y-4 sm:space-y-0"
          >
            {" "}
            <div className="flex items-baseline flex-shrink-0">
              {" "}
              <MdAttachMoney className="text-green-500 text-2xl mr-1" />
              <span className="text-3xl font-extrabold text-white">
                {car.pricePerDay}
              </span>
              <span className="text-gray-400">/day</span>
            </div>
            <div
              className={`px-6 py-2 rounded-full font-semibold shadow-lg
                          ${electric ? "bg-red-600" : "bg-blue-600"}
                          text-white transition-colors duration-300 flex-grow text-center`}
            >
              View Details
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;