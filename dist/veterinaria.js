import crypto from 'node:crypto'; //libreria para generar ids unicos y aleatorios
export class veterinaria {
    constructor(nombre, direccion, telefono, id = crypto.randomUUID()) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.id = id;
    }
}
//# sourceMappingURL=veterinaria.js.map