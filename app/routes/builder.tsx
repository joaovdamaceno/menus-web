import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import { IoIosAddCircle } from "react-icons/io";
import { FiPlus } from "react-icons/fi";
import { createRoot } from "react-dom/client";
import { Link } from "@remix-run/react";
import "~/styles/grapesjs-custom.css";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

export default function Builder() {
  const editorRef = useRef(null);
  const editorContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    price: 0,
    description: '',
  });

  const generateGridContent = (items: MenuItem[]) => {
    return items.map(item => `
      <div class="menu-item" style="background: white; padding: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <h3 style="font-size: 18px; margin-bottom: 8px;">${item.name}</h3>
        <p style="color: #666;">${item.description}</p>
        <p style="color: #e53e3e; font-weight: bold; margin-top: 8px;">R$ ${item.price.toFixed(2)}</p>
      </div>
    `).join('');
  };

  // Novos blocos inspirados na Wix
  const componentsBlocks = [
    {
      id: "header",
      label: `<div class="block-label">
                <strong>Cabeçalho</strong><br>
                <span class="block-description">Cabeçalho do site</span>
              </div>`,
      content: `<header style="padding:20px; background:#f8f8f8;">
                  <h1>Cabeçalho</h1>
                </header>`,
      category: "Componentes",
    },
    {
      id: "navbar",
      label: `<div class="block-label">
                <strong>Navbar</strong><br>
                <span class="block-description">Navegação do site</span>
              </div>`,
      content: `<nav class="navbar" style="padding:10px; background:#333; color:white;">
                  <ul style="display:flex; gap:20px; list-style:none; margin:0; padding:0;">
                    <li>Home</li>
                    <li>Sobre</li>
                    <li>Contato</li>
                  </ul>
                </nav>`,
      category: "Componentes",
    },
    {
      id: "carousel",
      label: `<div class="block-label">
                <strong>Carrossel</strong><br>
                <span class="block-description">Carrossel de imagens</span>
              </div>`,
      content: `<div class="carousel" style="width:100%; overflow:hidden;">
                  <div class="carousel-inner" style="display:flex; transition: transform 0.5s ease;">
                    <div class="carousel-item" style="min-width:100%;">
                      <img src="https://via.placeholder.com/600x300" alt="Slide 1" style="width:100%; display:block;" />
                    </div>
                    <div class="carousel-item" style="min-width:100%;">
                      <img src="https://via.placeholder.com/600x300" alt="Slide 2" style="width:100%; display:block;" />
                    </div>
                    <div class="carousel-item" style="min-width:100%;">
                      <img src="https://via.placeholder.com/600x300" alt="Slide 3" style="width:100%; display:block;" />
                    </div>
                  </div>
                </div>`,
      category: "Componentes",
    },
    {
      id: "button",
      label: `<div class="block-label">
                <strong>Botão</strong><br>
                <span class="block-description">Botão de ação</span>
              </div>`,
      content: `<button style="padding:10px 20px; background:#007bff; color:white; border:none; border-radius:5px;">
                  Clique aqui
                </button>`,
      category: "Componentes",
    },
    {
      id: "grid",
      label: `<div class="block-label">
                <strong>Grid do Cardápio</strong><br>
                <span class="block-description">Grid responsiva para itens do cardápio</span>
              </div>`,
      content: `<div class="menu-grid" data-gjs-type="menu-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; padding: 20px;">
        ${generateGridContent([])}
      </div>`,
      category: "Componentes",
    },
    {
      id: "footer",
      label: `<div class="block-label">
                <strong>Rodapé</strong><br>
                <span class="block-description">Rodapé do site</span>
              </div>`,
      content: `<footer style="padding:20px; background:#f8f8f8;">
                  <p>Rodapé</p>
                </footer>`,
      category: "Componentes",
    },
  ];

  const updateAllGrids = () => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const menuGrids = editor.DomComponents.getWrapper().find('.menu-grid');
      const content = generateGridContent(menuItems);
      
      menuGrids.forEach(grid => {
        grid.components(content);
      });
    }
  };

  const handleAddMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.name && newItem.price) {
      const item: MenuItem = {
        id: crypto.randomUUID(),
        name: newItem.name,
        price: newItem.price,
        description: newItem.description || '',
      };
      
      const updatedItems = [...menuItems, item];
      setMenuItems(updatedItems);
      
      setNewItem({ name: '', price: 0, description: '' });
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (!editorRef.current && editorContainerRef.current) {
      editorRef.current = grapesjs.init({
        container: editorContainerRef.current,
        height: "100%",
        width: "100%",
        fromElement: false,
        storageManager: { autoload: 0 },
        panels: { defaults: [] },
        blockManager: {
          appendTo: "#blocks",
          blocks: [],
        },
        styleManager: {
          appendTo: "#panel-sm",
          sectors: [
            {
              name: "General",
              open: false,
              buildProps: ["float", "display", "position", "top", "right", "left", "bottom"],
            },
            {
              name: "Dimension",
              open: false,
              buildProps: ["width", "height", "max-width", "min-height", "margin", "padding"],
            },
            {
              name: "Typography",
              open: false,
              buildProps: ["font-family", "font-size", "font-weight", "color", "line-height", "letter-spacing"],
            },
            {
              name: "Decorations",
              open: false,
              buildProps: ["background-color", "border-radius", "border", "box-shadow"],
            },
            {
              name: "Extra",
              open: false,
              buildProps: ["opacity", "transform"],
            },
          ],
        },
      });

      // Register custom component type for menu grid
      editorRef.current.DomComponents.addType('menu-grid', {
        model: {
          defaults: {
            droppable: false,
            traits: [],
          },
          init() {
            this.on('change:content', this.handleContentChange);
          },
          handleContentChange() {
            // Ensure the grid always has the current menu items
            if (this.get('classes')?.includes('menu-grid')) {
              this.components(generateGridContent(menuItems));
            }
          },
        },
      });

      // Painel customizado para o Style Manager
      editorRef.current.Panels.addPanel({
        id: "panel-sm",
        el: "#panel-sm",
      });

      // Watch for component additions
      editorRef.current.on('component:add', (component) => {
        if (component.get('classes')?.includes('menu-grid')) {
          component.components(generateGridContent(menuItems));
        }
      });

      // Watch for component changes
      editorRef.current.on('component:update', (component) => {
        if (component.get('classes')?.includes('menu-grid')) {
          component.components(generateGridContent(menuItems));
        }
      });

      // Exemplo de customização dos títulos dos blocos
      editorRef.current.on("load", () => {
        document.querySelectorAll(".gjs-title").forEach((title) => {
          title.innerHTML = "";
          title.style.display = "flex";
          const iconContainer = document.createElement("span");
          iconContainer.classList.add("gjs-custom-icon");
          title.appendChild(iconContainer);
          const root = createRoot(iconContainer);
          root.render(<FiPlus size={34} />);
          title.addEventListener("click", function () {
            const dropdown = this.nextElementSibling;
            const rect = this.getBoundingClientRect();
            dropdown.style.top = `${rect.bottom + window.scrollY - 128}px`;
            dropdown.style.left = `${rect.right + window.scrollX + 10}px`;
          });
        });
      });

      const bm = editorRef.current.BlockManager;
      bm.getAll().reset();
      componentsBlocks.forEach((block) => {
        if (block.id === 'grid') {
          block.content = `<div class="menu-grid" data-gjs-type="menu-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; padding: 20px;">
            ${generateGridContent(menuItems)}
          </div>`;
        }
        bm.add(block.id, block);
      });
      bm.render();
      bm.getCategories().each((category) => {
        category.set("open", false);
      });
    }
  }, []);

  // Update all grids when menu items change
  useEffect(() => {
    if (editorRef.current) {
      // Update the grid block content
      const bm = editorRef.current.BlockManager;
      const gridBlock = bm.get('grid');
      if (gridBlock) {
        gridBlock.set('content', `<div class="menu-grid" data-gjs-type="menu-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; padding: 20px;">
          ${generateGridContent(menuItems)}
        </div>`);
      }
      
      // Update existing grids
      updateAllGrids();
    }
  }, [menuItems]);

  const renderLeftSidebarContent = () => (
    <div>
      <div id="blocks">
        {/* O Block Manager do GrapesJS renderiza os blocos aqui */}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Toolbar Superior */}
      <div className="fixed w-full left-0 top-0 z-50 bg-white flex justify-between items-center p-4 border-b">
        <div className="flex space-x-2 mx-auto">
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Publicar
        </button>
      </div>
      
      <div className="flex flex-1 pt-20">
        {/* Sidebar Esquerda */}
        <aside className="fixed left-0 top-20 h-full bg-white/50 z-50 p-4 overflow-auto">
          {renderLeftSidebarContent()}
        </aside>

        {/* Área Central do Editor */}
        <main className="flex-1 relative">
          <div ref={editorContainerRef} className="h-full" id="gjs"></div>
          
          {/* Floating Add Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="fixed bottom-8 left-8 bg-red-500 text-white rounded-full p-3 shadow-lg hover:bg-red-600 transition-colors z-50"
            aria-label="Adicionar item ao cardápio"
          >
            <FiPlus size={24} />
          </button>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Adicionar Item ao Cardápio</h2>
                <form onSubmit={handleAddMenuItem}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nome</label>
                      <input
                        type="text"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Preço</label>
                      <input
                        type="number"
                        step="0.01"
                        value={newItem.price}
                        onChange={(e) => setNewItem({ ...newItem, price: Number(e.target.value) })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Descrição</label>
                      <textarea
                        value={newItem.description}
                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                    >
                      Adicionar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Painel de Propriedades Fixo */}
          <div className="fixed top-24 right-0 w-64 z-50">
            <div className="px-4 py-3">
              <h3 className="text-red-500 tracking-wide">Propriedades</h3>
            </div>
            <div id="panel-sm" className="h-[calc(100vh-160px)] overflow-y-auto"></div>
          </div>
        </main>
      </div>
    </div>
  );
}