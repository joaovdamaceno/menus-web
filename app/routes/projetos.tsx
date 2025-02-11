import { Link } from "@remix-run/react";
import Navbar from "~/components/Navbar";

export default function Projetos() {
  // Dummy projects data
  const projects = [
    { id: 1, name: "Projeto 1", preview: "/images/preview1.png" },
    { id: 2, name: "Projeto 2", preview: "/images/preview2.png" },
  ];

  return (
    <div>
      <Navbar />
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Seus Projetos</h1>
          <div className="flex items-center space-x-4">
            <div>
              <select className="border rounded p-2">
                <option value="recent">Recentes</option>
                <option value="name">Nome</option>
              </select>
            </div>
            <Link to="/builder" className="bg-blue-500 text-white py-2 px-4 rounded">
              Criar Projeto
            </Link>
            <div className="relative">
              <button className="flex items-center space-x-2">
                <img
                  src="/images/profile.png"
                  alt="Perfil"
                  className="w-8 h-8 rounded-full"
                />
                <span>Usuário</span>
                <i className="fas fa-chevron-down"></i>
              </button>
              {/* Implement dropdown logic for settings and logout */}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/builder?projectId=${project.id}`}
              className="border rounded p-4 hover:shadow"
            >
              <img
                src={project.preview}
                alt={project.name}
                className="w-full h-40 object-cover mb-4"
              />
              <h2 className="text-xl font-bold">{project.name}</h2>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
