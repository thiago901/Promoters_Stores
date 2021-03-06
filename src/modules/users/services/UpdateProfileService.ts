import { inject, injectable } from 'tsyringe';
import User from '@modules/users/infra/typeorm/entities/User';

import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  email: string;
  old_password?: string;
  password?: string;
}
@injectable()
class UpdateAvatarInUsers {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    // Verify if already exist the user
    if (!user) {
      throw new AppError('User not found');
    }

    const emailUsed = await this.userRepository.findByEmail(email);

    // Verify if email already used
    if (emailUsed && emailUsed.id !== user.id) {
      throw new AppError('Email already in use');
    }

    user.email = email;

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password',
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Password invalidated');
      }
      user.password = await this.hashProvider.generateHash(password);
    }

    return this.userRepository.save(user);
  }
}
export default UpdateAvatarInUsers;
