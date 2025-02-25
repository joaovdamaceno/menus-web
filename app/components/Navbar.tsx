import { Link } from "@remix-run/react";
import { useState } from "react";
import LanguageModal from "./LanguageModal";
import { FaAngleDown } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";

function Navbar() {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [recursosOpen, setRecursosOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm border-b fixed z-50 top-0 border-gray-200 font-poppins">
      <div className="mx-auto text-sm px-6 py-3 flex items-center justify-between max-w-7xl">
        {/* Lado Esquerdo: Logo e Links de Navegação */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-red-500">
            Menus
          </Link>
          <Link to="/" className="text-gray-900 hover:text-red-500 transition-colors">
            Início
          </Link>
          <Link to="/recursos" className="text-gray-900 hover:text-red-500 transition-colors">
            Recursos
          </Link>
          <Link to="/precos" className="text-gray-900 hover:text-red-500 transition-colors">
            Preços
          </Link>
          {/* Botão Builder: redireciona diretamente para a página de projetos */}
          <Link to="/projetos" className="text-gray-900 hover:text-red-500 transition-colors">
            Builder
          </Link>
        </div>
        {/* Lado Direito: Seletor de Linguagem e Login */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowLanguageModal(true)}
            className="text-gray-900 hover:text-red-600 transition-colors focus:outline-none"
          >
            <CiGlobe size={22} />
          </button>
          <Link
            to="/login"
            className="bg-red-500 hover:bg-red-600 text-white px-7 py-2 rounded-full transition-colors"
          >
            Entrar
          </Link>
        </div>
      </div>

      {/* Modal de Linguagens */}
      {showLanguageModal && <LanguageModal onClose={() => setShowLanguageModal(false)} />}
    </nav>
  );
}

export default Navbar;
