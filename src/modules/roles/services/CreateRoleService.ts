import Role from '@modules/roles/infra/typeorm/entities/Role';
import { inject, injectable } from 'tsyringe';

import ICreateRoleDTO from '@modules/roles/dtos/ICreateRoleDTO';
import IRolesRepository from '@modules/roles/infra/repositories/IRolesRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateRoleService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  public async execute({ name }: ICreateRoleDTO): Promise<Role> {
    const roleExists = await this.rolesRepository.findByName(name);
    if (roleExists) {
      throw new AppError('Role alread exists');
    }
    const role = await this.rolesRepository.create({ name });

    return role;
  }
}
export default CreateRoleService;
