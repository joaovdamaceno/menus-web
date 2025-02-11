import { useState } from "react";
import Navbar from "~/components/Navbar";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto my-10 p-8 border rounded shadow">
        <div className="flex justify-between mb-4">
          <button
            onClick={() => setIsLogin(true)}
            className={`px-4 py-2 ${isLogin ? 'font-bold border-b-2 border-blue-500' : ''}`}
          >
            Entrar
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`px-4 py-2 ${!isLogin ? 'font-bold border-b-2 border-blue-500' : ''}`}
          >
            Cadastrar
          </button>
        </div>
        {isLogin ? (
          <form>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input type="email" className="w-full border rounded p-2" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Senha</label>
              <input type="password" className="w-full border rounded p-2" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
              Entrar
            </button>
          </form>
        ) : (
          <form>
            <div className="mb-4">
              <label className="block mb-1">Nome</label>
              <input type="text" className="w-full border rounded p-2" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input type="email" className="w-full border rounded p-2" />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Senha</label>
              <input type="password" className="w-full border rounded p-2" />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
              Cadastrar
            </button>
          </form>
        )}
        <div className="mt-4 text-right">
          <button className="text-sm text-blue-500 hover:underline">
            Esqueceu a senha?
          </button>
        </div>
        {/* Optionally add social logins (Google, Facebook) here */}
      </div>
    </div>
  );
}
