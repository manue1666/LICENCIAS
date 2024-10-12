import { Container, Nav, Navbar, Button, Card, Form, FormControl, FormLabel, FormGroup, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Log from '../src/Log.png';
import { useState } from 'react';

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  return (
    <main>
      <Container className='mt-3'>
        <Card>
          <Card.Body>
          <Navbar>
          <Container>
            <img width="100" height="50" src={Log} alt="Log" />
            <Navbar.Brand>CertiBlock</Navbar.Brand>
            <Navbar.Toggle></Navbar.Toggle>
            <Navbar.Collapse>
              <Nav>
                <Nav.Link ></Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
          </Card.Body>
        </Card>
      </Container>


      <Container className="mt-5">
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Login</Card.Title>
            <Card.Text>Inicia sesión para tramitar tu licencia digital en blockchain</Card.Text>
            <Button variant="primary" onClick={handleShowLogin}>Iniciar sesión</Button>
          </Card.Body>
        </Card>
      </Container>

      <Container className="mt-5">
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>Registrarse</Card.Title>
            <Card.Text>Crea una cuenta y tramita tu licencia digital en blockchain woaooos</Card.Text>
            <Button variant="primary" onClick={handleShowRegister}>Registrarse</Button>
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
                <FormControl placeholder='Ingresar correo'></FormControl>
                <FormLabel>Contraseña</FormLabel>
                <FormControl placeholder='Ingresar contraseña' type='password'></FormControl>
              </FormGroup>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogin}>
            Cerrar
          </Button>
          <Button variant="primary" href='/UserHome'>Iniciar sesión</Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showRegister} onHide={handleCloseRegister} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Registrarse</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container style={{ width: '60%' }}>
            <Form>
              <FormGroup>
                <FormLabel>Nombre</FormLabel>
                <FormControl placeholder='Ingresar nombre'></FormControl>
                <FormLabel>Apellido</FormLabel>
                <FormControl placeholder='Ingresar apellidos'></FormControl>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl placeholder='Ingresar correo'></FormControl>
                <FormLabel>Contraseña</FormLabel>
                <FormControl placeholder='Ingresar contraseña' type='password'></FormControl>
              </FormGroup>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegister}>
            Cerrar
          </Button>
          <Button variant="primary" href='/UserHome'>Registrarse</Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

