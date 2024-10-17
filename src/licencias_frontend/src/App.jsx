import { Container, Nav, Navbar, Button, Card, Form, FormControl, FormLabel, FormGroup, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Log from '/home/ramirez/LICENCIAS/src/licencias_frontend/src/Log.png';
import { LoginForm } from './Login';
import { RegistForm } from './Regist';



export const users = [
  { id: 1, name: 'Admin', surname: 'User', licenseNumber: '0000', email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: 2, name: 'Regular', surname: 'User', licenseNumber: '1111', email: 'user@example.com', password: 'user123', role: 'user' }
];

window.users = users;  // Exponer el arreglo users en el objeto window

export default function App() {


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
                    <Nav.Link></Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Card.Body>
        </Card>
      </Container>
      <Container>
        <LoginForm/>
      </Container>
      <Container>
        <RegistForm/>
      </Container>
      
    </main>
  );
}