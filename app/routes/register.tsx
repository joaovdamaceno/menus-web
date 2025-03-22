import { useState } from "react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import axios from "axios";
import { Link } from "@remix-run/react";
import { useNavigate } from "@remix-run/react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");

  async function save(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não conferem!");
      return;
    }

    try {
      await axios.post("http://localhost:8080/users", {
        name: name,
        email: email,
        password: password,
      });
      alert("Registro efetuado com sucesso!");
      navigate('/login');
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div>
      <Navbar />
      {/* Container que centraliza o conteúdo */}
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-md w-full p-8 border rounded shadow">
          <div className="flex justify-between mb-8">
            <Link
              to="/login"
              className="hover:text-red-500 px-4 py-2 font-bold border-red-500"
            >
              Entrar
            </Link>
            <a className="px-4 py-2 font-bold border-b-2 border-red-500">
              Cadastrar
            </a>
          </div>
          <form onSubmit={save}>
            <div className="mb-4">
              <label className="block mb-1">Nome</label>
              <input
                type="text"
                id="name"
                className="w-full border rounded p-2"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Email</label>
              <input
                type="email"
                id="email"
                className="w-full border rounded p-2"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Senha</label>
              <input
                type="password"
                id="password"
                className="w-full border rounded p-2"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Confirme sua Senha</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full border rounded p-2"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-500 text-white py-2 rounded"
            >
              Criar Conta
            </button>
          </form>
          {/* Optionally add social logins (Google, Facebook) here */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
