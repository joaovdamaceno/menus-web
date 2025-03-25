import { useState, useEffect } from "react";
import { FiPlus, FiLoader, FiMoreVertical, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "@remix-run/react";
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

interface Template {
  id: string;
  name: string;
  preview: string;
  description: string;
  page: {
    gjs: {
      components: any[];
      styles: any[];
      assets?: string[];
    };
  };
}

const templates: Template[] = [
  {
    id: 'restaurant-modern',
    name: 'Modern Restaurant',
    preview: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'A modern, elegant template perfect for upscale restaurants.',
    page: {
      gjs: {
        components: [
          {
            tagName: 'header',
            type: 'header',
            attributes: { 'data-gjs-type': 'header' },
            style: { padding: '20px', background: '#f8f8f8' },
            components: [
              {
                tagName: 'h1',
                type: 'text',
                style: {
                  'font-family': 'Arial, Helvetica, sans-serif',
                  'font-weight': '900',
                  'font-size': '24px',
                  'color': '#333',
                  'margin': '0'
                },
                content: 'Modern Restaurant'
              }
            ]
          },
          {
            tagName: 'div',
            type: 'menu-grid',
            attributes: { 'data-gjs-type': 'menu-grid' },
            style: { padding: '20px' },
            components: [
              {
                tagName: 'div',
                type: 'menu-grid-header',
                attributes: { 'data-gjs-type': 'menu-grid-header' },
                style: {
                  display: 'flex',
                  'justify-content': 'space-between',
                  'align-items': 'center',
                  'margin-bottom': '20px',
                  padding: '0 10px'
                },
                components: [
                  {
                    tagName: 'h2',
                    type: 'text',
                    style: {
                      'font-family': 'inherit',
                      'font-size': '24px',
                      'color': '#333',
                      margin: '0'
                    },
                    content: 'Menu Items'
                  },
                  {
                    tagName: 'div',
                    type: 'add-menu-btn',
                    attributes: { 'data-gjs-type': 'add-menu-btn' },
                    content: '+',
                    style: {
                      width: '32px',
                      height: '32px',
                      'border-radius': '50%',
                      background: '#e53e3e',
                      color: 'white',
                      display: 'flex',
                      'align-items': 'center',
                      'justify-content': 'center',
                      cursor: 'pointer',
                      'font-size': '24px'
                    }
                  }
                ]
              },
              {
                tagName: 'div',
                type: 'menu-items-container',
                attributes: { 'data-gjs-type': 'menu-items-container' },
                style: {
                  display: 'grid',
                  'grid-template-columns': 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '20px'
                }
              }
            ]
          },
          {
            tagName: 'footer',
            type: 'footer',
            attributes: { 'data-gjs-type': 'footer' },
            style: { padding: '20px', background: '#f8f8f8' },
            components: [
              {
                tagName: 'p',
                type: 'text',
                style: {
                  'font-family': 'inherit',
                  'font-size': '16px',
                  'color': '#666',
                  'text-align': 'center',
                  margin: '0'
                },
                content: '© 2025 Modern Restaurant. All rights reserved.'
              }
            ]
          }
        ],
        styles: [
          {
            selectors: ['.menu-grid'],
            style: {
              padding: '20px'
            }
          },
          {
            selectors: ['.menu-grid-header'],
            style: {
              display: 'flex',
              'justify-content': 'space-between',
              'align-items': 'center',
              'margin-bottom': '20px',
              padding: '0 10px'
            }
          },
          {
            selectors: ['.menu-items-container'],
            style: {
              display: 'grid',
              'grid-template-columns': 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px'
            }
          },
          {
            selectors: ['.menu-item'],
            style: {
              position: 'relative',
              background: 'white',
              padding: '15px',
              'border-radius': '8px',
              'box-shadow': '0 2px 4px rgba(0,0,0,0.1)'
            }
          }
        ]
      }
    }
  },
  {
    id: 'cafe-cozy',
    name: 'Cozy Café',
    preview: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'A warm and inviting template ideal for cafés and coffee shops.',
    page: {
      gjs: {
        components: [
          {
            tagName: 'header',
            type: 'header',
            attributes: { 'data-gjs-type': 'header' },
            style: { 
              padding: '30px 20px',
              background: '#fff8f0',
              'border-bottom': '1px solid #ffe4cc'
            },
            components: [
              {
                tagName: 'h1',
                type: 'text',
                style: {
                  'font-family': 'Georgia, serif',
                  'font-weight': '700',
                  'font-size': '32px',
                  'color': '#8b4513',
                  'text-align': 'center',
                  margin: '0'
                },
                content: 'Cozy Café'
              }
            ]
          },
          {
            tagName: 'div',
            type: 'menu-grid',
            attributes: { 'data-gjs-type': 'menu-grid' },
            style: { 
              padding: '40px 20px',
              background: '#fff'
            },
            components: [
              {
                tagName: 'div',
                type: 'menu-grid-header',
                attributes: { 'data-gjs-type': 'menu-grid-header' },
                style: {
                  display: 'flex',
                  'justify-content': 'space-between',
                  'align-items': 'center',
                  'margin-bottom': '30px',
                  padding: '0 10px'
                },
                components: [
                  {
                    tagName: 'h2',
                    type: 'text',
                    style: {
                      'font-family': 'Georgia, serif',
                      'font-size': '28px',
                      'color': '#8b4513',
                      margin: '0'
                    },
                    content: 'Our Menu'
                  },
                  {
                    tagName: 'div',
                    type: 'add-menu-btn',
                    attributes: { 'data-gjs-type': 'add-menu-btn' },
                    content: '+',
                    style: {
                      width: '32px',
                      height: '32px',
                      'border-radius': '50%',
                      background: '#8b4513',
                      color: 'white',
                      display: 'flex',
                      'align-items': 'center',
                      'justify-content': 'center',
                      cursor: 'pointer',
                      'font-size': '24px'
                    }
                  }
                ]
              },
              {
                tagName: 'div',
                type: 'menu-items-container',
                attributes: { 'data-gjs-type': 'menu-items-container' },
                style: {
                  display: 'grid',
                  'grid-template-columns': 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '30px'
                }
              }
            ]
          },
          {
            tagName: 'footer',
            type: 'footer',
            attributes: { 'data-gjs-type': 'footer' },
            style: { 
              padding: '30px 20px',
              background: '#8b4513',
              color: '#fff8f0',
              'text-align': 'center'
            },
            components: [
              {
                tagName: 'p',
                type: 'text',
                style: {
                  'font-family': 'Georgia, serif',
                  'font-size': '16px',
                  margin: '0'
                },
                content: '© 2025 Cozy Café. All rights reserved.'
              }
            ]
          }
        ],
        styles: [
          {
            selectors: ['body'],
            style: {
              'font-family': 'Georgia, serif',
              'background-color': '#fff8f0',
              color: '#8b4513'
            }
          },
          {
            selectors: ['.menu-item'],
            style: {
              position: 'relative',
              background: '#fff',
              padding: '20px',
              'border-radius': '12px',
              'box-shadow': '0 4px 6px rgba(139, 69, 19, 0.1)',
              'border': '1px solid #ffe4cc'
            }
          },
          {
            selectors: ['.menu-item h3'],
            style: {
              'font-family': 'Georgia, serif',
              'font-size': '20px',
              'color': '#8b4513',
              'margin-bottom': '10px'
            }
          },
          {
            selectors: ['.menu-item .description'],
            style: {
              'color': '#a67c52',
              'font-size': '14px',
              'line-height': '1.6'
            }
          },
          {
            selectors: ['.menu-item .price'],
            style: {
              'color': '#8b4513',
              'font-weight': 'bold',
              'font-size': '18px',
              'margin-top': '15px'
            }
          }
        ]
      }
    }
  },
  {
    id: 'blank',
    name: 'Blank Project',
    preview: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    description: 'Start from scratch with a blank canvas.',
    page: {
      gjs: {
        components: [],
        styles: []
      }
    }
  }
];

export default function Projetos() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'name'>('recent');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [projectName, setProjectName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<number | null>(null);
  const navigate = useNavigate();

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
        
        let sortedProjects = [...response.data].map(project => ({
          ...project,
          created_at: project.created_at ? new Date(project.created_at).toISOString() : new Date().toISOString()
        }));

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

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate || !projectName.trim()) return;

    try {
      setIsCreating(true);
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("Authentication token not found");

      const response = await axios.post('http://localhost:8080/project', {
        name: projectName,
        token: token,
        createdAt: new Date().toISOString(),
        page: selectedTemplate.page
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      navigate(`/builder?projectId=${response.data.id}`);
    } catch (err) {
      console.error("Error creating project:", err);
      setError("Failed to create project. Please try again.");
    } finally {
      setIsCreating(false);
      setIsCreateModalOpen(false);
    }
  };

  const handleDeleteProject = async (projectId: number) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("Authentication token not found");

      await axios.delete(`http://localhost:8080/project/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setProjects(projects.filter(project => project.id !== projectId));
      setDeleteProjectId(null);
    } catch (err) {
      console.error("Error deleting project:", err);
      alert("Failed to delete project. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date');
      }
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      console.error("Date formatting error:", e);
      return "Invalid date";
    }
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
              <button 
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                <FiPlus className="mr-2" /> Criar Projeto
              </button>
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
                  <div
                    key={project.id}
                    className="group rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition duration-200 relative"
                  >
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveDropdown(activeDropdown === project.id ? null : project.id);
                        }}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <FiMoreVertical className="text-gray-600" />
                      </button>
                      {activeDropdown === project.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setDeleteProjectId(project.id);
                              setActiveDropdown(null);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                          >
                            <FiTrash2 className="mr-2" />
                            Delete Project
                          </button>
                        </div>
                      )}
                    </div>
                    <Link to={`/builder?projectId=${project.id}`}>
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
                          Criado em: {formatDate(project.created_at)}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />

        {deleteProjectId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Delete Project</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this project? This action cannot be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteProjectId(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProject(deleteProjectId)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center"
                >
                  <FiTrash2 className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Create New Project</h2>
                <button
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleCreateProject}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter project name"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`border rounded-lg overflow-hidden cursor-pointer transition-all ${
                        selectedTemplate?.id === template.id
                          ? 'ring-2 ring-red-500'
                          : 'hover:shadow-lg'
                      }`}
                      onClick={() => setSelectedTemplate(template)}
                    >
                      <img
                        src={template.preview}
                        alt={template.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                        <p className="text-gray-600 text-sm">{template.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setIsCreateModalOpen(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!selectedTemplate || !projectName.trim() || isCreating}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                  >
                    {isCreating ? (
                      <>
                        <FiLoader className="animate-spin mr-2" />
                        Creating...
                      </>
                    ) : (
                      'Create Project'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}