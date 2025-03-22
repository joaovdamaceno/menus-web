import { Link } from "@remix-run/react";
import { useState } from "react";
import LanguageModal from "./LanguageModal";
import { FaAngleDown } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";

function Footer(){
    return (
        <footer className="bg-red-600 text-gray-200 py-7">
          <div className="container mx-auto px-4 text-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Menus. Todos os direitos reservados.
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Facebook
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Twitter
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram
              </a>
            </div>
          </div>
        </footer>
      )
}
export default Footer;