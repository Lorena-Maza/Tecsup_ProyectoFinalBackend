export type Roles = 'false' | 'true';

export interface Persona {
  perId:number;
  perDni: string;
  perNombres: string;
  perApellidos: string;
}

export interface PersonaResponse extends Persona {
  ok: string;
  content: {
    email: string;
    tokens : {
      acceso: string;
      refresh: string;
    }
    perFecnac: Date;
    perSexo: string;    
    perCorreo: string;  
    perCelular:string;
    perObservacion:string;
  };  
}

