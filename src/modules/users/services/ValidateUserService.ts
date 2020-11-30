import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import AppError from '@shared/errors/AppError';

import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import IUserTokenRepository from '@modules/users/infra/repositories/IUserTokenRepository';

interface IRequest {
  accepted_terms: boolean;
  token: string;
}

@injectable()
class SendForgotPasswordEmail {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ accepted_terms, token }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User token not exists');
    }
    const user = await this.userRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('User not exists');
    }
    const createdAt = userToken.created_at;
    const compareDates = addHours(createdAt, 2);

    if (isAfter(Date.now(), compareDates)) {
      throw new AppError('Token expired');
    }
    user.active = true;
    user.accepted_terms = accepted_terms;
    user.first_access = false;
    await this.userRepository.save(user);
  }
}
export default SendForgotPasswordEmail;
