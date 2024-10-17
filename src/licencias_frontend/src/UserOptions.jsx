import React, { useState } from 'react';
import { Button, Card, Container, Modal, Form, FormGroup, FormLabel, FormControl, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export const FormTram = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    identification: '',
    addressProof: '',
    educationCertificate: '',
    practicalExamCertificate: '',
    curp: ''
  });

  const [errors, setErrors] = useState({});

  // Validación para cada campo
  const validateIdentification = (idNumber) => /^[A-Z0-9]{8,12}$/.test(idNumber);
  const validateAddressProof = (postalCode) => /^\d{5}$/.test(postalCode); // Solo valida que el código postal sea de 5 dígitos
  const validateEducationCertificate = (certificateNumber) => /^[A-Z0-9]{6,10}$/.test(certificateNumber);
  const validatePracticalExamCertificate = (examNumber) => /^[A-Z0-9]{6,10}$/.test(examNumber);
  const validateCURP = (curp) => /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/.test(curp);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!validateIdentification(formData.identification)) {
      validationErrors.identification = "Identificación no válida (debe ser alfanumérica entre 8 y 12 caracteres)";
    }
    if (!validateAddressProof(formData.addressProof)) {
      validationErrors.addressProof = "Código postal no válido (debe ser de 5 dígitos)";
    }
    if (!validateEducationCertificate(formData.educationCertificate)) {
      validationErrors.educationCertificate = "Folio del curso de educación vial no válido";
    }
    if (!validatePracticalExamCertificate(formData.practicalExamCertificate)) {
      validationErrors.practicalExamCertificate = "Folio del examen práctico no válido";
    }
    if (!validateCURP(formData.curp)) {
      validationErrors.curp = "CURP no válida";
    }

    setErrors(validationErrors);

    // Si no hay errores, enviar los datos al backend
    if (Object.keys(validationErrors).length === 0) {
      console.log('Formulario válido, enviar datos:', formData);

      // Obtener el ID del usuario desde el localStorage
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        alert('No se ha iniciado sesión');
        return;
      }

      const { id } = JSON.parse(storedUser);

      // Enviar los datos de los documentos al backend
      fetch(`http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:4943/user/${id}/documents`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identification: formData.identification,
          addressProof: formData.addressProof,
          educationCertificate: formData.educationCertificate,
          practicalExamCertificate: formData.practicalExamCertificate,
          curp: formData.curp
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error al enviar los documentos');
          }
          alert('Documentos enviados correctamente');
          handleCloseForm();
        })
        .catch(error => {
          console.error('Error al enviar los documentos:', error);
          alert('Hubo un problema al enviar los documentos');
        });
    }
  };

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

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
              </FormGroup>

              <FormGroup>
                <FormLabel>Identificación Oficial</FormLabel>
                <FormControl
                  placeholder='Número de identificación'
                  name='identification'
                  value={formData.identification}
                  onChange={handleChange}
                  isInvalid={!!errors.identification}
                />
                {errors.identification && <Alert variant='danger'>{errors.identification}</Alert>}
              </FormGroup>

              <FormGroup>
                <FormLabel>Comprobante de Domicilio (Código Postal)</FormLabel>
                <FormControl
                  placeholder='Código postal'
                  name='addressProof'
                  value={formData.addressProof}
                  onChange={handleChange}
                  isInvalid={!!errors.addressProof}
                />
                {errors.addressProof && <Alert variant='danger'>{errors.addressProof}</Alert>}
              </FormGroup>

              <FormGroup>
                <FormLabel>Constancia de Estudios del Curso de Educación Vial</FormLabel>
                <FormControl
                  placeholder='Folio del curso'
                  name='educationCertificate'
                  value={formData.educationCertificate}
                  onChange={handleChange}
                  isInvalid={!!errors.educationCertificate}
                />
                {errors.educationCertificate && <Alert variant='danger'>{errors.educationCertificate}</Alert>}
              </FormGroup>

              <FormGroup>
                <FormLabel>Constancia del Examen Práctico</FormLabel>
                <FormControl
                  placeholder='Folio del examen'
                  name='practicalExamCertificate'
                  value={formData.practicalExamCertificate}
                  onChange={handleChange}
                  isInvalid={!!errors.practicalExamCertificate}
                />
                {errors.practicalExamCertificate && <Alert variant='danger'>{errors.practicalExamCertificate}</Alert>}
              </FormGroup>

              <FormGroup>
                <FormLabel>CURP</FormLabel>
                <FormControl
                  placeholder='CURP'
                  name='curp'
                  value={formData.curp}
                  onChange={handleChange}
                  isInvalid={!!errors.curp}
                />
                {errors.curp && <Alert variant='danger'>{errors.curp}</Alert>}
              </FormGroup>

              <Button className='mb-3, mt-3' variant="primary" type='submit'>
                Enviar
              </Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button className='mb-3, mt-3' variant="secondary" onClick={handleCloseForm}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
