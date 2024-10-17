import React, { useState } from 'react';
import { Button, Card, Container, Modal, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';

export const LoginForm = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleLogin = async () => {
    try {
        const response = await fetch('http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:4943/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            
            // Almacenar el ID y nombre del usuario en localStorage
            localStorage.setItem('user', JSON.stringify({ id: data.id, name: data.name, role: data.role }));

            // Redirigir según el rol del usuario
            if (data.role === 'admin') {
                window.location.href = '/AdminHome'; // Redirigir a AdminHome para administradores
            } else if (data.role === 'user') {
                window.location.href = '/UserHome';  // Redirigir a UserHome para usuarios normales
            }
        } else {
            alert('Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error en el servidor. Intenta nuevamente más tarde.');
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
