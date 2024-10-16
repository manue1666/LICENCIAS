import React, { useState } from 'react';
import { Button, Card, Container, Modal, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { users } from './App';



export const RegistForm = ({}) => {
  const [showRegister, setShowRegister] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  const handleRegister = () => {
    const newUser = {
      id: users.length + 1,
      name,
      surname,
      licenseNumber,
      email,
      password,
      role: 'user'
    };
    users.push(newUser);
    console.log('Usuario registrado:', newUser); // Esto imprimirá el nuevo usuario en la consola
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    setShowRegister(false);
  };

  return (
    <>
      <Container className="mt-5">
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Registrarse</Card.Title>
            <Card.Text>Crea una cuenta y tramita tu licencia digital en blockchain</Card.Text>
            <Button variant="primary" onClick={handleShowRegister}>Registrarse</Button>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showRegister} onHide={handleCloseRegister} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container style={{ width: '60%' }}>
            <Form>
              <FormGroup>
                <FormLabel>Nombre</FormLabel>
                <FormControl
                  placeholder='Ingresar nombre'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FormLabel>Apellido</FormLabel>
                <FormControl
                  placeholder='Ingresar apellidos'
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl
                  placeholder='Ingresar correo'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FormLabel>Contraseña</FormLabel>
                <FormControl
                  placeholder='Ingresar contraseña'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FormLabel>Numero de licencia</FormLabel>
                <FormControl
                  placeholder='Ingresar numero de licencia'
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                />
              </FormGroup>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegister}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleRegister}>
            Registrarse
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
