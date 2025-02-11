import { useEffect } from "react";

type LanguageModalProps = {
  onClose: () => void;
};

const languages = [
  { code: 'en', label: 'English' },
  { code: 'pt', label: 'Português' },
  { code: 'es', label: 'Español' },
  // Add more languages as needed
];

export default function LanguageModal({ onClose }: LanguageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="mb-4 text-xl font-bold">Selecione o idioma</h2>
        <ul>
          {languages.map(lang => (
            <li key={lang.code} className="mb-2">
              <button
                onClick={() => {
                  onClose();
                  // Implement your language switch logic here
                }}
                className="text-blue-600 hover:underline"
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 text-sm text-gray-500">Fechar</button>
      </div>
    </div>
  );
}
