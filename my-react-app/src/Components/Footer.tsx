import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const accentColor =
    "text-red-600 hover:text-red-400 transition-colors duration-300";
  const linkClasses = `text-gray-300 text-sm hover:${accentColor} transition-colors duration-300`;
  const socialIconClasses = `text-gray-300 text-xl hover:${accentColor} transition-transform duration-300 hover:scale-110`;

  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-8 md:px-12 lg:px-20 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-3xl font-bold text-red-600 mb-4">
            EcoDrive Rentals
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            Your premier choice for sustainable and eco-friendly vehicle
            rentals. We offer a wide range of electric and hybrid vehicles for a
            cleaner, greener journey. Drive with purpose.
          </p>
          <p className="text-gray-400 text-sm">
            Address: 123 Green Avenue, EcoCity, EC 12345
          </p>
          <p className="text-gray-400 text-sm">
            Email:{" "}
            <a href="mailto:info@ecodriverentals.com" className={accentColor}>
              info@ecodriverentals.com
            </a>
          </p>
          <p className="text-gray-400 text-sm">
            Phone:{" "}
            <a href="tel:+1234567890" className={accentColor}>
              +1 (234) 567-890
            </a>
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className={linkClasses}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={linkClasses}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/categories" className={linkClasses}>
                Vehicles
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className={linkClasses}>
                Reservations
              </Link>
            </li>
            <li>
              <Link to="/contactUs" className={linkClasses}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className={linkClasses}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-service" className={linkClasses}>
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Services / Support */}
        <div>
          <h4 className="text-xl font-semibold mb-4">Support</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/faq" className={linkClasses}>
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/help-center" className={linkClasses}>
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/roadside-assistance" className={linkClasses}>
                Roadside Assistance
              </Link>
            </li>
            <li>
              <Link to="/careers" className={linkClasses}>
                Careers
              </Link>
            </li>
            <li>
              <Link to="/blog" className={linkClasses}>
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media & Newsletter */}
        <div className="md:col-span-1 flex flex-col sm:flex-row md:flex-col lg:flex-row xl:flex-col gap-6">
          <div>
            <h4 className="text-xl font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-5">
              {" "}
              {/* Social icons are already flex */}
              <a
                href="https://facebook.com/ecodriverentals"
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClasses}
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com/ecodriverentals"
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClasses}
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com/ecodriverentals"
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClasses}
              >
                <FaInstagram />
              </a>
              <a
                href="https://linkedin.com/company/ecodriverentals"
                target="_blank"
                rel="noopener noreferrer"
                className={socialIconClasses}
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">
              Stay updated with our latest offers and news.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="p-3 rounded-l-md bg-gray-700 border border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-red-600 flex-grow"
              />
              <button
                type="submit"
                className="bg-red-600 text-white p-3 rounded-r-md hover:bg-red-700 transition-colors duration-300 text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-10 pt-8 text-center text-gray-500 text-sm">
        &copy; {currentYear} EcoDrive Rentals. All rights reserved.
      </div>
    </footer>
  );
};
