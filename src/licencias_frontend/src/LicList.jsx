import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Modal, ListGroup, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const LicList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener la lista de usuarios desde el backend
    fetch('http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:4943/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar la lista de usuarios');
        }
        return response.json();
      })
      .then(data => {
        // Filtrar solo los usuarios que tienen una licencia
        const usersWithLicenses = data.filter(user => user.licenseData); // Asegúrate que el campo sea 'licenseData'
        setUsers(usersWithLicenses);
      })
      .catch(err => {
        setError(err.message);
        console.error('Error al obtener la lista de usuarios:', err);
      });
  }, []);

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedUser(null);
  };

  return (
    <Container>
      <h2>Lista de Usuarios con Licencia</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <ListGroup>
        {users.length > 0 ? (
          users.map(user => (
            <ListGroup.Item key={user.id}>
              {user.name} {user.surname}
              <Button variant="link" onClick={() => handleShowDetails(user)}>Ver Detalles</Button>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>No hay usuarios con licencia disponible.</ListGroup.Item>
        )}
      </ListGroup>

      {/* Modal para mostrar detalles del usuario */}
      <Modal show={showDetails} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <div>
              <p><strong>ID:</strong> {selectedUser.id}</p>
              <p><strong>Nombre:</strong> {selectedUser.name}</p>
              <p><strong>Apellido:</strong> {selectedUser.surname}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Rol:</strong> {selectedUser.role}</p>
              {/* Mostrar aquí los documentos asociados */}
              <p><strong>Identificación:</strong> {selectedUser.documentData?.identification}</p>
              <p><strong>Comprobante de Domicilio:</strong> {selectedUser.documentData?.addressProof}</p>
              <p><strong>Constancia de Estudios:</strong> {selectedUser.documentData?.educationCertificate}</p>
              <p><strong>Examen Práctico:</strong> {selectedUser.documentData?.practicalExamCertificate}</p>
              <p><strong>CURP:</strong> {selectedUser.documentData?.curp}</p>

              {/* Mostrar los datos de la licencia */}
              <h5>Datos de la Licencia</h5>
              <p><strong>Número de Licencia:</strong> {selectedUser.licenseData?.licenseNumber}</p>
              <p><strong>Tipo de Licencia:</strong> {selectedUser.licenseData?.licenseType}</p>
              <p><strong>Fecha de Expiración:</strong> {selectedUser.licenseData?.expirationDate}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
