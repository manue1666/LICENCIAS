import React from 'react';
import { Container, Nav, Navbar, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Log from '../src/Log.png';
import { LoginForm } from './Login';
import { RegistForm } from './Regist';
import { LoginII } from './LoginII';

// Lista de usuarios
export const users = [
  { id: 1, name: 'Admin', surname: 'User', licenseNumber: '0000', email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Regular', surname: 'User', licenseNumber: '1111', email: 'user@example.com', password: 'user123', role: 'user' }
];

window.users = users;  // Exponer el arreglo users en el objeto window para acceso global

// Componente principal de la aplicación
export default function App() {
  return (
    <main>
      {/* Barra de navegación */}
      <Container className='mt-3'>
      
        <Card>
          <Card.Body>
            <Navbar>
              <Container>
                {/* Logotipo */}
                <img width="100" height="50" src={Log} alt="Log" />
                <Navbar.Brand>CertiBlock</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                  <Nav>
                    {/* Enlaces adicionales si es necesario */}
                    <Nav.Link></Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Card.Body>
        </Card>
        
      </Container>

      {/* Formulario de inicio de sesión */}
      <Container>
        <LoginForm />
      </Container>

      {/* Formulario de registro */}
      <Container>
        <RegistForm />
      </Container>

      {/* Iniciar sesión con Internet Identity */}
      <Container>
        <LoginII />
      </Container>
    </main>
  );
}
