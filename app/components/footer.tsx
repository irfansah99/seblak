import {
    IoLogoFacebook,
    IoLogoTwitter,
    IoLogoYoutube,
    IoLogoWhatsapp,
    IoLogoInstagram,
  } from "react-icons/io";
  
  export default function Footer() {
    return (
      <footer className="bg-slate-900 text-white py-6 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-xl font-semibold mb-2">Karang Taruna Semper Barat</h1>
  
          <p className="text-sm mb-4">
            &copy; {new Date().getFullYear()} Seblak99. All rights reserved. Designed by{" "}
            <a
              href="https://github.com/irfan99"
              className="underline hover:text-blue-400 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              irfan99
            </a>
          </p>
  
          <h2 className="mt-6 text-lg font-medium">Contact With Us</h2>
  
          <ul className="flex mt-3 gap-6 text-3xl lg:text-6xl text-white items-center justify-center">
            <li>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="hover:text-blue-600 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoFacebook />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="hover:text-sky-400 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoTwitter />
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                className="hover:text-red-600 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoYoutube />
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/1234567890"
                aria-label="WhatsApp"
                className="hover:text-green-500 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoWhatsapp />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="hover:text-pink-500 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoInstagram />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
  