import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-primary text-white min-h-screen p-5 flex flex-col">
      <h2 className="text-lg font-semibold mb-6">Menú</h2>
      <nav className="flex flex-col gap-3">
        <Link to="/pacientes" className="hover:bg-secondary px-3 py-2 rounded-md">
          Pacientes
        </Link>
        <Link to="/odontologos" className="hover:bg-secondary px-3 py-2 rounded-md">
          Odontólogos
        </Link>
        <Link to="/citas" className="hover:bg-secondary px-3 py-2 rounded-md">
          Citas
        </Link>
      </nav>
    </aside>
  );
}
