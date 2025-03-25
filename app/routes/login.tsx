import { useState } from "react";
import { useNavigate, Link } from "@remix-run/react";
import { useAuth } from "~/contexts/AuthContext";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    try {
      await login(email, password);
      navigate('/');
    } catch (err: any) {
      setError('E-mail ou senha invÃ¡lido');
    }
  }

  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
          <div className="flex justify-between mb-8">
            <span className="px-4 py-2 font-bold border-b-2 border-red-500">
              Entrar
            </span>
            <Link
              to="/register"
              className="hover:text-red-500 px-4 py-2 font-bold"
            >
              Cadastrar
            </Link>
          </div>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-1 text-gray-700">Senha</label>
              <input
                type="password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-colors"
            >
              Entrar
            </button>
          </form>
          <div className="mt-4 text-right">
            <Link to="/forgot-password" className="text-sm text-red-500 hover:underline">
              Esqueceu a senha?
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}