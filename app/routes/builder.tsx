import React, { useEffect, useRef, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import { Link } from "@remix-run/react";
import '~/styles/grapesjs-custom.css';

export default function Builder() {
  // Referência para o editor GrapesJS e seu container
  const editorRef = useRef<any>(null);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  // Estado para a aba de preview ativa ("menu", "carrinho" ou "pagamento") 
  // e para a aba da sidebar esquerda ("componentes" ou "templates")
  const [activePreview, setActivePreview] = useState("menu");
  const [activeTab, setActiveTab] = useState("componentes");

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

  // Blocos para "Templates" com mini descrições
  const templatesBlocks = [
    {
      id: 'template1',
      label: `<div class="block-label">
                <strong>Template Moderno</strong><br>
                <span class="block-description">Template moderno para restaurantes</span>
              </div>`,
      content: `<div style="padding:20px;">
                  <h1>Template Moderno</h1>
                  <p>Conteúdo do template moderno</p>
                </div>`,
      category: 'Templates',
    },
    {
      id: 'template2',
      label: `<div class="block-label">
                <strong>Template Clássico</strong><br>
                <span class="block-description">Template clássico com design tradicional</span>
              </div>`,
      content: `<div style="padding:20px;">
                  <h1>Template Clássico</h1>
                  <p>Conteúdo do template clássico</p>
                </div>`,
      category: 'Templates',
    },
    // Adicione outros blocos de templates conforme necessário
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
              open: true,
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

      // Salva o conteúdo inicial da página ativa ("menu")
      pagesContentRef.current.menu = {
        components: JSON.parse(JSON.stringify(editorRef.current.getComponents())),
        css: editorRef.current.getCss(),
      };
    }
  }, []);

  // Atualiza os blocos do Block Manager conforme a aba ativa ("componentes" ou "templates")
  useEffect(() => {
    if (editorRef.current) {
      const bm = editorRef.current.BlockManager;
      // Remove todos os blocos existentes
      bm.getAll().reset();
      // Adiciona os blocos da aba selecionada
      if (activeTab === 'componentes') {
        componentsBlocks.forEach(block => bm.add(block.id, block));
      } else if (activeTab === 'templates') {
        templatesBlocks.forEach(block => bm.add(block.id, block));
      }
      bm.render();
    }
  }, [activeTab]);

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
      <input
        type="text"
        placeholder={`Pesquisar ${activeTab}...`}
        className="border rounded p-2 w-full mb-4"
      />
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
        <aside className="w-64 bg-gray-50 border-r p-4 overflow-auto">
          <div className="mb-6">
            <button onClick={() => window.location.href = '/projetos'} className="text-xl font-bold">
              Logo
            </button>
            <div className="mt-2 space-y-1">
              <button className="w-full text-left py-2 hover:bg-gray-100 rounded">
                Salvar
              </button>
              <button className="w-full text-left py-2 hover:bg-gray-100 rounded">
                Carregar
              </button>
              <button className="w-full text-left py-2 hover:bg-gray-100 rounded">
                Renomear
              </button>
              <button className="w-full text-left py-2 hover:bg-gray-100 rounded">
                Sair
              </button>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-bold">Projeto: Meu Projeto</h3>
          </div>
          <div className="flex space-x-2 mb-4">
            <button
              onClick={() => setActiveTab("componentes")}
              className={`px-3 py-1 rounded ${activeTab === "componentes" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              Componentes
            </button>
            <button
              onClick={() => setActiveTab("templates")}
              className={`px-3 py-1 rounded ${activeTab === "templates" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              Templates
            </button>
          </div>
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
