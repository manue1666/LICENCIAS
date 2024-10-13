import { Container, Nav, Navbar, NavDropdown, Button, Card, Tabs, Tab } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Log from '../src/Log.png';

export default function AdminHome() {
    return (
        <>
            <Container className='mt-3'>
                <Card>
                    <Card.Body>
                        <Navbar>
                            <Container>
                                <img width="100" height="50" src={Log} alt="Log" />
                                <Navbar.Brand>CertiBlock</Navbar.Brand>
                                <Navbar.Toggle />
                                <Navbar.Collapse>
                                    <Nav>
                                        <Nav.Link />
                                        <NavDropdown title="Menu">
                                            <NavDropdown.Item>Solicitudes</NavDropdown.Item>
                                            <NavDropdown.Item>Gestion</NavDropdown.Item>
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
                        <Tabs
                            defaultActiveKey="solicitudes"
                            id="fill-tab-example"
                            className="mb-3"
                            fill
                        >
                            <Tab eventKey="solicitudes" title="Solicitudes">
                                Aqui apareceran las solicitudes de licencias digitales que manden los usuarios
                            </Tab>
                            <Tab eventKey="gestion" title="Gestion">
                                Aqui se consultaran las licencias digitales creadas y se podran suspender o cancelar
                            </Tab>
                            <Tab eventKey="multas" title="Multas">
                                Aqui se crearan multas que se vincularan al id de licencia de cada usuario
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

