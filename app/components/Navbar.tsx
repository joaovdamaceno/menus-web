import { Link } from "@remix-run/react";
import { useState } from "react";
import LanguageModal from "./LanguageModal";
import { CiGlobe } from "react-icons/ci";
import { useAuth } from "~/contexts/AuthContext";
import { FiUser, FiLogOut } from "react-icons/fi";

function Navbar() {
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
  };

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
        {/* Lado Direito: Seletor de Linguagem e Login/Avatar */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowLanguageModal(true)}
            className="text-gray-900 hover:text-red-600 transition-colors focus:outline-none"
          >
            <CiGlobe size={22} />
          </button>
          
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
              >
                <FiUser size={20} />
              </button>
              
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">
                    {user?.email || 'User'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <FiLogOut className="mr-2" />
                    Sair
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-red-500 hover:bg-red-600 text-white px-7 py-2 rounded-full transition-colors"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>

      {/* Modal de Linguagens */}
      {showLanguageModal && <LanguageModal onClose={() => setShowLanguageModal(false)} />}
    </nav>
  );
}

export default Navbar;