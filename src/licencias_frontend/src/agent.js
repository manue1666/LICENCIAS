import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as backend_idl, canisterId as backend_canisterId } from '../../declarations/licencias_backend';

// Configura el agente para comunicarse con el canister backend
const agent = new HttpAgent();

// Si estás trabajando en localhost, asegúrate de desactivar la verificación del certificado (solo para entornos de desarrollo)
agent.fetchRootKey();

// Crea el actor que permite interactuar con el canister backend
export const backendActor = Actor.createActor(backend_idl, {
  agent,
  canisterId: backend_canisterId,
});
