import { useEffect } from "react";
import { useNavigate } from "@remix-run/react";

export default function Publish() {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate a publishing process (replace with real logic later)
    const timeout = setTimeout(() => {
      navigate("/published");
    }, 3000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Publicando...</h1>
        <p>Por favor, aguarde enquanto seu site é publicado.</p>
      </div>
    </div>
  );
}
