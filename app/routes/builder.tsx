import React, { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { Link } from "@remix-run/react";
import '~/styles/grapesjs-custom.css';
import { IoIosAddCircle } from "react-icons/io";
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

export default function Builder() {
  // Referência para o editor GrapesJS e seu container
  const editorRef = useRef<any>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  // Estado para a aba de preview ativa ("menu", "carrinho" ou "pagamento") 
  // e para a aba da sidebar esquerda ("componentes" ou "templates")
  const [activePreview, setActivePreview] = useState("menu");
    
  // Armazena o conteúdo de cada página (para salvar/restaurar o estado do editor)
  const pagesContentRef = useRef({
    menu: { components: [] as any[], css: '' },
    carrinho: { components: [] as any[], css: '' },
    pagamento: { components: [] as any[], css: '' },
  });

  // Blocos para "Componentes" com mini descrições
  const componentsBlocks = [
    {
      id: 'header',
      label: `<div class="block-label">
                <strong>Cabeçalho</strong><br>
                <span class="block-description">Cabeçalho do site</span>
              </div>`,
      content: `<header style="padding:20px; background:#f8f8f8;"><h1>Cabeçalho</h1></header>`,
      category: 'Componentes',
    },
    {
      id: 'footer',
      label: `<div class="block-label">
                <strong>Rodapé</strong><br>
                <span class="block-description">Rodapé do site</span>
              </div>`,
      content: `<footer style="padding:20px; background:#f8f8f8;"><p>Rodapé</p></footer>`,
      category: 'Componentes',
    },
    // Adicione outros blocos de componentes conforme necessário
  ];

  // Inicializa o GrapesJS apenas uma vez
  useEffect(() => {
    if (!editorRef.current && editorContainerRef.current) {
      editorRef.current = grapesjs.init({
        container: editorContainerRef.current,
        height: '100%',
        width: '100%',
        fromElement: false,
        storageManager: { autoload: 0 },
        // Removendo os painéis padrão para deixar a interface mais clean
        panels: { defaults: [] },
        // Inicializamos o Block Manager sem blocos; estes serão adicionados conforme a aba ativa
        blockManager: {
          appendTo: '#blocks',
          blocks: [],
        },
        // Configuração do Style Manager
        styleManager: {
          appendTo: '#panel-sm',
          sectors: [
            {
              name: 'General',
              open: false,
              buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
            },
            {
              name: 'Dimension',
              open: false,
              buildProps: ['width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
            },
            {
              name: 'Typography',
              open: false,
              buildProps: ['font-family', 'font-size', 'font-weight', 'color', 'line-height', 'letter-spacing'],
            },
            {
              name: 'Decorations',
              open: false,
              buildProps: ['background-color', 'border-radius', 'border', 'box-shadow'],
            },
            {
              name: 'Extra',
              open: false,
              buildProps: ['opacity', 'transform'],
            },
          ],
        },
      });

    // Cria um painel customizado para o Style Manager (sidebar direita)
    editorRef.current.Panels.addPanel({
      id: 'panel-sm',
      el: '#panel-sm',
    });

    editorRef.current.on('load', () => {
      document.querySelectorAll('.gjs-title').forEach((title) => {
        title.innerHTML = '';

        (title as HTMLElement).style.display = 'flex';

        const iconContainer = document.createElement('span');
        iconContainer.classList.add('gjs-custom-icon');
        title.appendChild(iconContainer);

        const root = createRoot(iconContainer);
        root.render(<IoIosAddCircle size={34} />);

        title.addEventListener('click', function() {
          const dropdown = this.nextElementSibling;
          
          const rect = this.getBoundingClientRect();
          
          dropdown.style.top = `${rect.bottom + window.scrollY - 128}px`;
          dropdown.style.left = `${rect.right + window.scrollX + 10}px`;
        });
      });
    });
  
    const bm = editorRef.current.BlockManager;

    // Primeiro, removemos todos os blocos (se houver)
    bm.getAll().reset();
    // Adiciona os blocos
    componentsBlocks.forEach(block => bm.add(block.id, block));
    // Renderiza os blocos (e com eles as categorias são criadas)
    bm.render();

    // Agora, após renderizar, percorre todas as categorias e as fecha
    bm.getCategories().each(category => {
      category.set('open', false);
    });

    pagesContentRef.current.menu = {
      components: JSON.parse(JSON.stringify(editorRef.current.getComponents())),
      css: editorRef.current.getCss(),
    };
  }
}, []);

  // Função para trocar de página (preview) salvando o conteúdo atual e carregando o conteúdo salvo da nova página
  const switchPreview = (newPreview: string) => {
    if (!editorRef.current) return;

    // Salva o conteúdo atual da página ativa (utilizando deep clone)
    pagesContentRef.current[activePreview] = {
      components: JSON.parse(JSON.stringify(editorRef.current.getComponents())),
      css: editorRef.current.getCss(),
    };

    // Carrega o conteúdo salvo da nova página (se houver); caso contrário, limpa o editor
    const newContent = pagesContentRef.current[newPreview];
    if (newContent && newContent.components && newContent.components.length > 0) {
      editorRef.current.setComponents(JSON.parse(JSON.stringify(newContent.components)));
      editorRef.current.setStyle(newContent.css);
    } else {
      editorRef.current.setComponents([]);
      editorRef.current.setStyle('');
    }

    setActivePreview(newPreview);
  };

  // Renderiza a área da sidebar esquerda (o container dos blocos)
  const renderLeftSidebarContent = () => (
    <div>
      <div id="blocks">
        {/* O Block Manager do GrapesJS renderiza os blocos aqui */}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-screen">
      {/* Toolbar Superior: Preview Tabs e Botão Publicar */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex space-x-2">
          <button
            onClick={() => switchPreview("menu")}
            className={`px-4 py-2 rounded ${activePreview === "menu" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Menu
          </button>
          <button
            onClick={() => switchPreview("carrinho")}
            className={`px-4 py-2 rounded ${activePreview === "carrinho" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Carrinho
          </button>
          <button
            onClick={() => switchPreview("pagamento")}
            className={`px-4 py-2 rounded ${activePreview === "pagamento" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            Pagamento
          </button>
        </div>
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Publicar
        </button>
      </div>
      
      <div className="flex flex-1">
        {/* Sidebar Esquerda */}
        <aside className="fixed left-0 top-60 h-full bg-white/50  z-10 p-4 overflow-auto">
          {renderLeftSidebarContent()}
        </aside>

        {/* Área Central de Edição / Preview */}
        <main className="flex-1 relative">
          <div ref={editorContainerRef} className="h-full" id="gjs"></div>
        </main>

        {/* Sidebar Direita: Propriedades (Style Manager) */}
        <aside className="w-64 bg-gray-50 border-l p-4 overflow-auto">
          <h3 className="font-bold mb-4">Propriedades</h3>
          <div id="panel-sm"></div>
        </aside>
      </div>
    </div>
  );
}
