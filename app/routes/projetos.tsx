import { useState, useEffect } from "react";
import { FiPlus, FiLoader } from "react-icons/fi";
import { Link } from "@remix-run/react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import ProtectedRoute from "~/components/ProtectedRoute";
import { useAuth } from "~/contexts/AuthContext";
import axios from "axios";

interface Project {
  id: number;
  name: string;
  preview?: string;
  created_at: string;
}

export default function Projetos() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'name'>('recent');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error("Authentication token not found");
        }

        const response = await axios.get(`http://localhost:8080/project/user/${token}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        let sortedProjects = [...response.data];
        if (sortBy === 'recent') {
          sortedProjects.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        } else {
          sortedProjects.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        setProjects(sortedProjects);
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [sortBy]);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as 'recent' | 'name');
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <div className="py-24 sm:py-32 px-6 max-w-7xl mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-base font-semibold text-red-500">Seus Projetos</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Gerencie seus projetos com facilidade
              </p>
            </div>
            
            <div className="mt-12 flex justify-between items-center">
              <div>
                <select 
                  className="border rounded p-2 text-gray-700"
                  value={sortBy}
                  onChange={handleSortChange}
                >
                  <option value="recent">Recentes</option>
                  <option value="name">Nome</option>
                </select>
              </div>
              <Link 
                to="/builder" 
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <FiPlus className="mr-2" /> Criar Projeto
              </Link>
            </div>

            {loading ? (
              <div className="mt-12 flex justify-center items-center">
                <FiLoader className="animate-spin text-red-500 w-8 h-8" />
              </div>
            ) : error ? (
              <div className="mt-12 text-center text-red-500">
                {error}
              </div>
            ) : projects.length === 0 ? (
              <div className="mt-12 text-center text-gray-500">
                <p>Você ainda não tem nenhum projeto.</p>
                <p className="mt-2">Clique em "Criar Projeto" para começar!</p>
              </div>
            ) : (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/builder?projectId=${project.id}`}
                    className="group rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition duration-200"
                  >
                    <div className="h-40 bg-gray-100 flex items-center justify-center">
                      {project.preview ? (
                        <img
                          src={project.preview}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400">No preview available</div>
                      )}
                    </div>
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-900 group-hover:text-red-500">
                        {project.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Created: {new Date(project.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}