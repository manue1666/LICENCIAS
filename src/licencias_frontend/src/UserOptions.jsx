import React, { useState } from 'react';
import { Button, Card, Container, Modal, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const FormTram = ({}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    identificacion: null,
    comprobanteDomicilio: null,
  });

  const handleCloseForm = () => setShowForm(false);
  const handleShowForm = () => setShowForm(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    // Aquí puedes agregar la lógica para enviar los datos al backend
    handleCloseForm();
  };

  return (
    <>
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Solicita tu licencia digital</Card.Title>
            <Card.Text>
              Llena el formulario y envíalo, y pronto recibirás tu licencia digital en blockchain. ¡Yujuu!
            </Card.Text>
            <Button onClick={handleShowForm}>Solicitar</Button>
          </Card.Body>
        </Card>
      </Container>

      <Modal show={showForm} onHide={handleCloseForm} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Solicitar Licencia Digital</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container style={{ width: '100%' }}>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel>Nombre</FormLabel>
                <FormControl
                  placeholder='Ingresar nombre'
                  name='nombre'
                  value={formData.nombre}
                  onChange={handleChange}
                />
                <FormLabel>Apellido</FormLabel>
                <FormControl
                  placeholder='Ingresar apellidos'
                  name='apellido'
                  value={formData.apellido}
                  onChange={handleChange}
                />
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl
                  placeholder='Ingresar correo'
                  name='email'
                  type='email'
                  value={formData.email}
                  onChange={handleChange}
                />
                <FormLabel>Contraseña</FormLabel>
                <FormControl
                  placeholder='Ingresar contraseña'
                  name='password'
                  type='password'
                  value={formData.password}
                  onChange={handleChange}
                />
                <FormLabel>Identificación Oficial</FormLabel>
                <FormControl
                  type='file'
                  name='identificacion'
                  onChange={handleFileChange}
                />
                <FormLabel>Comprobante de Domicilio</FormLabel>
                <FormControl
                  type='file'
                  name='comprobanteDomicilio'
                  onChange={handleFileChange}
                />
              </FormGroup>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
        <Button className='mb-3, mt-3' variant="primary" type='submit'>
                Enviar
              </Button>
          <Button className='mb.3, mt-3' variant="secondary" onClick={handleCloseForm}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
