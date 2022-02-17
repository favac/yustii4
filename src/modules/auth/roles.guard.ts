import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import to from 'await-to-js';
import { User } from 'yustii-backend-common/dist/models/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const [error, response] = await to(
      this.usersRepository.findOne({
        where: { cognitoSub: user.cognitoSub },
      }),
    );

    const hasRole =
      error ?? (response && response.idRol.name === user.rol)
        ? roles.indexOf(user.rol.toUpperCase()) > -1
        : false;

    console.log('user', user);
    console.log('hasRole', hasRole);
    return user && hasRole;
  }
}
