import { City } from 'src/models/cities/cities.entity';
import { Rol } from 'src/models/roles/roles.entity';

declare global {
  interface IUser {
    idUser?: string;
    cognitoSub?: string;
    name?: string;
    lastName?: string;
    email?: string;
    photoUrl?: string;
    rutLawyerUrl?: string;
    phone?: string;
    documentType?: string;
    documentNumber?: string;
    lawyerDescription?: string;
    authorizeUseData?: boolean;
    authorizeTyC?: boolean;
    lawyerVerificate?: boolean;
    hasProfessionalCard?: boolean;
    creationDate?: Date;
    updatedDate?: Date;
    deletedDate?: Date;
    isCompany?: boolean;
    legalAge?: boolean;
    isLawyer?: boolean;
    idRol?: Rol;
    cities?: City[];
    provideServices?: UserService[];
  }

  interface IUserClient {
    idUser?: string;
    cognitoSub?: string;
    name?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    creationDate?: Date;
    updatedDate?: Date;
    lastLogin?: Date;
    isCompany?: boolean;
    legalAge?: boolean;
  }

  interface IResponseUser {
    statusCode: number;
    timestamp: string;
    success: boolean;
  }

  interface IUserQuery {
    page?: number;
    limit?: number;
  }
}
