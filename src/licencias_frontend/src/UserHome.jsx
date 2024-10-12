
import { Container, Nav, Navbar, NavDropdown,Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Log from '../src/Log.png';


export default function UserHome() {

  return (
    <Container>
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
              <NavDropdown>
              <NavDropdown.Item>Consultar</NavDropdown.Item>
              <NavDropdown.Item>Solicitar</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        </Card.Body>
      </Card>
    </Container>
  );
}
