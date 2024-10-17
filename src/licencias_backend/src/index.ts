import { Server } from 'azle';
import express from 'express';
import cors from 'cors';

let userIdCounter = 1;
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
    licenseData?: {
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
    password: '12345',
    role: 'admin',
};

users.push(adminUser);

export default Server(() => {
    const app = express();

    app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
    app.options('*', cors());

    app.use(express.json());

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }
        next();
    });

    app.post('/register', (req, res) => {
        const { name, surname, email, password } = req.body;
        const newUser = {
            id: userIdCounter++,
            name,
            surname,
            email,
            password,
            role: 'user',
        };
        users.push(newUser);
        res.status(201).send('Usuario registrado exitosamente.');
    });

    app.post('/login', (req, res) => {
        const { email, password } = req.body;
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            return res.status(401).send('Credenciales incorrectas');
        }
        res.json({ id: user.id, name: user.name, role: user.role });
    });

    app.get('/user/:id', (req, res) => {
        const userId = Number(req.params.id);
        const user = users.find(u => u.id === userId);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.json(user);
    });

    app.post('/user/:id/documents', (req, res) => {
        const userId = Number(req.params.id);
        const { identification, addressProof, educationCertificate, practicalExamCertificate, curp } = req.body;
        const user = users.find(u => u.id === userId);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        user.documentData = {
            identification,
            addressProof,
            educationCertificate,
            practicalExamCertificate,
            curp
        };
        res.status(200).send('Documentos actualizados exitosamente.');
    });

    app.post('/user/:id/generate-license', (req, res) => {
        const userId = Number(req.params.id);
        const { licenseType } = req.body;
        const user = users.find(u => u.id === userId);
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        const licenseNumber = `LIC-${userIdCounter++}`;
        const expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
        user.licenseData = {
            licenseNumber,
            expirationDate: expirationDate.toISOString().split('T')[0],
            licenseType,
        };
        res.status(200).send('Licencia generada exitosamente.');
    });

    app.get('/users', (req, res) => {
        const completeUsers = users.filter(user => user.documentData);
        res.json(completeUsers);
    });

    return app.listen(4943, () => {
        console.log('Servidor iniciado en el puerto 4943');
    });
});
