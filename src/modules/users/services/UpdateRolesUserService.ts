import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/User';
import IRolesRepository from '@modules/roles/infra/repositories/IRolesRepository';
import IUserRepository from '@modules/users/infra/repositories/IUserRepository';

interface IRequest {
  role_id: string;
  user_id: string;
}
@injectable()
class UpdateRolesUserService {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ role_id, user_id }: IRequest): Promise<User> {
    const roleExist = await this.rolesRepository.findById(role_id);

    if (!roleExist) {
      throw new AppError('Role does not exist');
    }

    const userExist = await this.userRepository.findById(user_id);
    if (!userExist) {
      throw new AppError('User does not exist');
    }

    userExist.role = roleExist;
    await this.userRepository.save(userExist);

    return userExist;
  }
}
export default UpdateRolesUserService;
