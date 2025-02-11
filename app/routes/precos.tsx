import Navbar from "~/components/Navbar";

export default function Precos() {
  return (
    <div>
      <Navbar />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">Planos e Preços</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Free plan */}
          <div className="border p-6 rounded">
            <h2 className="text-xl font-bold mb-4">Gratuito</h2>
            <p className="mb-4">Recursos básicos gratuitos</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded">Selecionar</button>
          </div>
          {/* Paid plans */}
          <div className="border p-6 rounded">
            <h2 className="text-xl font-bold mb-4">Plano Pro</h2>
            <p className="mb-4">Recursos avançados e suporte premium</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded">Selecionar</button>
          </div>
          <div className="border p-6 rounded">
            <h2 className="text-xl font-bold mb-4">Plano Business</h2>
            <p className="mb-4">Recursos completos para seu restaurante</p>
            <button className="w-full bg-blue-500 text-white py-2 rounded">Selecionar</button>
          </div>
        </div>
      </div>
    </div>
  );
}
