import crypto from 'node:crypto' //libreria para generar ids unicos y aleatorios
export class veterinaria {
    constructor(
        public nombre: string, 
        public direccion: string, 
        public telefono: string,
        public id= crypto.randomUUID(),  //genera un id unico y aleatorio
    ) {}
}