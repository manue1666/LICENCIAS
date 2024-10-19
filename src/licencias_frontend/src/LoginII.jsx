import React, { useState } from 'react';
import { Button, Card, Container, Modal, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthClient } from '@dfinity/auth-client';

export const LoginII = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    // Función para manejar el clic del botón y la autenticación con II
    const handleLoginII = async () => {
        try {
            // Crear el AuthClient
            const authClient = await AuthClient.create();

            // Iniciar sesión con Internet Identity
            await authClient.login({
                identityProvider: 'https://identity.ic0.app',
                onSuccess: async () => {
                    const identity = authClient.getIdentity();
                    const principal = identity.getPrincipal().toText(); // Obtener el principal del usuario

                    // Enviar el principal al backend
                    const response = await fetch('http://bd3sg-teaaa-aaaaa-qaaba-cai.localhost:4943/ii-login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ principal })
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setIsSuccess(true);
                        setModalMessage(`Bienvenido usuario de II con principal: ${data.principal}`);
                    } else {
                        setIsSuccess(false);
                        setModalMessage('Error en la autenticación con Internet Identity');
                    }
                },
                onError: (err) => {
                    setIsSuccess(false);
                    setModalMessage('Error en la autenticación con Internet Identity');
                }
            });
        } catch (error) {
            setIsSuccess(false);
            setModalMessage('Hubo un error en la conexión con el servidor');
        } finally {
            setShowModal(true); // Mostrar el modal en cualquier caso
        }
    };

    const handleCloseModal = () => setShowModal(false);

    return (
        <>
            <Container className="mt-5">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Login con Internet Identity</Card.Title>
                        <Card.Text>
                            Inicia sesión de forma más sencilla con Internet Identity de ICP.
                        </Card.Text>
                        <Button variant="primary" onClick={handleLoginII}>
                            Iniciar sesión
                        </Button>
                    </Card.Body>
                </Card>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isSuccess ? 'Éxito' : 'Error'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert variant={isSuccess ? 'success' : 'danger'}>
                        {modalMessage}
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
