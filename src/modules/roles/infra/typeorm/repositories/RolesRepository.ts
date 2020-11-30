import { Repository, getRepository } from 'typeorm';

import Role from '@modules/roles/infra/typeorm/entities/Role';
import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';
import IRolesRepository from '@modules/roles/infra/repositories/IRolesRepository';

class FakeRolesRepository implements IRolesRepository {
  private ormRepository: Repository<Role>;

  constructor() {
    this.ormRepository = getRepository(Role);
  }

  public async create({ name }: ICreateRoleDTO): Promise<Role> {
    const role = this.ormRepository.create({ name });
    await this.ormRepository.save(role);
    return role;
  }

  public async findById(role_id: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({
      where: { id: role_id },
    });

    return role;
  }

  public async findByName(name: string): Promise<Role | undefined> {
    const role = await this.ormRepository.findOne({
      where: { name },
    });

    return role;
  }
}

export default FakeRolesRepository;
