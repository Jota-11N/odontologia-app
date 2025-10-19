export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-graybg text-dark">
      {/* Header */}
      <header className="bg-dark text-light py-4 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Odontología UNJMA</h1>
          <nav className="space-x-6">
            <a href="/pacientes" className="hover:text-primary">Pacientes</a>
            <a href="/odontologos" className="hover:text-primary">Odontólogos</a>
            <a href="/citas" className="hover:text-primary">Citas</a>
            <a href="/historial" className="hover:text-primary">Historial</a>
          </nav>
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-grow container mx-auto px-6 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-dark text-center text-light py-3 text-sm">
        © {new Date().getFullYear()} Universidad Nacional José María Arguedas · Facultad de Ciencias de la Salud
      </footer>
    </div>
  );
}
