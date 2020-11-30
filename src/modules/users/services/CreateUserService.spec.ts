import FakeUserRepository from '@modules/users/infra/repositories/fakes/UserRepository';
import AppError from '@shared/errors/AppError';
import FakeRoleRepository from '@modules/roles/infra/repositories/fakes/FakeRolesRepository';
import CreateUserSevice from './CreateUserSevice';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUserRepository;
let fakeRoleRepository: FakeRoleRepository;
let createUserSevice: CreateUserSevice;

describe('CreateUsers', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUserRepository = new FakeUserRepository();
    fakeRoleRepository = new FakeRoleRepository();
    createUserSevice = new CreateUserSevice(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to create a new user', async () => {
    const role = await fakeRoleRepository.create({
      name: 'Token',
    });
    const user = await createUserSevice.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
      role_id: role.id,
      customer_id: 'customer_id',
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create two users on the same email', async () => {
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
      createUserSevice.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
        role_id: role.id,
        customer_id: 'customer_id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
