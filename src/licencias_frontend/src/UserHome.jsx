
import { Container, Nav, Navbar, NavDropdown,Button, Card,Tab,Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Log from '../src/Log.png';
import { FormTram } from './UserOptions';


export default function UserHome() {

  return (
    <><Container className='mt-3'>
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
    </Container><Container className='mt-3'>
        <Card>
          <Card.Body>
            <Tabs
              defaultActiveKey="consultar"
              id="fill-tab-example"
              className="mb-3"
              fill
            >
              <Tab eventKey="consultar" title="consultar">
                Aqui aparecera la licencia digital del usuario asi como las multas vinculadas a esta o si requiere renovacion
              </Tab>
              <Tab eventKey="tramitar" title="tramitar">
                <Container>
                  <FormTram/>
                </Container>
              </Tab>
            </Tabs>
          </Card.Body>
        </Card>
      </Container></>
  );
}
