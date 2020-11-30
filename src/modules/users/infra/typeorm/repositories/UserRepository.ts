import { Repository, getRepository, Not, QueryRunner } from 'typeorm';
import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/User';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { id },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  public async create(
    { email, password, role_id, customer_id }: ICreateUserDTO,
    queryRunner?: QueryRunner,
  ): Promise<User> {
    const user = this.ormRepository.create({
      email,
      password,
      role_id,
      customer_id,
    });

    if (queryRunner) {
      await queryRunner.manager.save<User>(user);
    } else {
      await this.ormRepository.save(user);
    }

    return user;
  }

  public async save(user: User): Promise<User> {
    const updatedUser = await this.ormRepository.save(user);
    return updatedUser;
  }

  public async findAll(execept_id_user?: string): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: {
        id: Not(execept_id_user),
      },
      relations: ['role'],
    });
    return users;
  }
}
