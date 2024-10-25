import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function App() {
  const [membresiasList, setMembresias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMembresias();
  }, []);

  const getMembresias = () => {
    Axios.get("http://localhost:5000/api/usuario_membresias")
      .then((response) => {
        setMembresias(response.data);
        setLoading(false);
        notifyExpiringMemberships(response.data);
      })
      .catch(error => {
        Swal.fire({
          title: "Error",
          text: "Error al obtener las membresías",
          icon: "error"
        });
        console.error(error);
      });
  }

  const notifyExpiringMemberships = (memberships) => {
    memberships.forEach(membership => {
      Axios.get(`http://localhost:5000/api/membership/notify/${membership.id_usuario}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch(error => {
          Swal.fire({
            title: "Error",
            text: `Error al enviar la notificación para el usuario ${membership.id_usuario}`,
            icon: "error"
          });
          console.error(error);
        });
    });
  }

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">
          GESTIÓN DE MEMBRESÍAS
        </div>
      </div>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario ID</th>
            <th>Membresía ID</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Nombre del Plan</th>
            <th>Confirmación de Compra</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="7">Cargando...</td>
            </tr>
          ) : (
            membresiasList.map((membresia) => (
              <tr key={membresia.id_usuario_membresia}>
                <td>{membresia.id_usuario_membresia}</td>
                <td>{membresia.id_usuario}</td>
                <td>{membresia.id_membresia}</td>
                <td>{new Date(membresia.fecha_inicio).toLocaleString()}</td>
                <td>{new Date(membresia.fecha_fin).toLocaleString()}</td>
                <td>{membresia.nombre_plan}</td>
                <td>{membresia.confirmacion_compra ? "Sí" : "No"}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
