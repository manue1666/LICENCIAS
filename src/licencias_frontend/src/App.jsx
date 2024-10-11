
import { licencias_backend } from 'declarations/licencias_backend';
import { Container, Nav, Navbar, NavDropdown, Button, Card, Form, FormControl, FormLabel, FormGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Log from '../src/Log.png';
export default function App() {

  return (
    <main>
      <Container>
        <Navbar>
          <Container>
            <img width="100" height="50" src={Log} alt="Log" />
            <Navbar.Brand>CertiBlock</Navbar.Brand>
            <Navbar.Toggle></Navbar.Toggle>
            <Navbar.Collapse>
              <Nav>
                <Nav.Link >login</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <h1>Inicio de Sesion</h1>
      </Container>

      <Container style={{width:'60%'}}>
        <Card>
          <Card.Body>
            <Form>
              <FormGroup>
                <FormLabel>Ingrese su correo electronico</FormLabel>
                <FormControl placeholder='Ingresar correo'></FormControl>
                <FormLabel>Ingrese su contraseña</FormLabel>
                <FormControl placeholder='Ingresar contraseña'></FormControl>
              </FormGroup>
            </Form>
            <center>
              <Button className='d-flex justify-content-between, mt-3'>Iniciar sesion</Button>
              <Button className='mt-1'>Registrarse</Button>
            </center>
          </Card.Body>
        </Card>
      </Container>
    </main>
  );
}

