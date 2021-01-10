export type Roles = 'false' | 'true';

export interface User {
  email: string;
  password: string;
}

export interface UserResponse extends User {
  ok: string;
  content: {
    email: string;
    tokens : {
      acceso: string;
      refresh: string;
    }
    is_superuser: Roles;
    is_staff: boolean;    
    usuId: number;  
    usuNombre:string;
    usuFono:string;
    usuCumple:Date;
  };  
}

