import React from "react";
import {
  FaLeaf,
  FaUsers,
  FaGlobeAmericas,
  FaAward,
  FaCarSide,
  FaHandshake,
  FaRoute,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const About: React.FC = () => {
  const sectionClasses = "py-16 md:py-24";
  const containerClasses = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8";
  const headingClasses =
    "text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-12";
  const subHeadingClasses = "text-2xl sm:text-3xl font-bold mb-6 text-red-600";
  const paragraphClasses = "text-lg md:text-xl leading-relaxed mb-6";
  const featureItemClasses =
    "flex flex-col items-center text-center p-6 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300";

  return (
    <div className="bg-gray-900 text-gray-300">
      <section className="relative h-96 flex items-center justify-center bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-red-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/4 right-1/4 w-1/4 h-1/4 bg-green-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 animate-fadeInDown">
            About EcoDrive Rentals
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 animate-fadeInUp delay-200">
            Driving the Future, Sustainably.
          </p>
        </div>
      </section>

      <section className={`${sectionClasses} bg-gray-800`}>
        <div className={containerClasses}>
          <h2 className={`${headingClasses} text-white`}>Our Story</h2>
          <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
            <div className="md:order-2 mb-8 md:mb-0">
              <div className="w-full h-64 md:h-96 bg-gradient-to-br from-red-600 to-red-800 rounded-lg shadow-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute w-48 h-48 bg-white opacity-10 rounded-full -top-10 -right-10"></div>
                <div className="absolute w-32 h-32 bg-white opacity-10 rounded-full -bottom-8 -left-8"></div>
                <FaRoute className="text-white text-7xl opacity-30" />
              </div>
            </div>
            <div className="md:order-1">
              <p className={paragraphClasses}>
                Founded in 2023, EcoDrive Rentals emerged from a passion for
                sustainable transportation and a commitment to providing
                exceptional car rental experiences. We recognized the growing
                need for eco-conscious travel options without compromising on
                performance, comfort, or accessibility. Our journey began with a
                small fleet of electric and hybrid vehicles, driven by the
                vision of a greener future.
              </p>
              <p className={paragraphClasses}>
                Since then, we've grown, but our core values remain unchanged.
                We continually invest in the latest sustainable automotive
                technology and refine our services to ensure every customer
                enjoys a seamless, responsible, and memorable journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionClasses} bg-gray-900`}>
        <div className={containerClasses}>
          <h2 className={`${headingClasses} text-white`}>Our Mission</h2>
          <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
            <div className="mb-8 md:mb-0">
              <div className="w-full h-64 md:h-96 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg shadow-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute w-40 h-40 bg-white opacity-10 rounded-full top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute w-24 h-24 bg-white opacity-10 rounded-full bottom-1/4 right-1/4 transform translate-x-1/2 translate-y-1/2"></div>
                <FaLeaf className="text-white text-7xl opacity-30" />
              </div>
            </div>
            <div>
              <p className={paragraphClasses}>
                At EcoDrive Rentals, our mission is to redefine urban mobility
                by offering accessible, affordable, and environmentally friendly
                transportation solutions. We aim to empower individuals and
                businesses to make sustainable choices without sacrificing
                convenience or quality.
              </p>
              <p className={paragraphClasses}>
                We strive to build a community that values ecological
                responsibility, providing a seamless rental experience that
                encourages exploration while minimizing environmental impact.
                Through continuous innovation and customer-centric service, we
                are dedicated to setting new standards in the car rental
                industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionClasses} bg-gray-800`}>
        <div className={containerClasses}>
          <h2 className={`${headingClasses} text-white`}>Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className={featureItemClasses}>
              <FaLeaf className="text-red-600 text-5xl mb-4" />
              <h3 className={subHeadingClasses}>Sustainability</h3>
              <p className="text-md text-gray-400">
                Pioneering eco-friendly practices and offering a fleet that
                reduces carbon footprints.
              </p>
            </div>
            <div className={featureItemClasses}>
              <FaUsers className="text-red-600 text-5xl mb-4" />
              <h3 className={subHeadingClasses}>Customer Focus</h3>
              <p className="text-md text-gray-400">
                Prioritizing exceptional service, transparent processes, and
                personalized experiences.
              </p>
            </div>
            <div className={featureItemClasses}>
              <FaHandshake className="text-red-600 text-5xl mb-4" />
              <h3 className={subHeadingClasses}>Integrity</h3>
              <p className="text-md text-gray-400">
                Upholding the highest standards of honesty, ethics, and
                reliability in all our dealings.
              </p>
            </div>
            <div className={featureItemClasses}>
              <FaAward className="text-red-600 text-5xl mb-4" />
              <h3 className={subHeadingClasses}>Quality</h3>
              <p className="text-md text-gray-400">
                Maintaining a meticulously serviced fleet and delivering premium
                service at every touchpoint.
              </p>
            </div>
            <div className={featureItemClasses}>
              <FaRoute className="text-red-600 text-5xl mb-4" />
              <h3 className={subHeadingClasses}>Innovation</h3>
              <p className="text-md text-gray-400">
                Continuously embracing new technologies and ideas to enhance the
                rental journey.
              </p>
            </div>
            <div className={featureItemClasses}>
              <FaGlobeAmericas className="text-red-600 text-5xl mb-4" />
              <h3 className={subHeadingClasses}>Community</h3>
              <p className="text-md text-gray-400">
                Contributing positively to the local and global communities we
                serve.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${sectionClasses} bg-gray-900`}>
        <div className={containerClasses}>
          <h2 className={`${headingClasses} text-white`}>
            Why Choose EcoDrive Rentals?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <ul className="space-y-6 text-xl">
                <li className="flex items-start">
                  <FaCarSide className="text-red-600 text-3xl mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white text-2xl mb-2">
                      Eco-Friendly Fleet
                    </h3>
                    <p className="text-gray-400">
                      Access to a diverse range of electric and hybrid vehicles,
                      reducing your carbon footprint with every mile.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaAward className="text-red-600 text-3xl mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white text-2xl mb-2">
                      Unmatched Customer Service
                    </h3>
                    <p className="text-gray-400">
                      Our dedicated team is always ready to assist you, ensuring
                      a smooth and hassle-free experience from booking to
                      return.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaHandshake className="text-red-600 text-3xl mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white text-2xl mb-2">
                      Transparent Pricing
                    </h3>
                    <p className="text-gray-400">
                      No hidden fees or surprises. What you see is what you pay,
                      with clear terms and conditions.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaRoute className="text-red-600 text-3xl mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-white text-2xl mb-2">
                      Convenience & Flexibility
                    </h3>
                    <p className="text-gray-400">
                      Easy online booking, flexible rental periods, and
                      convenient pick-up/drop-off locations tailored to your
                      needs.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-8 md:mt-0">
              <div className="w-full h-64 md:h-96 bg-gradient-to-br from-green-600 to-green-800 rounded-lg shadow-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute w-56 h-56 bg-white opacity-10 rounded-full -top-20 -left-20"></div>
                <div className="absolute w-48 h-48 bg-white opacity-10 rounded-full -bottom-16 -right-16"></div>
                <FaGlobeAmericas className="text-white text-7xl opacity-30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-red-700 py-12 md:py-16 text-center text-white">
        <div className={containerClasses}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Join the Eco-Friendly Journey Today!
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Experience the future of transportation with EcoDrive Rentals.
            Sustainable, reliable, and always ready for your next adventure.
          </p>
          <Link
            to="/categories"
            className="inline-block bg-white text-red-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transform hover:scale-105 transition-transform duration-300 shadow-lg"
          >
            Explore Our Fleet
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
