import { useState } from 'react';
import { licencias_backend } from 'declarations/licencias_backend';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const name = event.target.elements.name.value;
    licencias_backend.greet(name).then((greeting) => {
      setGreeting(greeting);
    });
    return false;
  }

  return (
    <main>
      <Container>
        <Navbar>
          <Container>
            <Navbar.Brand>CertiBlock</Navbar.Brand>
            <Navbar.Toggle></Navbar.Toggle>
            <Navbar.Collapse>
              <Nav>
                <Nav.Link>Home</Nav.Link>
                <Nav.Link>Tramite</Nav.Link>
                <NavDropdown>
                <NavDropdown.Item>Consultas</NavDropdown.Item>
                <NavDropdown.Item>Solicitar y Realizar</NavDropdown.Item>

                
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </main>
  );
}

export default App;
