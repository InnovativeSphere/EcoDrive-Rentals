import { Link } from "react-router-dom";
import {
  MdElectricCar,
  MdSpeed,
  MdOutlineLocalGasStation,
  MdOutlineSettings,
  MdOutlineEco,
  MdOutlineChargingStation,
  MdOutlineNoiseControlOff,
  MdOutlineEngineering,
  MdOutlineBuild,
  MdOutlineHistoryEdu,
} from "react-icons/md";

const Categories = () => {
  return (
    <div className="min-h-screen bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-green-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-center mb-20 leading-tight tracking-wider animate-fade-in-up">
          Explore Our{" "}
          <span className="text-red-500 drop-shadow-lg">Cutting-Edge</span>{" "}
          Vehicle Categories
          <span className="block w-32 h-1.5 bg-red-600 mx-auto mt-6 rounded-full animate-scale-in"></span>
        </h1>

        {/* Electric Cars Category Section */}
        <section className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/90 rounded-3xl shadow-2xl overflow-hidden mb-32 border border-gray-700/50 group transform hover:scale-[1.01] transition-all duration-500 ease-out">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1549420950-8449c2563f10?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
              backgroundPosition: "top center",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-50 transition-opacity duration-500"></div>
          </div>

          <div className="relative z-10 p-8 md:p-16 lg:p-24 flex flex-col lg:flex-row items-center justify-between gap-16">
            <div className="flex-shrink-0 text-center lg:text-left lg:w-1/2 animate-slide-in-left">
              <MdElectricCar className="text-red-500 text-8xl md:text-9xl lg:text-10xl mb-6 mx-auto lg:mx-0 drop-shadow-xl animate-bounce-subtle" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                The Electric <span className="text-red-400">Future</span>
              </h2>
              <p className="text-gray-300 text-lg md:text-xl max-w-lg lg:max-w-xl leading-relaxed">
                Step into a world of innovation. Our electric fleet offers
                silent, powerful, and emissions-free driving experiences for a
                sustainable tomorrow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 lg:w-1/2 animate-slide-in-right">
              <div className="bg-gray-700/60 backdrop-blur-md rounded-xl p-6 shadow-xl border border-gray-600 transform transition-all duration-400 hover:scale-[1.03] hover:bg-gray-600/70 hover:border-red-500 relative overflow-hidden group-card">
                <div className="absolute inset-0 bg-red-500 opacity-0 group-card-hover:opacity-10 transition-opacity duration-300"></div>
                <MdOutlineEco className="text-green-400 text-5xl mb-3 drop-shadow-md relative z-10" />
                <h3 className="text-2xl font-semibold text-white mb-2 relative z-10">
                  Eco-Friendly
                </h3>
                <p className="text-gray-300 relative z-10">
                  Zero emissions for cleaner air and a healthier planet.
                </p>
              </div>
              <div className="bg-gray-700/60 backdrop-blur-md rounded-xl p-6 shadow-xl border border-gray-600 transform transition-all duration-400 hover:scale-[1.03] hover:bg-gray-600/70 hover:border-red-500 relative overflow-hidden group-card">
                <div className="absolute inset-0 bg-red-500 opacity-0 group-card-hover:opacity-10 transition-opacity duration-300"></div>
                <MdOutlineChargingStation className="text-blue-400 text-5xl mb-3 drop-shadow-md relative z-10" />
                <h3 className="text-2xl font-semibold text-white mb-2 relative z-10">
                  Cost Savings
                </h3>
                <p className="text-gray-300 relative z-10">
                  Reduced running costs and less frequent maintenance.
                </p>
              </div>
              <div className="bg-gray-700/60 backdrop-blur-md rounded-xl p-6 shadow-xl border border-gray-600 transform transition-all duration-400 hover:scale-[1.03] hover:bg-gray-600/70 hover:border-red-500 relative overflow-hidden group-card">
                <div className="absolute inset-0 bg-red-500 opacity-0 group-card-hover:opacity-10 transition-opacity duration-300"></div>
                <MdOutlineNoiseControlOff className="text-purple-400 text-5xl mb-3 drop-shadow-md relative z-10" />
                <h3 className="text-2xl font-semibold text-white mb-2 relative z-10">
                  Silent & Smooth
                </h3>
                <p className="text-gray-300 relative z-10">
                  Enjoy a remarkably quiet and seamless driving experience.
                </p>
              </div>
              <div className="bg-gray-700/60 backdrop-blur-md rounded-xl p-6 shadow-xl border border-gray-600 transform transition-all duration-400 hover:scale-[1.03] hover:bg-gray-600/70 hover:border-red-500 relative overflow-hidden group-card">
                <div className="absolute inset-0 bg-red-500 opacity-0 group-card-hover:opacity-10 transition-opacity duration-300"></div>
                <MdSpeed className="text-yellow-400 text-5xl mb-3 drop-shadow-md relative z-10" />
                <h3 className="text-2xl font-semibold text-white mb-2 relative z-10">
                  Instant Performance
                </h3>
                <p className="text-gray-300 relative z-10">
                  Experience thrilling acceleration and dynamic handling.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-center pb-12 animate-fade-in">
            <Link
              to="/electric-cars"
              className="inline-flex items-center px-12 py-5 bg-red-600 text-white text-xl font-semibold rounded-full shadow-xl
              hover:bg-red-700 hover:scale-105 transition-all duration-300 ease-in-out transform
              focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-70 group-hover:rotate-1"
            >
              Discover Electric Cars <MdSpeed className="ml-4 text-3xl" />
            </Link>
          </div>
        </section>

        <section className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/90 rounded-3xl shadow-2xl overflow-hidden mb-24 border border-gray-700/50 group transform hover:scale-[1.01] transition-all duration-500 ease-out">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage:
                'url("https://images.unsplash.com/photo-1549317661-bd32b6369eef?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
              backgroundPosition: "center center",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-50 transition-opacity duration-500"></div>
          </div>

          <div className="relative z-10 p-8 md:p-16 lg:p-24 flex flex-col lg:flex-row-reverse items-center justify-between gap-16">
            <div className="flex-shrink-0 text-center lg:text-right lg:w-1/2 animate-slide-in-right">
              <MdOutlineSettings className="text-blue-500 text-8xl md:text-9xl lg:text-10xl mb-6 mx-auto lg:mx-0 drop-shadow-xl animate-bounce-subtle animation-delay-500" />
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Classic <span className="text-blue-400">Reliability</span>
              </h2>
              <p className="text-gray-300 text-lg md:text-xl max-w-lg lg:max-w-xl leading-relaxed">
                Experience the enduring appeal of traditional engineering. Our
                mechanical vehicles offer robust performance, extensive range,
                and proven dependability for any adventure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 lg:w-1/2 animate-slide-in-left">
              <div className="bg-gray-700/60 backdrop-blur-md rounded-xl p-6 shadow-xl border border-gray-600 transform transition-all duration-400 hover:scale-[1.03] hover:bg-gray-600/70 hover:border-blue-500 relative overflow-hidden group-card">
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-card-hover:opacity-10 transition-opacity duration-300"></div>
                <MdOutlineLocalGasStation className="text-orange-400 text-5xl mb-3 drop-shadow-md relative z-10" />
                <h3 className="text-2xl font-semibold text-white mb-2 relative z-10">
                  Widespread Fueling
                </h3>
                <p className="text-gray-300 relative z-10">
                  Easy access to fuel stations for effortless long journeys.
                </p>
              </div>
              <div className="bg-gray-700/60 backdrop-blur-md rounded-xl p-6 shadow-xl border border-gray-600 transform transition-all duration-400 hover:scale-[1.03] hover:bg-gray-600/70 hover:border-blue-500 relative overflow-hidden group-card">
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-card-hover:opacity-10 transition-opacity duration-300"></div>
                <MdOutlineHistoryEdu className="text-cyan-400 text-5xl mb-3 drop-shadow-md relative z-10" />
                <h3 className="text-2xl font-semibold text-white mb-2 relative z-10">
                  Proven Technology
                </h3>
                <p className="text-gray-300 relative z-10">
                  Decades of refinement ensure robust and dependable
                  performance.
                </p>
              </div>
              <div className="bg-gray-700/60 backdrop-blur-md rounded-xl p-6 shadow-xl border border-gray-600 transform transition-all duration-400 hover:scale-[1.03] hover:bg-gray-600/70 hover:border-blue-500 relative overflow-hidden group-card">
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-card-hover:opacity-10 transition-opacity duration-300"></div>
                <MdOutlineEngineering className="text-lime-400 text-5xl mb-3 drop-shadow-md relative z-10" />
                <h3 className="text-2xl font-semibold text-white mb-2 relative z-10">
                  Longer Range
                </h3>
                <p className="text-gray-300 relative z-10">
                  Extended travel distances on a single tank for uninterrupted
                  trips.
                </p>
              </div>
              <div className="bg-gray-700/60 backdrop-blur-md rounded-xl p-6 shadow-xl border border-gray-600 transform transition-all duration-400 hover:scale-[1.03] hover:bg-gray-600/70 hover:border-blue-500 relative overflow-hidden group-card">
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-card-hover:opacity-10 transition-opacity duration-300"></div>
                <MdOutlineBuild className="text-fuchsia-400 text-5xl mb-3 drop-shadow-md relative z-10" />
                <h3 className="text-2xl font-semibold text-white mb-2 relative z-10">
                  High Versatility
                </h3>
                <p className="text-gray-300 relative z-10">
                  Adaptable for various tasks, from heavy loads to diverse
                  terrains.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-center pb-12 animate-fade-in">
            <Link
              to="/mechanical-cars"
              className="inline-flex items-center px-12 py-5 bg-blue-600 text-white text-xl font-semibold rounded-full shadow-xl
              hover:bg-blue-700 hover:scale-105 transition-all duration-300 ease-in-out transform
              focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-70 group-hover:-rotate-1"
            >
              Discover Mechanical Cars{" "}
              <MdOutlineLocalGasStation className="ml-4 text-3xl" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Categories;
