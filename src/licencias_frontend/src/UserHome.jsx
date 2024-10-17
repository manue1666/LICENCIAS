import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Card, Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Log from '../src/Log.png';
import { FormTram } from './UserOptions';
import { UserGestion } from './UserGest';

export default function UserHome() {
  const [userData, setUserData] = useState(null); // Estado para almacenar datos del usuario

  // Obtener la información del usuario de localStorage al cargar la página
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { id } = JSON.parse(storedUser);
      
      // Hacer una solicitud al backend para obtener los datos completos del usuario
      fetch(`http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:4943/user/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Usuario no encontrado');
          }
          return response.json();
        })
        .then(data => setUserData(data))
        .catch(error => {
          console.error('Error al cargar datos del usuario:', error);
          // Redirigir al login si el usuario no se encuentra
          alert('No se pudieron cargar los datos del usuario. Redirigiendo a inicio de sesión.');
          window.location.href = '/'; // Cambia la ruta a tu ruta de inicio de sesión
        });
    } else {
      // Si no hay usuario en localStorage, redirigir al login
      window.location.href = '/';
    }
  }, []);

  if (!userData) {
    return <p>Cargando datos del usuario...</p>;
  }

  return (
    <>
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
                    <Nav.Link></Nav.Link>
                    <NavDropdown title="Menu">
                      <NavDropdown.Item>Consultar</NavDropdown.Item>
                      <NavDropdown.Item>Solicitar</NavDropdown.Item>
                      <NavDropdown.Item href='/'>Log out</NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Card.Body>
        </Card>
      </Container>

      <Container className='mt-3'>
        <Card>
          <Card.Body>
            {/* Mostrar saludo personalizado */}
            <h4>Bienvenido, {userData.name}!</h4>

            <Tabs
              defaultActiveKey="consultar"
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="consultar" title="Consultar">
                Aquí aparecerá la licencia digital del usuario, así como las multas vinculadas a esta o si requiere renovación.
                <UserGestion userData={userData} /> {/* Pasar userData como props */}
              </Tab>
              <Tab eventKey="tramitar" title="Tramitar">
                <Container>
                  <FormTram />
                </Container>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
