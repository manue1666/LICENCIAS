import { Server } from 'azle';
import express from 'express';
import cors from 'cors';
import { ic, nat, text, Principal } from 'azle';



// Configuración del servidor Express
export default Server(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    return app.listen();
});
