import { Server } from 'azle';
import express from 'express';
import cors from 'cors';

// Contador para asignar IDs únicos a los usuarios
let userIdCounter = 1;

// Estructura de usuario con los datos de los documentos y licencia
let users: Array<{
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    role: string;
    documentData?: { 
        identification: string;
        addressProof: string;
        educationCertificate: string;
        practicalExamCertificate: string;
        curp: string;
    };
    licenseData?: {  // Nueva propiedad para almacenar datos de licencia
        licenseNumber: string;
        expirationDate: string;
        licenseType: string;
    };
}> = [];

const adminUser = {
    id: userIdCounter++,
    name: 'Admin',
    surname: 'User',
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
        const { name, surname, email, password } = req.body;

        const newUser = {
            id: userIdCounter++,
            name,
            surname,
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

    // Ruta para actualizar los datos de los documentos del usuario
    app.put('/user/:id/documents', (req, res) => {
        const userId = Number(req.params.id);
        const { identification, addressProof, educationCertificate, practicalExamCertificate, curp } = req.body;

        const user = users.find(u => u.id === userId);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Guardar los datos de los documentos
        user.documentData = {
            identification,
            addressProof,
            educationCertificate,
            practicalExamCertificate,
            curp
        };

        console.log(`Documentos actualizados para el usuario ${userId}:`, user.documentData);
        res.status(200).send('Documentos actualizados exitosamente.');
    });

    // Ruta para generar una licencia para un usuario
    app.post('/user/:id/generate-license', (req, res) => {
        const userId = Number(req.params.id);
        const { licenseType } = req.body;

        const user = users.find(u => u.id === userId);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        const licenseNumber = `LIC-${userIdCounter++}`; // Generar un número de licencia único
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1); // La licencia expira en 1 año

        user.licenseData = {
            licenseNumber,
            expirationDate: expirationDate.toISOString().split('T')[0], // Formato YYYY-MM-DD
            licenseType,
        };

        console.log(`Licencia generada para el usuario ${userId}:`, user.licenseData);
        res.status(200).send('Licencia generada exitosamente.');
    });

    // Ruta para obtener solo usuarios con datos completos
    app.get('/users', (req, res) => {
        const completeUsers = users.filter(user => user.documentData); // Filtra usuarios con documentData definido
        res.json(completeUsers); // Devuelve solo la lista de usuarios completos
    });

    // Iniciar el servidor
    return app.listen(4943, () => {
        console.log('Servidor iniciado en el puerto 4943');
    });
});
