import { useState } from "react";
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";
import { useNavigate } from "@remix-run/react";
import { Link } from "@remix-run/react";
import axios from "axios";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  
  async function login(event) {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/users/login", {
        email: email,
        password: password,
      }).then((res) => {
         console.log(res.data);
         if (res.data.message === "Usuário não encontrado") {
           alert("Email não existe");
         } else if (res.data.message === "Senha inválida") { 
            alert("Senha inválida");
         } else { 
            navigate('/');
         }
      }, fail => {
         console.error(fail);
      });
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
            <a
              className="px-4 py-2 font-bold border-b-2 border-red-500"
            >
              Entrar
            </a>
            <Link
              to="/register"
              className=" hover:text-red-500 px-4 py-2 font-bold border-red-500"
            >
              Cadastrar
            </Link>
          </div>
          <form>
            <div className="mb-4">
              <label className="block mb-1 ">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full border rounded p-2" 
                value={email} 
                onChange={(event) => setemail(event.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Senha</label>
              <input 
                type="password" 
                id="password" 
                className="w-full border rounded p-2" 
                value={password} 
                onChange={(event) => setpassword(event.target.value)}
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-red-500 text-white py-2 rounded" 
              onClick={login}
            >
              Enviar
            </button>
          </form>
          <div className="mt-4 text-right">
            <button className="text-sm text-red-500 hover:underline">
              Esqueceu a senha?
            </button>
          </div>
          {/* Optionally add social logins (Google, Facebook) here */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
