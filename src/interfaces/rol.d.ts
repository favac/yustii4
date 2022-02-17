interface IRol {
  idRol?: number;
  name: string;
  description: string;
}

interface IRolQuery {
  page?: number;
  limit?: number;
}

const enum Roles {
  ADMIN = 'ADMIN',
  CLIENTE = 'CLIENTE',
  ABOGADO = 'ABOGADO',
  GESTOR = 'GESTOR',
}
