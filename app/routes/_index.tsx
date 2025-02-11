import Navbar from "~/components/Navbar";

export default function Index() {
  return (
    <div>
      <Navbar />
      <header className="bg-cover bg-center h-96" style={{ backgroundImage: "url('/images/hero.jpg')" }}>
        <div className="flex h-full items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-4xl text-white font-bold">
            Bem-vindo ao Website Builder para Restaurantes
          </h1>
        </div>
      </header>
      <main className="p-8">
        <section className="my-8">
          <h2 className="text-2xl font-bold mb-4">Recursos</h2>
          <p>
            Crie menus, carrinhos, pagamentos e muito mais com facilidade.
          </p>
        </section>
      </main>
    </div>
  );
}
