import { FiShoppingCart, FiCreditCard, FiMenu } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Navbar from "~/components/Navbar";
import Footer from "~/components/Footer";

export default function Recursos() {
  const features = [
    {
      title: 'Criação de Menu',
      description: 'Crie menus interativos e personalizados para seu restaurante.',
      icon: FiMenu,
    },
    {
      title: 'Carrinho',
      description: 'Sistema de carrinho intuitivo para seus clientes fazerem pedidos.',
      icon: FiShoppingCart,
    },
    {
      title: 'Pagamento',
      description: 'Integração segura com diversos métodos de pagamento.',
      icon: FiCreditCard,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary text-red-500">Recursos</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Tudo que você precisa para seu restaurante online
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Nossa plataforma oferece todas as ferramentas necessárias para criar uma presença online profissional para seu restaurante.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                {features.map((feature) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col"
                  >
                    <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                      <feature.icon className="h-5 w-5 flex-none text-primary text-red-500" aria-hidden="true" />
                      {feature.title}
                    </dt>
                    <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                      <p className="flex-auto">{feature.description}</p>
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
