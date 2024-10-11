
import { licencias_backend } from 'declarations/licencias_backend';
import { Container, Nav, Navbar, NavDropdown,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {

  return (
    <main>
      <Container>
        <Navbar>
          <Container>
            <Navbar.Brand>CertiBlock</Navbar.Brand>
            <Navbar.Toggle></Navbar.Toggle>
            <Navbar.Collapse>
              <Nav>
                <Nav.Link>login</Nav.Link>
                <NavDropdown>
                <NavDropdown.Item>Admin</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <h1>aki ba el formulario de inicio de sesion</h1>
        <Button>iniciar sesion</Button>
        <Button>registrarse</Button>
      </Container>
    </main>
  );
}

