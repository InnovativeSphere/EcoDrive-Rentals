import React from 'react';
import {
  MdOutlineElectricCar,
  MdOutlineCleanHands,
  MdOutlineSupportAgent,
  MdOutlineStars,
  MdOutlineMap,
  MdOutlineVerified
} from 'react-icons/md'; 

interface FeatureCardProps {
  icon: React.ElementType; 
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div
      className="
        bg-gray-800 rounded-lg p-6
        flex flex-col items-center text-center
        shadow-lg hover:shadow-xl transform hover:-translate-y-2
        transition-all duration-300 ease-in-out
        border border-gray-700 hover:border-red-600
      "
    >
      <div className="text-red-600 text-5xl mb-4 p-3 rounded-full bg-gray-700/50">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

export const InfoSec = () => {
  const features = [
    {
      icon: MdOutlineElectricCar,
      title: "Sustainable Fleet",
      description: "Drive green with our 100% electric and hybrid vehicle lineup. Reduce your carbon footprint with every journey."
    },
    {
      icon: MdOutlineCleanHands,
      title: "Eco-Friendly Operations",
      description: "Beyond cars, our entire operation emphasizes sustainability, from energy use to waste reduction."
    },
    {
      icon: MdOutlineSupportAgent,
      title: "24/7 Premium Support",
      description: "Enjoy peace of mind with round-the-clock customer service and roadside assistance, wherever you are."
    },
    {
      icon: MdOutlineStars,
      title: "Top-Rated Vehicles",
      description: "Experience the latest models and cutting-edge technology, ensuring a comfortable, safe, and modern ride."
    },
    {
      icon: MdOutlineMap,
      title: "Flexible Rental Options",
      description: "From hourly to long-term, we offer customizable rental plans to fit your schedule and travel needs."
    },
    {
      icon: MdOutlineVerified,
      title: "Transparent Pricing",
      description: "No hidden fees, no surprises. Our straightforward pricing ensures you know exactly what you're paying for."
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-8 md:px-12 lg:px-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 leading-tight">
          Why Choose <span className="text-red-600">EcoDrive Rentals</span>?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};