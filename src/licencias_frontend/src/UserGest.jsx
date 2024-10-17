import React from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const UserGestion = ({ userData }) => {
  return (
    <Container>
      <h2>Gestión de Licencia</h2>
      {userData ? (
        <Card>
          <Card.Header>Información del Usuario</Card.Header>
          <Card.Body>
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>Nombre:</strong> {userData.name}</p>
            <p><strong>Apellido:</strong> {userData.surname}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Rol:</strong> {userData.role}</p>
            {/* Mostrar los datos de la licencia si están disponibles */}
            {userData.licenseData ? (
              <div>
                <h4>Licencia</h4>
                <p><strong>Número de Licencia:</strong> {userData.licenseData.licenseNumber}</p>
                <p><strong>Fecha de Expiración:</strong> {userData.licenseData.expirationDate}</p>
                <p><strong>Tipo:</strong> {userData.licenseData.licenseType}</p>
              </div>
            ) : (
              <p>No se ha generado una licencia para este usuario.</p>
            )}
          </Card.Body>
        </Card>
      ) : (
        <Alert variant='warning'>Cargando datos de la licencia...</Alert>
      )}
    </Container>
  );
};
