import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { electricCars } from '../mockData'; 
import { MdArrowBack } from 'react-icons/md'; 
import CarCard from './CarCards';

const ElectricCarsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-8"> 
          <button
            onClick={() => navigate(-1)} 
            className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg
                       transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            <MdArrowBack className="mr-2" /> Back
          </button>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-12 relative">
          Our <span className="text-red-500">Electric</span> Fleet
          <span className="block w-24 h-1 bg-red-600 mx-auto mt-4 rounded-full"></span>
        </h1>

        {electricCars.length === 0 ? (
          <p className="text-center text-gray-400 text-xl">No electric cars available at the moment. Please check back later!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {electricCars.map((car) => (
              <CarCard key={car.id + car.make + car.model} car={car} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectricCarsPage;