import { FiCheck } from "react-icons/fi";
import Navbar from "~/components/Navbar";

export default function Precos() {
  const planos = [
    {
      nome: "Gratuito",
      preco: "0",
      descricao: "Recursos básicos gratuitos",
      features: ["Menu digital básico", "Até 30 itens no cardápio", "Tema padrão"],
    },
    {
      nome: "Plano Pro",
      preco: "49",
      descricao: "Recursos avançados e suporte premium",
      features: [
        "Tudo do plano Gratuito",
        "Menu digital ilimitado",
        "Sistema de pedidos online",
        "Integração com pagamentos",
      ],
    },
    {
      nome: "Plano Business",
      preco: "99",
      descricao: "Recursos completos para seu restaurante",
      features: [
        "Tudo do plano Pro",
        "Múltiplas localizações",
        "API personalizada",
        "Gerenciador de franquias",
        "Suporte 24/7",
      ],
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="py-24 sm:py-32 px-6 max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-base text-red-500 font-semibold text-primary">Planos e Preços</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Escolha o plano ideal para seu negócio
          </p>
        </div>
        <div className="mt-12 grid max-w-md mx-auto grid-cols-1 gap-y-8 gap-x-8 sm:mt-12 lg:max-w-none lg:grid-cols-3">
          {planos.map((plano, index) => (
            <div
              key={plano.nome}
              className="flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 lg:z-10 lg:rounded-n"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{plano.nome}</h3>
                <p className="mt-4 text-sm text-gray-600">{plano.descricao}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">R${plano.preco}</span>
                  <span className="text-sm font-semibold text-gray-600">/mês</span>
                </p>
                <ul className="mt-8 space-y-3 text-sm text-gray-600">
                  {plano.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <FiCheck className="h-5 w-5 text-primary text-red-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button className="mt-8 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full transition-all" variant={index === 1 ? "default" : "outline"}>
                Selecionar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
