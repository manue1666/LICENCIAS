import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Modal, ListGroup, Alert, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ReqList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [error, setError] = useState(null);
  const [licenseType, setLicenseType] = useState('A'); // Estado para el tipo de licencia

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
        // Filtrar solo los usuarios que tienen datos de documentos completos
        const usersWithDocuments = data.filter(user => user.documentData);
        setUsers(usersWithDocuments);
      })
      .catch(err => {
        setError(err.message);
        console.error('Error al obtener la lista de usuarios:', err);
      });
  }, []);

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowDetails(true);
    setLicenseType('A'); // Reiniciar el tipo de licencia al abrir el modal
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedUser(null);
    setLicenseType('A'); // Reiniciar el tipo de licencia al cerrar el modal
  };

  const handleGenerateLicense = () => {
    if (!selectedUser) return;

    fetch(`http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:4943/user/${selectedUser.id}/generate-license`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ licenseType }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al generar la licencia');
        }
        return response.text();
      })
      .then(() => {
        alert('Licencia generada exitosamente');
        handleCloseDetails(); // Cerrar el modal después de generar la licencia
      })
      .catch(err => {
        setError(err.message);
        console.error('Error al generar la licencia:', err);
      });
  };

  return (
    <Container>
      <h2>Lista de Solicitudes de Licencia</h2>
      {error && <Alert variant='danger'>{error}</Alert>}
      <ListGroup>
        {users.map(user => (
          <ListGroup.Item key={user.id}>
            {user.name} {user.surname}
            <Button variant="link" onClick={() => handleShowDetails(user)}>Ver Detalles</Button>
          </ListGroup.Item>
        ))}
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

              {/* Selector para tipo de licencia */}
              <Form.Group controlId="formLicenseType">
                <Form.Label>Tipo de Licencia:</Form.Label>
                <Form.Control as="select" value={licenseType} onChange={e => setLicenseType(e.target.value)}>
                  <option value="A">Tipo A</option>
                  <option value="B">Tipo B</option>
                  <option value="C">Tipo C</option>
                  <option value="D">Tipo D</option>
                  <option value="E">Tipo E</option>
                  <option value="F">Tipo F</option>
                </Form.Control>
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleGenerateLicense}>
            Generar Licencia
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
