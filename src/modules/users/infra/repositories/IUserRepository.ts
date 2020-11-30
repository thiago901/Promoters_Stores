import { QueryRunner } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default interface IUserRepository {
  findAll(execept_id_user?: string): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO, queryRunner?: QueryRunner): Promise<User>;
  save(user: User): Promise<User>;
}
