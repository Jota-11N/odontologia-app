export default function OdontologoList({ odontologos }) {
  if (!odontologos || odontologos.length === 0)
    return <p className="text-center">No hay odontólogos registrados</p>;

  return (
    <table className="min-w-full border border-gray-300 rounded-lg">
      <thead className="bg-secondary text-white">
        <tr>
          <th className="p-2">ID</th>
          <th className="p-2">Nombre</th>
          <th className="p-2">Apellido</th>
          <th className="p-2">Especialidad</th>
          <th className="p-2">Teléfono</th>
          <th className="p-2">Turno</th>
        </tr>
      </thead>
      <tbody>
        {odontologos.map((odo) => (
          <tr key={odo.id_odo} className="text-center border-t border-gray-300">
            <td className="p-2">{odo.id_odo}</td>
            <td className="p-2">{odo.usuario.nom_usu}</td>
            <td className="p-2">{odo.usuario.ape_usu}</td>
            <td className="p-2">{odo.esp_odo}</td>
            <td className="p-2">{odo.usuario.tel_usu}</td>
            <td className="p-2">{odo.tur_ate_odo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
