import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const LINKS = [
  {
    title: "Product",
    items: ["Overview", "Features", "Solutions", "Tutorials"],
  },
  {
    title: "Company",
    items: ["About Us", "Contact Us", "Press", "News"],
  },
  {
    title: "Resource",
    items: ["Blog", "Newsletter", "Events", "Help center"],
  },
];

const currentYear = new Date().getFullYear();

export function Footer() {
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    switch (link) {
      case "About Us":
        navigate("/aboutus"); // Navigate to the "About Us" page
        break;
      case "Contact Us":
        navigate("/contactus"); // Navigate to the "Contact Us" page
        break;
      // Add other navigation logic here if needed
      default:
        break;
    }
  };

  return (
    <footer className="relative w-full bg-black">
      <div className="mx-auto w-full max-w-7xl px-8 text-white">
        <div className="grid grid-cols-1 justify-between gap-4 md:grid-cols-2">
          <Typography variant="h5" className="mb-6 text-blue-600 text-3xl">
            Kumawat Electronics
          </Typography>
          <div className="grid grid-cols-3 justify-between gap-4">
            {LINKS.map(({ title, items }) => (
              <ul key={title}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-3 font-medium opacity-40"
                >
                  {title}
                </Typography>
                {items.map((link) => (
                  <li key={link}>
                    <Typography
                      as="a"
                      href="#"
                      color="gray"
                      className="py-1.5 font-normal transition-colors hover:text-blue-gray-900"
                      onClick={() => handleNavigation(link)}
                    >
                      {link}
                    </Typography>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
        <div className="mt-12 flex w-full flex-col items-center justify-center border-t border-blue-gray-50 py-4 md:flex-row md:justify-between text-white">
          <Typography
            variant="small"
            className="mb-4 text-center font-normal text-blue-gray-900 md:mb-0"
          >
            &copy; {currentYear}{" "}
            <a href="https://material-tailwind.com/">Material Tailwind</a>. All
            Rights Reserved.
          </Typography>
          <div className="flex gap-4 text-blue-gray-900 sm:justify-center">
            <a href="https://facebook.com" className="text-gray-500 hover:text-blue-600">
              <FaFacebookF size={24} />
            </a>
            <a href="https://twitter.com" className="text-gray-500 hover:text-blue-400">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com/pintu_kmwt123/" className="text-gray-500 hover:text-pink-600">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/feed/" className="text-gray-500 hover:text-blue-700">
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
