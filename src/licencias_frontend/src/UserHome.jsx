
import { Container, Nav, Navbar, NavDropdown,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function UserHome() {

  return (
    <Container>
      <Navbar>
        <Container>
          <Navbar.Brand>CertiBlock</Navbar.Brand>
          <Navbar.Toggle></Navbar.Toggle>
          <Navbar.Collapse>
            <Nav>
              <Nav.Link>login</Nav.Link>
              <NavDropdown>
              <NavDropdown.Item>Consultas</NavDropdown.Item>
              <NavDropdown.Item>Solicitar y Realizar</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}
