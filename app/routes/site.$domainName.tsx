import { useEffect, useState } from 'react';
import { useParams } from '@remix-run/react';
import axios from 'axios';

interface ProjectData {
  id: number;
  createdAt: string;
  userId: number;
  page: {
    gjs: {
      components: any[];
      styles: any[];
    };
  };
  name: string;
}

export default function Site() {
  const { domainName } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectData, setProjectData] = useState<ProjectData | null>(null);

  useEffect(() => {
    const fetchSite = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('authToken');
        if (!token) throw new Error("Authentication token not found");

        const response = await axios.get(`http://localhost:8080/project/domain/${domainName}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setProjectData(response.data);

        // Apply styles and content
        if (response.data.page?.gjs) {
          const { components, styles } = response.data.page.gjs;

          // Create and append style element with additional preview mode styles
          const styleElement = document.createElement('style');
          styleElement.textContent = `
            /* Hide editor controls in published site */
            .published-site [data-gjs-type="add-menu-btn"],
            .published-site [data-gjs-type="delete-btn"],
            .published-site .add-menu-btn,
            .published-site .delete-btn {
              display: none !important;
            }

            /* Component styles */
            ${styles.map((style: any) => {
              const selectors = Array.isArray(style.selectors) 
                ? style.selectors.join(', ')
                : style.selectors;
              
              const styleProps = Object.entries(style.style)
                .map(([prop, value]) => `${prop}: ${value};`)
                .join('\n');
              
              return `${selectors} {\n${styleProps}\n}`;
            }).join('\n\n')}
          `;
          document.head.appendChild(styleElement);

          // Apply components HTML
          const contentContainer = document.getElementById('site-content');
          if (contentContainer) {
            // Convert components to HTML
            const html = components.map((component: any) => {
              let componentHtml = `<${component.tagName}`;
              
              // Add attributes
              if (component.attributes) {
                Object.entries(component.attributes).forEach(([key, value]) => {
                  componentHtml += ` ${key}="${value}"`;
                });
              }
              
              // Add styles
              if (component.style) {
                const styleStr = Object.entries(component.style)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join('; ');
                componentHtml += ` style="${styleStr}"`;
              }
              
              componentHtml += '>';
              
              // Add content or nested components
              if (component.content) {
                componentHtml += component.content;
              }
              if (component.components) {
                componentHtml += component.components.map((comp: any) => {
                  // Recursive function to handle nested components
                  const renderComponent = (comp: any): string => {
                    let html = `<${comp.tagName}`;
                    if (comp.attributes) {
                      Object.entries(comp.attributes).forEach(([key, value]) => {
                        html += ` ${key}="${value}"`;
                      });
                    }
                    if (comp.style) {
                      const styleStr = Object.entries(comp.style)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join('; ');
                      html += ` style="${styleStr}"`;
                    }
                    html += '>';
                    if (comp.content) {
                      html += comp.content;
                    }
                    if (comp.components) {
                      html += comp.components.map(renderComponent).join('');
                    }
                    html += `</${comp.tagName}>`;
                    return html;
                  };
                  return renderComponent(comp);
                }).join('');
              }
              
              componentHtml += `</${component.tagName}>`;
              return componentHtml;
            }).join('\n');

            contentContainer.innerHTML = html;
          }
        }
      } catch (err) {
        console.error('Error fetching site:', err);
        setError('Site not found or unavailable');
      } finally {
        setLoading(false);
      }
    };

    if (domainName) {
      fetchSite();
    }
  }, [domainName]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return <div id="site-content" className="min-h-screen published-site"></div>;
}