# `Licencias para Conducir`

Bienvenidos al proyecto `CertiBlock` desarrollado por la empresa Code-Masters.

## Descripción del Proyecto
El propósito de este proyecto tiene la finalidad de crear y gestionar licencias para conducir digitales, de la cual cuenta con una interface de Usuario y Administrador intuitivas.



Para ejecutar el proyecto primero tiene que acceder a tu consola de `Ubuntu` y colocar los siguientes comandos en el orden que se indica.

```bash
cd LICENCIAS/
npm i   (comandos para las dependencias)
```

## Ejecutar Proyecto en el LocalHost:3000 

Para ejectuar el proyecto necesitaras colocar el siguiente comando ( dentro de la base del proyecto).

```bash
npm start 
```
## Ejecutar el Proyecto Deployando los Canisters
Para esta accion debes colocar los siguientes comandos (dentro de la base del proyecto).
```bash
dfx start --background --clean
dfx deploy

```
Una vez que esten los canisters deployados utiliza el siguiente comando para detenerlos.

```bash
dfx stop
```

