import React, { useState } from 'react';
import { Button, Card, Container, Modal, Form, FormGroup, FormLabel, FormControl, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {users} from "./App"


export const LoginForm = ({}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleLogin = () => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      if (user.role === 'admin') {
        window.location.href = '/AdminHome';
      } else if (user.role === 'user') {
        window.location.href = '/UserHome';
      }
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <>


      <Container className="mt-5">
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Card.Text>Inicia sesión para tramitar tu licencia digital en blockchain</Card.Text>
            <Button variant="primary" onClick={handleShowLogin}>Iniciar sesión</Button>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showLogin} onHide={handleCloseLogin} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container style={{ width: '60%' }}>
            <Form>
              <FormGroup>
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
              </FormGroup>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Iniciar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
