import { Outlet, Link } from "@remix-run/react";
import Navbar from "~/components/Navbar";

export default function Recursos() {
  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Recursos</h1>
        <div className="flex space-x-4">
          <Link to="menu" className="px-4 py-2 bg-blue-500 text-white rounded">
            Criação de Menu
          </Link>
          <Link to="carrinho" className="px-4 py-2 bg-blue-500 text-white rounded">
            Carrinho
          </Link>
          <Link to="pagamento" className="px-4 py-2 bg-blue-500 text-white rounded">
            Pagamento
          </Link>
          <Link to="templates" className="px-4 py-2 bg-blue-500 text-white rounded">
            Templates
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
