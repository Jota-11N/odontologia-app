import React, { useEffect, useState } from 'react';
import api from '../services/api';

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    api.get('/usuarios')
      .then(res => setUsuarios(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2>Lista de Usuarios</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Correo</th>
            <th>DNI</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id_usu}>
              <td>{u.id_usu}</td>
              <td>{u.nom_usu}</td>
              <td>{u.cor_usu}</td>
              <td>{u.dni_usu}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsuariosPage;
