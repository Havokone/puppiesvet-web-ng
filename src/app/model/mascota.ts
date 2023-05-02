import { RazaMascota } from "./raza-mascota";
import { Usuario } from "./usuario";

export class Mascota {
  idMascota:              number;
  nombreMascota:          string;
  pesoMascota:            number;
  tamanoMascota:          number;
  fechaNacimientoMascota: Date;
  imagenMascota:          string;
  sexoMascota:            string;
  estado:                 boolean;
  razaMascota:            RazaMascota;
  usuario:                Usuario;
}
