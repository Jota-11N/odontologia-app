import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import PacientesList from "../components/Pacientes/PacientesList";
import PacienteForm from "../components/Pacientes/PacienteForm";

export default function PacientesPage() {
  return (
    <div className="flex h-screen bg-graybg">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6 overflow-y-auto">
          <h2 className="text-2xl font-semibold text-secondary mb-4">Gestión de Pacientes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PacienteForm />
            <PacientesList />
          </div>
        </main>
      </div>
    </div>
  );
}
