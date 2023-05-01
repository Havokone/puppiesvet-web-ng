import { Mascota } from "./mascota";
import { Servicio } from "./servicio";
import { Usuario } from "./usuario";

export class Orden {
  idOrden:          number;
  notaOrdenCliente?:string;
  notaOrdenMedico?: string;
  costoOrden?:      number;
  fechaOrden?:      Date;
  estado:           boolean;
  mascota?:         Mascota;
  servicio?:        Servicio;
  usuario?:         Usuario;
}
