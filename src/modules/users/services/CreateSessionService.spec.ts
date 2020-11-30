import FakeUserRepository from '@modules/users/infra/repositories/fakes/UserRepository';
import FakeRoleRepository from '@modules/roles/infra/repositories/fakes/FakeRolesRepository';
import AppError from '@shared/errors/AppError';
import CreateUserSevice from './CreateUserSevice';
import CreateSessionService from './CreateSessionService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeRoleRepository: FakeRoleRepository;
let fakeHashProvider: FakeHashProvider;

let createUserSevice: CreateUserSevice;
let createSessionService: CreateSessionService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeRoleRepository = new FakeRoleRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserSevice = new CreateUserSevice(
      fakeUserRepository,
      fakeHashProvider,
    );
    createSessionService = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to create a session', async () => {
    const role = await fakeRoleRepository.create({
      name: 'Token',
    });
    const user = await createUserSevice.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
      role_id: role.id,
      customer_id: 'customer_id',
    });

    const response = await createSessionService.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to create a session with user incorrect', async () => {
    await expect(
      createSessionService.execute({
        email: 'johndo2@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a session with password incorrect', async () => {
    const role = await fakeRoleRepository.create({
      name: 'Token',
    });
    await createUserSevice.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
      role_id: role.id,
      customer_id: 'customer_id',
    });

    await expect(
      createSessionService.execute({
        email: 'johndoe@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
