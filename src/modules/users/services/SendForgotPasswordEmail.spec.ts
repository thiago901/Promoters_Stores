import FakeUserRepository from '@modules/users/infra/repositories/fakes/UserRepository';
import FakeRoleRepository from '@modules/roles/infra/repositories/fakes/FakeRolesRepository';

import FakeUserTokenRepository from '@modules/users/infra/repositories/fakes/FakeUserTokenRepository';
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import CreateUserSevice from './CreateUserSevice';
import SendForgotPasswordEmail from './SendForgotPasswordEmail';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let fakeRoleRepository: FakeRoleRepository;

let fakeHashProvider: FakeHashProvider;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmail;
let createUserSevice: CreateUserSevice;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeRoleRepository = new FakeRoleRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    fakeHashProvider = new FakeHashProvider();
    fakeMailProvider = new FakeMailProvider();

    sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUserRepository,
      fakeMailProvider,
      fakeUserTokenRepository,
    );
    createUserSevice = new CreateUserSevice(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to recover the password using the email', async () => {
    const role = await fakeRoleRepository.create({
      name: 'Token',
    });
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await createUserSevice.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
      role_id: role.id,
      customer_id: 'customer_id',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@gmail.com',
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover a non-existing user password ', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'johndoe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should generate a forgot password token', async () => {
    const role = await fakeRoleRepository.create({
      name: 'Token',
    });
    const generate = jest.spyOn(fakeUserTokenRepository, 'generate');
    const user = await createUserSevice.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
      role_id: role.id,
      customer_id: 'customer_id',
    });

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@gmail.com',
    });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
