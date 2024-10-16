import { Server } from 'azle';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ic, nat, text, Principal } from 'azle';

// Contador para asignar IDs únicos a los usuarios
let userIdCounter = 1;

// Estructura de usuario
let users: Array<{
    id: number; // Cambiamos el tipo a number
    name: string;
    surname: string;
    licenseNumber: string;
    email: string;
    password: string;
    role: string;
}> = [];

export default Server(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.post('/register', (req, res) => {
        const { name, surname, licenseNumber, email, password } = req.body;
        
        // Creamos un nuevo usuario con un ID único que se incrementa
        const newUser = {
            id: userIdCounter++, // Incrementamos el contador para el nuevo ID
            name,
            surname,
            licenseNumber,
            email,
            password,
            role: 'user'
        };
        
        users.push(newUser);
        console.log('Nuevo usuario registrado:', newUser);
        res.status(201).send('Usuario registrado exitosamente.');
    });

    return app.listen(4943, () => {
        console.log('Servidor iniciado en el puerto 4943');
    });
});
