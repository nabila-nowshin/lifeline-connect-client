import { Link } from "react-router";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content pt-10 pb-5 px-4 md:px-10 mt-10 border-t border-base-300">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold mb-3">BloodConnect</h2>
          <p className="text-sm text-base-content/80">
            Bridging life and hope—one donation at a time. Join us in saving
            lives.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            {["Home", "Donate", "Blogs", "Contact"].map((link, idx) => (
              <li key={idx}>
                <Link
                  to={`/${link.toLowerCase()}`}
                  className="hover:text-primary hover:underline transition-colors"
                >
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-sm text-base-content/80">
            Email: support@bloodconnect.org
          </p>
          <p className="text-sm text-base-content/80">
            Phone: +880 1234 567890
          </p>
          <p className="text-sm text-base-content/80">
            Location: Dhaka, Bangladesh
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-lg">
            {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map(
              (Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="hover:text-primary transition-colors"
                >
                  <Icon />
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center text-sm mt-10 text-base-content/60">
        © {new Date().getFullYear()} BloodConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
