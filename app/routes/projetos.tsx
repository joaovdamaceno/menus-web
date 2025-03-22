import { FiPlus, FiChevronDown } from "react-icons/fi";
import { Link } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export default function Projetos() {
  const projects = [
    { id: 1, name: "Projeto 1", preview: "/images/preview1.png" },
    { id: 2, name: "Projeto 2", preview: "/images/preview2.png" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
      <div className="py-24 sm:py-32 px-6 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-base font-semibold text-primary text-red-500">Seus Projetos</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Gerencie seus projetos com facilidade
          </p>
        </div>
        <div className="mt-12 flex justify-between items-center">
          <div>
            <select className="border rounded p-2 text-gray-700">
              <option value="recent">Recentes</option>
              <option value="name">Nome</option>
            </select>
          </div>
          <Link to="/builder" className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition">
            <FiPlus className="mr-2" /> Criar Projeto
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/builder?projectId=${project.id}`}
              className="group rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition"
            >
              <img
                src={project.preview}
                alt={project.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-primary">
                  {project.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}
