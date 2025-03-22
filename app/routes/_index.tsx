import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { motion } from "framer-motion";
import { Link } from "@remix-run/react";
import { FiArrowRight } from "react-icons/fi";


export default function Index() {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <div className="relative">
        <div className="max-w-7xl mx-auto flex items-center min-h-screen">
          <div className="relative z-10 p-12 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl -mt-20">
                <span className="block">Crie seu site de</span>
                <span className="block text-primary text-red-500">restaurante em minutos</span>
              </h1>
              <p className="mt-5 text-lg text-gray-600">
                Construa um site profissional para seu restaurante com nossa plataforma intuitiva.
                Personalize menus, gerencie pedidos e aceite pagamentos online.
              </p>
            </motion.div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/planos">
                <button className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold transition-all">
                  Começar agora
                  <FiArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link to="/recursos">
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-full text-lg font-semibold transition-all">
                  Saiba mais
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 w-2/5 hidden lg:block">
          <img
            className="h-full w-full object-cover max-w-full"
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
            alt="Restaurant interior"
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
