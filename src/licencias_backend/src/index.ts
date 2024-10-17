import { Server } from 'azle';
import express from 'express';
import cors from 'cors';

// Contador para asignar IDs únicos a los usuarios
let userIdCounter = 1;


// Estructura de usuario
let users: Array<{
    id: number;
    name: string;
    surname: string;
    licenseNumber: string;
    email: string;
    password: string;
    role: string;
}> = [];

const adminUser = {
    id: userIdCounter++,
    name: 'Admin',
    surname: 'User',
    licenseNumber: '1234-5678',
    email: 'admin@example.com',
    password: '12345', // Cambia esto por una contraseña segura
    role: 'admin',
};

users.push(adminUser);

// Crear el servidor
export default Server(() => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    // Ruta para registrar usuarios
    app.post('/register', (req, res) => {
        const { name, surname, licenseNumber, email, password } = req.body;

        const newUser = {
            id: userIdCounter++,
            name,
            surname,
            licenseNumber,
            email,
            password,
            role: 'user', // Asignar un rol por defecto
        };

        users.push(newUser);
        console.log('Nuevo usuario registrado:', newUser);
        res.status(201).send('Usuario registrado exitosamente.');
    });

    // Ruta para iniciar sesión
    app.post('/login', (req, res) => {
        const { email, password } = req.body;

        // Buscar el usuario por email y contraseña
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return res.status(401).send('Credenciales incorrectas');
        }

        // Enviar respuesta con los datos del usuario
        res.json({ id: user.id, name: user.name, role: user.role });
    });

    // Ruta para obtener datos del usuario
    app.get('/user/:id', (req, res) => {
        const userId = Number(req.params.id);
        const user = users.find(u => u.id === userId);

        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        res.json(user);
    });

    // Iniciar el servidor
    return app.listen(4943, () => {
        console.log('Servidor iniciado en el puerto 4943');
    });
});
