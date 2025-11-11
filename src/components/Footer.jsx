import { Link } from "react-router";
import { Facebook,  Instagram, Linkedin, Mail, ArrowUp, X } from "lucide-react";
import { LuShip } from "react-icons/lu";
import { useEffect, useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-linear-to-r from-pink-800 to-purple-600 py-10 px-4 rounded-xl mt-20 text-white">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <LuShip size={28} />
            <span className="text-2xl font-bold">Export Import Hub</span>
          </div>
          <p className="text-sm text-gray-200 mb-4">
            A trusted global partner in international trade, logistics, and sourcing.
            We connect businesses worldwide with reliable import and export solutions.
          </p>
          <p className="text-sm text-gray-300">
            Head Office: 45 Trade Avenue, Dhaka, Bangladesh
          </p>
          <p className="text-sm text-gray-300">Phone: +880 1712-345678</p>
          <p className="text-sm text-gray-300">Email: info@exportimporthub.com</p>
        </div>

        {/* Our Services */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b border-cyan-400 pb-2">Our Services</h3>
          <ul className="space-y-2 text-gray-200">
            <li><Link to="/" className="hover:underline">Import Consultancy</Link></li>
            <li><Link to="/" className="hover:underline">Export Solutions</Link></li>
            <li><Link to="/" className="hover:underline">Customs & Freight Handling</Link></li>
            <li><Link to="/" className="hover:underline">Product Sourcing</Link></li>
            <li><Link to="/" className="hover:underline">Global Shipping Support</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b border-cyan-400 pb-2">Company</h3>
          <ul className="space-y-2 text-gray-200">
            <li><Link to="/" className="hover:underline">About Us</Link></li>
            <li><Link to="/" className="hover:underline">Careers</Link></li>
            <li><Link to="/" className="hover:underline">Our Partners</Link></li>
            <li><Link to="/" className="hover:underline">Trade News & Insights</Link></li>
            <li><Link to="/" className="hover:text-yellow-200">Contact Us</Link></li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div>
          <h3 className="text-lg font-bold mb-4 border-b border-cyan-400 pb-2">Connect With Us</h3>
          <div className="flex space-x-4 mb-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <Facebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <X size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <Linkedin size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600">
              <Instagram size={24} />
            </a>
          </div>
          <a
            href="mailto:support@exportimporthub.com"
            className="flex items-center hover:text-blue-300"
          >
            <Mail size={18} className="mr-2" /> support@exportimporthub.com
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-cyan-400 mt-8 pt-4 text-center">
        <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-linear-to-r from-yellow-200 via-white to-yellow-300 mb-2">
          Export Import Hub
        </h2>
        <p className="text-sm text-gray-100">
          © {currentYear} Export Import Hub. All Rights Reserved.
          <span className="ml-4">
            <Link to="/privacy" className="hover:text-yellow-200 mr-3">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-yellow-200">Terms of Service</Link>
          </span>
        </p>
      </div>

      {/* Scroll To Top Button */}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-yellow-400 text-blue-900 p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={22} />
        </button>
      )}
    </footer>
  );
};

export default Footer;
