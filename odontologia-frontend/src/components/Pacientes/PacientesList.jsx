const pacientesDemo = [
  { id: 1, nombre: "Juan Pérez", dni: "12345678", telefono: "987654321" },
  { id: 2, nombre: "María Torres", dni: "87654321", telefono: "912345678" },
];

export default function PacientesList() {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-secondary mb-4">
        Lista de Pacientes
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-graybg text-left text-gray-600">
            <th className="p-2">Nombre</th>
            <th className="p-2">DNI</th>
            <th className="p-2">Teléfono</th>
            <th className="p-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientesDemo.map((p) => (
            <tr key={p.id} className="border-t hover:bg-gray-50">
              <td className="p-2">{p.nombre}</td>
              <td className="p-2">{p.dni}</td>
              <td className="p-2">{p.telefono}</td>
              <td className="p-2 text-center space-x-2">
                <button className="bg-secondary text-white px-2 py-1 rounded-md text-xs">
                  Editar
                </button>
                <button className="bg-red-500 text-white px-2 py-1 rounded-md text-xs">
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
