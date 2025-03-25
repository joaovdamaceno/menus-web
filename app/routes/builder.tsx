import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "~/styles/grapesjs-custom.css";
import { FiLayers, FiSave, FiDownload, FiEye, FiCheck } from "react-icons/fi";
import { Link, useSearchParams, useNavigate } from "@remix-run/react";
import axios from "axios";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface GridStyle {
  selector: string;
  style: Record<string, string>;
}

interface Block {
  id: string;
  category: string;
  label: string;
  content: string;
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

export default function Builder() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const projectId = searchParams.get("projectId");
  const editorRef = useRef(null);
  const editorContainerRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isComponentsModalOpen, setIsComponentsModalOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showTemplateConfirmation, setShowTemplateConfirmation] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [gridStyles, setGridStyles] = useState<GridStyle[]>([]);
  const [hasGrid, setHasGrid] = useState(false);
  const [hasHeader, setHasHeader] = useState(false);
  const [hasFooter, setHasFooter] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showBackButton, setShowBackButton] = useState(true);
  const [projectName, setProjectName] = useState("My Project");
  const [publishSuccess, setPublishSuccess] = useState(false);
const [publishedDomain, setPublishedDomain] = useState('');
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: '',
    price: 0,
    description: '',
  });

  const loadProjectData = async () => {
    if (!projectId || !editorRef.current) return;

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("Authentication token not found");

      const response = await axios.get(`http://localhost:8080/project/${projectId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const projectData = response.data;
      setProjectName(projectData.name);
      
      if (projectData.page?.gjs) {
        editorRef.current.loadProjectData(projectData.page.gjs);
      }
    } catch (err) {
      console.error("Error loading project:", err);
    }
  };

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setShowTemplateConfirmation(true);
  };

  const handleTemplateConfirm = () => {
    if (selectedTemplate && editorRef.current) {
      editorRef.current.loadProjectData(selectedTemplate.page.gjs);
      setShowTemplateConfirmation(false);
      setIsTemplatesModalOpen(false);
      setSelectedTemplate(null);
    }
  };

  const generateMenuItems = (items: MenuItem[]) => {
    return items.map(item => `
      <div class="menu-item" data-item-id="${item.id}" data-gjs-type="menu-item">
        <h3>${item.name}</h3>
        <p class="description">${item.description}</p>
        <p class="price">R$ ${item.price.toFixed(2)}</p>
        <div data-gjs-type="delete-btn" class="delete-btn" data-item-id="${item.id}">×</div>
      </div>
    `).join('');
  };

  const componentsBlocks = [
    {
      id: "header",
      category: "Headers",
      label: `
        <div class="block-preview">
          <div style="padding:20px; background:#f8f8f8; border-radius:4px;">
            <h1 style="margin:0; font-size:24px; color:#333;">Header</h1>
          </div>
          <div class="block-desc">Site Header</div>
        </div>
      `,
      content: `<header data-gjs-type="header" style="padding:20px; background:#f8f8f8;">
                  <h1 style="font-family: Arial, Helvetica, sans-serif; font-weight:900; font-size: 24px; color: #333;">Header</h1>
                </header>`,
    },
    {
      id: "grid",
      category: "Content",
      label: `
        <div class="block-preview">
          <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:10px; padding:10px; background:#fff; border-radius:4px;">
            <div style="background:#f0f0f0; padding:10px; border-radius:4px;"></div>
            <div style="background:#f0f0f0; padding:10px; border-radius:4px;"></div>
          </div>
          <div class="block-desc">Menu Grid</div>
        </div>
      `,
      content: `<div class="menu-grid" data-gjs-type="menu-grid">
        <div class="menu-grid-header" data-gjs-type="menu-grid-header">
          <h2 style="font-family: inherit; font-size: 24px; color: #333;">Menu Items</h2>
          <div data-gjs-type="add-menu-btn" class="add-menu-btn">+</div>
        </div>
        <div class="menu-items-container" data-gjs-type="menu-items-container">
          ${generateMenuItems([])}
        </div>
      </div>`,
    },
    {
      id: "footer",
      category: "Footers",
      label: `
        <div class="block-preview">
          <footer style="padding:20px; background:#f8f8f8; border-radius:4px; text-align:center;">
            <p style="margin:0; color:#666;">Footer</p>
          </footer>
          <div class="block-desc">Site Footer</div>
        </div>
      `,
      content: `<footer data-gjs-type="footer" style="padding:20px; background:#f8f8f8;">
                  <p style="font-family: inherit; font-size: 16px; color: #666;">Footer</p>
                </footer>`,
    },
  ];

  const checkForComponents = () => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const grids = editor.DomComponents.getWrapper().find('[data-gjs-type="menu-grid"]');
      const headers = editor.DomComponents.getWrapper().find('[data-gjs-type="header"]');
      const footers = editor.DomComponents.getWrapper().find('[data-gjs-type="footer"]');
      
      setHasGrid(grids.length > 0);
      setHasHeader(headers.length > 0);
      setHasFooter(footers.length > 0);
    }
  };

  const saveGridStyles = () => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const menuGrid = editor.DomComponents.getWrapper().find('[data-gjs-type="menu-grid"]')[0];
      
      if (menuGrid) {
        const styles = editor.Selectors.getAll().map(selector => {
          const style = editor.CssComposer.get(selector);
          if (style) {
            return {
              selector: selector.toString(),
              style: style.getStyle()
            };
          }
          return null;
        }).filter(Boolean);
        
        setGridStyles(styles);
      }
    }
  };

  const applyGridStyles = () => {
    if (editorRef.current && gridStyles.length > 0) {
      const editor = editorRef.current;
      gridStyles.forEach(style => {
        const selector = editor.Selectors.add(style.selector);
        editor.CssComposer.setRule(selector, style.style);
      });
    }
  };

  const updateAllGrids = () => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const menuGrids = editor.DomComponents.getWrapper().find('[data-gjs-type="menu-items-container"]');
      
      menuGrids.forEach(grid => {
        const content = generateMenuItems(menuItems);
        grid.components(content);
      });
    }
  };

  const handleDeleteMenuItem = (itemId: string) => {
    saveGridStyles();
    setMenuItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const handleAddMenuItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.name && newItem.price) {
      saveGridStyles();
      const item: MenuItem = {
        id: crypto.randomUUID(),
        name: newItem.name,
        price: newItem.price,
        description: newItem.description || '',
      };
      
      setMenuItems(prevItems => [...prevItems, item]);
      setNewItem({ name: '', price: 0, description: '' });
      setIsModalOpen(false);
    }
  };

  const handleAddComponent = (blockId: string) => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const block = editor.BlockManager.get(blockId);
      
      if (block) {
        if ((blockId === 'grid' && hasGrid) ||
            (blockId === 'header' && hasHeader) ||
            (blockId === 'footer' && hasFooter)) {
          return;
        }
        
        const content = block.get('content');
        if (blockId === 'grid') {
          editor.addComponents(`<div class="menu-grid" data-gjs-type="menu-grid">
            <div class="menu-grid-header" data-gjs-type="menu-grid-header">
              <h2 style="font-family: inherit; font-size: 24px; color: #333;">Menu Items</h2>
              <div data-gjs-type="add-menu-btn" class="add-menu-btn">+</div>
            </div>
            <div class="menu-items-container" data-gjs-type="menu-items-container">
              ${generateMenuItems(menuItems)}
            </div>
          </div>`);
          
          setTimeout(() => {
            applyGridStyles();
            checkForComponents();
          }, 100);
        } else {
          editor.addComponents(content);
          setTimeout(() => {
            checkForComponents();
          }, 100);
        }
      }
    }
    setIsComponentsModalOpen(false);
  };

  const handleSave = async () => {
    if (!editorRef.current) return;

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("Authentication token not found");

      const editor = editorRef.current;
      const gjsData = editor.getProjectData();
      
      const projectData = {
        name: projectName,
        token: token,
        createdAt: new Date().toISOString(),
        page: {
          gjs: gjsData
        }
      };

      if (projectId) {
        // Update existing project
        await axios.put(`http://localhost:8080/project`, {
          id: parseInt(projectId),
          name: projectName,
          page: {
            gjs: gjsData
          }
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        // Create new project
        const response = await axios.post('http://localhost:8080/project', projectData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Navigate to the new project
        navigate(`/builder?projectId=${response.data.id}`);
      }

      // Show success message
      alert("Project saved successfully!");
    } catch (err) {
      console.error("Error saving project:", err);
      alert("Failed to save project. Please try again.");
    }
  };

  const handlePublish = async () => {
    if (!projectId) {
      alert('Please save the project before publishing.');
      return;
    }
  
    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error("Authentication token not found");
      
      // Generate a slug from project name
      const domainName = projectName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
  
      const response = await axios.post(
        'http://localhost:8080/project/publish',
        {
          id: parseInt(projectId),
          domainName: domainName
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        setPublishedDomain(domainName);
        setPublishSuccess(true);
      }
    } catch (error) {
      if(error.response?.status == 409) {
        alert('O projeto já está publicado.');
      } else {
      console.error('Error publishing project:', error);
      alert('Failed to publish project. Please try again.');
      }
    }
  };
  
  const togglePreview = () => {
    if (editorRef.current) {
      const editor = editorRef.current;
      if (!isPreviewMode) {
        // Extract body styles from editor
        const bodyStyles = editor.CssComposer.getAll().filter(rule => 
          rule.selectorsToString().includes('body')
        ).map(rule => rule.getStyle());
        
        // Merge all body styles into single object
        const mergedBodyStyles = bodyStyles.reduce((acc, style) => ({...acc, ...style}), {});
  
        const customStyles = `
          <style>
            /* Base styles */
            body {
              margin: 0;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
              line-height: 1.5;
              ${Object.entries(mergedBodyStyles).map(([prop, value]) => `${prop}: ${value};`).join('\n')}
            }
            
            /* Preview-specific styles */
            .preview-mode [data-gjs-type="add-menu-btn"],
            .preview-mode [data-gjs-type="delete-btn"] {
              display: none !important;
            }
            
            /* Component styles */
            ${editor.getCss()}
            
            /* Additional styles to preserve component appearance */
            .menu-grid {
              padding: 20px;
            }
            
            .menu-grid-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 20px;
              padding: 0 10px;
            }
            
            .menu-grid-header h2 {
              font-size: 24px;
              color: #333;
              margin: 0;
            }
            
            .menu-items-container {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
              gap: 20px;
            }
            
            .menu-item {
              position: relative;
              background: white;
              padding: 15px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .menu-item h3 {
              font-size: 18px;
              margin-bottom: 8px;
              color: #333;
            }
            
            .menu-item .description {
              color: #666;
              margin-bottom: 8px;
            }
            
            .menu-item .price {
              color: #e53e3e;
              font-weight: bold;
            }
            
            /* Header and Footer styles */
            header, footer {
              padding: 20px;
              background: #f8f8f8;
            }
          </style>
        `;
        
        const content = customStyles + editor.getHtml();
        const previewContainer = document.createElement('div');
        previewContainer.id = 'preview-container';
        previewContainer.className = 'fixed inset-0 bg-white z-[9999] overflow-y-auto preview-mode';
        previewContainer.innerHTML = content;
        
        // Apply body styles directly to preview container
        Object.entries(mergedBodyStyles).forEach(([prop, value]) => {
          previewContainer.style[prop] = value;
        });
        
        const backButton = document.createElement('button');
        backButton.id = 'preview-back-button';
        backButton.className = 'fixed top-4 left-4 bg-red-500 text-white p-4 rounded-full flex items-center justify-center hover:bg-red-600 transition-all opacity-100';
        backButton.innerHTML = `
          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="24" width="24">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        `;
        
        let timeout;
        const hideButton = () => {
          backButton.style.opacity = '0';
          setShowBackButton(false);
        };
        
        const showButton = () => {
          backButton.style.opacity = '1';
          setShowBackButton(true);
          if (timeout) clearTimeout(timeout);
          timeout = setTimeout(hideButton, 1000);
        };
        
        backButton.addEventListener('mouseenter', () => {
          if (timeout) clearTimeout(timeout);
          showButton();
        });
        
        backButton.addEventListener('mouseleave', () => {
          timeout = setTimeout(hideButton, 1000);
        });
        
        previewContainer.addEventListener('mousemove', () => {
          showButton();
        });
        
        backButton.onclick = () => {
          if (timeout) clearTimeout(timeout);
          document.body.removeChild(previewContainer);
          setIsPreviewMode(false);
        };
        
        previewContainer.appendChild(backButton);
        document.body.appendChild(previewContainer);
        setIsPreviewMode(true);
        
        // Initial hide timeout
        timeout = setTimeout(hideButton, 1000);
      }
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
              name: "Typography",
              open: true,
              buildProps: [
                "font-family",
                "font-size",
                "font-weight",
                "color",
                "line-height",
                "letter-spacing",
                "text-align",
                "text-decoration"
              ],
            },
            {
              name: "Dimension",
              open: false,
              buildProps: ["width", "height", "max-width", "min-height", "margin", "padding"],
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
        deviceManager: {
          devices: [
            {
              name: 'Desktop',
              width: '',
            },
            {
              name: 'Mobile',
              width: '320px',
              widthMedia: '480px',
            },
          ],
        },
      });

      const editor = editorRef.current;

      editor.DomComponents.addType('add-menu-btn', {
        model: {
          defaults: {
            selectable: false,
            hoverable: false,
            draggable: false,
            droppable: false,
            layerable: false,
            editable: false,
            removable: false,
            highlightable: false,
            copyable: false,
            resizable: false,
            stylable: false,
            traits: [],
          },
        },
        view: {
          events: {
            click: function(e) {
              e.stopPropagation();
              setIsModalOpen(true);
            
            }
          },
        }
      });

      editor.DomComponents.addType('menu-grid-header', {
        model: {
          defaults: {
            draggable: false,
            droppable: false,
            removable: false,
            copyable: false,
            traits: [],
          },
        },
      });

      editor.DomComponents.addType('menu-items-container', {
        model: {
          defaults: {
            draggable: false,
            droppable: false,
            removable: false,
            copyable: false,
            traits: [],
          },
        },
      });

      editor.DomComponents.addType('delete-btn', {
        model: {
          defaults: {
            selectable: false,
            hoverable: false,
            draggable: false,
            droppable: false,
            layerable: false,
            editable: false,
            removable: false,
            highlightable: false,
            copyable: false,
            resizable: false,
            stylable: false,
            traits: [],
          },
        },
        view: {
          events: {
            click: function(e) {
              e.stopPropagation();
              const itemId = this.model.get('attributes')['data-item-id'];
              if (itemId) {
                handleDeleteMenuItem(itemId);
              }
            }
          },
        }
      });

      editor.DomComponents.addType('menu-item', {
        model: {
          defaults: {
            draggable: false,
            droppable: false,
            removable: false,
            copyable: false,
            traits: [],
          },
        },
      });

      editor.DomComponents.addType('menu-grid', {
        model: {
          defaults: {
            droppable: false,
            traits: [],
            styles: `
              .menu-grid {
                padding: 20px;
              }
              .menu-grid-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding: 0 10px;
              }
              .menu-grid-header h2 {
                font-size: 24px;
                color: #333;
                margin: 0;
              }
              .add-menu-btn {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                background: #e53e3e;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 24px;
                transition: background-color 0.2s, transform 0.2s;
              }
              .preview-mode .add-menu-btn {
                display: none !important;
              }
              .add-menu-btn:hover {
                background: #c53030;
                transform: scale(1.05);
              }
              .menu-items-container {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
              }
              .menu-item {
                position: relative;
                background: white;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              .menu-item h3 {
                font-size: 18px;
                margin-bottom: 8px;
                color: #333;
              }
              .menu-item .description {
                color: #666;
                margin-bottom: 8px;
              }
              .menu-item .price {
                color: #e53e3e;
                font-weight: bold;
              }
              .menu-item .delete-btn {
                position: absolute;
                top: 8px;
                right: 8px;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                background: #e53e3e;
                color: white;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 18px;
                line-height: 1;
                opacity: 0;
                transition: opacity 0.2s;
              }
              .preview-mode .delete-btn {
                display: none !important;
              }
              .menu-item:hover .delete-btn {
                opacity: 1;
              }
              .menu-item .delete-btn:hover {
                background: #c53030;
              }
            `,
          },
        },
      });

      editor.on('component:remove', (component) => {
        const type = component.get('type');
        if (type === 'menu-grid' || type === 'header' || type === 'footer') {
          setTimeout(() => {
            checkForComponents();
          }, 100);
        }
      });

      editor.on('component:add', (component) => {
        const type = component.get('type');
        if (type === 'menu-grid' || type === 'header' || type === 'footer') {
          setTimeout(() => {
            checkForComponents();
          }, 100);
        }
      });

      const bm = editor.BlockManager;
      bm.getAll().reset();
      componentsBlocks.forEach((block) => {
        bm.add(block.id, block);
      });

      // Load project data after editor initialization
      loadProjectData();
    }
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      updateAllGrids();
    }
  }, [menuItems]);

  return (
    <div className="flex flex-col h-screen">
      <div className="fixed w-full left-0 top-0 z-50 bg-white flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-gray-800">Menus</h1>
          <div className="h-6 w-px bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiSave size={18} />
              <span>Save</span>
            </button>
            <button
              onClick={togglePreview}
              className="flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiEye size={18} />
              <span>Preview</span>
            </button>
          </div>
        </div>
        <button 
          onClick={handlePublish}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-medium"
        >
          Publish
        </button>
      </div>
      {/* Success Modal */}
      {publishSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">🚀 Published Successfully!</h2>
            <p className="mb-4">Your website is now live at:</p>
            <Link
              to={`/site/${publishedDomain}`}
              className="text-red-500 hover:underline break-words"
              target="_blank"
              reloadDocument
            >
              {window.location.origin}/site/{publishedDomain}
            </Link>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setPublishSuccess(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md mr-2"
              >
                Close
              </button>
              <Link
                to={`/site/${publishedDomain}`}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                target="_blank"
                reloadDocument
              >
                Visit Site
              </Link>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => setIsComponentsModalOpen(true)}
        className="fixed left-6 top-1/2 -translate-y-1/2 z-50 bg-red-500 text-white p-4 rounded-full hover:bg-red-600 transition-all hover:scale-105 shadow-lg"
      >
        <FiLayers size={24} />
      </button>
      
      <div className="flex flex-1 pt-16">
        <main className="flex-1 relative">
          <div ref={editorContainerRef} className="h-full" id="gjs"></div>

          {isComponentsModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
              <div className="bg-white rounded-xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <FiLayers size={24} className="text-red-500" />
                      <h2 className="text-2xl font-bold">Add Components</h2>
                    </div>
                    <button
                      onClick={() => setIsComponentsModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  {Object.entries(componentsBlocks.reduce((acc, block) => {
                    if (!acc[block.category]) {
                      acc[block.category] = [];
                    }
                    acc[block.category].push(block);
                    return acc;
                  }, {} as Record<string, Block[]>)).map(([category, blocks]) => (
                    <div key={category} className="mb-12">
                      <h3 className="text-xl font-semibold mb-6 text-gray-800">{category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blocks.map((block) => {
                          const isDisabled = (block.id === 'grid' && hasGrid) ||
                                          (block.id === 'header' && hasHeader) ||
                                          (block.id === 'footer' && hasFooter);
                          
                          return (
                            <div
                              key={block.id}
                              className={`relative cursor-pointer transition-all duration-200 ${
                                isDisabled ? 'cursor-not-allowed opacity-50' : 'hover:transform hover:scale-105'
                              }`}
                              onClick={() => !isDisabled && handleAddComponent(block.id)}
                            >
                              <div className="border border-gray-200 rounded-xl overflow-hidden hover:border-red-500 transition-colors">
                                <div dangerouslySetInnerHTML={{ __html: block.label }} />
                              </div>
                              {isDisabled && (
                                <div className="absolute inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center rounded-xl">
                                  <div className="bg-green-500 text-white rounded-full p-2">
                                    <FiCheck size={24} />
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
              <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Add Menu Item</h2>
                <form onSubmit={handleAddMenuItem}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        value={newItem.name}
                        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
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
                      <label className="block text-sm font-medium text-gray-700">Description</label>
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
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          <div className="fixed top-24 right-0 w-64 z-50">
            <div className="px-4 py-3">
              <h3 className="text-red-500 tracking-wide">Properties</h3>
            </div>
            <div id="panel-sm" className="h-[calc(100vh-160px)] overflow-y-auto"></div>
          </div>
        </main>
      </div>
    </div>
  );
}