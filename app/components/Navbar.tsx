import { Link } from "@remix-run/react";
import { useState } from "react";
import LanguageModal from "./LanguageModal";
import { FaAngleDown } from "react-icons/fa6";
import { CiGlobe } from "react-icons/ci";

function Navbar() {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [recursosOpen, setRecursosOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200 font-poppins">
      <div className="mx-auto text-sm px-6 py-3 flex items-center justify-between">
        {/* Lado Esquerdo: Logo e Links de Navegação */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-red-600">
            Menus
          </Link>
          <Link to="/" className="text-gray-900 hover:text-red-600 transition-colors">
            Início
          </Link>
          {/* Dropdown de Recursos */}
          <div className="relative">
            <button
              onClick={() => setRecursosOpen(!recursosOpen)}
              className="flex items-center text-gray-900 hover:text-red-600 transition-colors focus:outline-none"
            >
              Recursos
              <FaAngleDown className="ml-1 text-xs" />
            </button>
            {recursosOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg z-10">
                <Link
                  to="/recursos/menu"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Criação de Menu
                </Link>
                <Link
                  to="/recursos/carrinho"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Carrinho
                </Link>
                <Link
                  to="/recursos/pagamento"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Pagamento
                </Link>
                <Link
                  to="/recursos/templates"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Templates
                </Link>
              </div>
            )}
          </div>
          <Link to="/precos" className="text-gray-900 hover:text-red-600 transition-colors">
            Preços
          </Link>
          {/* Botão Builder: redireciona diretamente para a página de projetos */}
          <Link to="/projetos" className="text-gray-900 hover:text-red-600 transition-colors">
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
            className="bg-red-600 hover:bg-red-700 text-white px-7 py-2 rounded-full transition-colors"
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
