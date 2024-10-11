import { Server } from 'azle';
import express from 'express';
import cors from 'cors';
import { ic, nat, text, Principal } from 'azle';

// Definición de tipos
type Licencia = {
    id: nat;
    tipo: text;
    fechaEmision: nat;
    estado: text;
};

type Historial = {
    idLicencia: nat;
    cambios: text[];
};

type Multa = {
    idLicencia: nat;
    descripcion: text;
    monto: nat;
};

// Variables para almacenar datos
let licencias: Licencia[] = [];
let historiales: Historial[] = [];
let multas: Multa[] = [];

// Funciones para manejar licencias
function crearLicencia(id: string, tipo: string, fechaEmision: string, estado: string): void {
    licencias.push({ id: BigInt(id), tipo, fechaEmision: BigInt(fechaEmision), estado });
}


function obtenerLicencias(): Licencia[] {
    return licencias;
}

// Funciones para manejar históricos
function registrarCambio(idLicencia: nat, cambio: text): void {
    const historial = historiales.find(h => h.idLicencia === idLicencia);
    if (historial) {
        historial.cambios.push(cambio);
    } else {
        historiales.push({ idLicencia, cambios: [cambio] });
    }
}

function obtenerHistorial(idLicencia: nat): Historial | undefined {
    return historiales.find(h => h.idLicencia === idLicencia);
}

// Funciones para manejar pagos
function pagarLicencia(idLicencia: nat, monto: nat, pagador: Principal): void {
    // Lógica para procesar el pago
    registrarCambio(idLicencia, `Pago de ${monto} ICP por ${pagador.toText()}`);
}

// Funciones para manejar multas
function asociarMulta(idLicencia: nat, descripcion: text, monto: nat): void {
    multas.push({ idLicencia, descripcion, monto });
    registrarCambio(idLicencia, `Multa asociada: ${descripcion} por ${monto} ICP`);
}

function obtenerMultas(idLicencia: nat): Multa[] {
    return multas.filter(m => m.idLicencia === idLicencia);
}

// Configuración del servidor Express
export default Server(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    // Rutas para manejar licencias
    app.post('/crearLicencia', (req, res) => {
        const { id, tipo, fechaEmision, estado } = req.body;
        crearLicencia(id, tipo, fechaEmision, estado);
        res.send('Licencia creada');
    });

    app.get('/obtenerLicencias', (req, res) => {
        res.json(obtenerLicencias());
    });

    // Rutas para manejar históricos
    app.post('/registrarCambio', (req, res) => {
        const { idLicencia, cambio } = req.body;
        registrarCambio(BigInt(idLicencia), cambio);
        res.send('Cambio registrado');
    });

    app.get('/obtenerHistorial/:idLicencia', (req, res) => {
        const idLicencia = BigInt(req.params.idLicencia);
        res.json(obtenerHistorial(idLicencia));
    });

    // Rutas para manejar pagos
    app.post('/pagarLicencia', (req, res) => {
        const { idLicencia, monto, pagador } = req.body;
        pagarLicencia(BigInt(idLicencia), BigInt(monto), Principal.fromText(pagador));
        res.send('Pago registrado');
    });

    // Rutas para manejar multas
    app.post('/asociarMulta', (req, res) => {
        const { idLicencia, descripcion, monto } = req.body;
        asociarMulta(BigInt(idLicencia), descripcion, BigInt(monto));
        res.send('Multa asociada');
    });

    app.get('/obtenerMultas/:idLicencia', (req, res) => {
        const idLicencia = BigInt(req.params.idLicencia);
        res.json(obtenerMultas(idLicencia));
    });

    return app.listen();
});
