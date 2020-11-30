import FakeUserRepository from '@modules/users/infra/repositories/fakes/UserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeRoleRepository from '@modules/roles/infra/repositories/fakes/FakeRolesRepository';
import AppError from '@shared/errors/AppError';

import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let updateProfileService: UpdateProfileService;
let fakeHashProvider: FakeHashProvider;
let fakeRoleRepository: FakeRoleRepository;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeRoleRepository = new FakeRoleRepository();
    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update the profile', async () => {
    const role = await fakeRoleRepository.create({
      name: 'Token',
    });
    const user = await fakeUserRepository.create({
      email: 'johndoe@gmail.com',
      password: '123456',
      role_id: role.id,
      customer_id: 'customer_id',
    });

    const userUpdate = await updateProfileService.execute({
      user_id: user.id,
      email: 'johndoe@gmail.com',
    });

    expect(userUpdate.email).toBe('johndoe@gmail.com');
  });
  it('should not be able to update the profile with email alread used', async () => {
    const role = await fakeRoleRepository.create({
      name: 'Token',
    });
    await fakeUserRepository.create({
      email: 'johndoe@gmail.com',
      password: '123456',
      role_id: role.id,
      customer_id: 'customer_id',
    });

    const user = await fakeUserRepository.create({
      email: 'juliadoe@gmail.com',
      password: '123456',
      role_id: role.id,
      customer_id: 'customer_id',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'johndoe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to update the profile non-exist', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'non-exist-user',
        email: 'johndoe@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should  be able to update the password from profile', async () => {
    const role = await fakeRoleRepository.create({
      name: 'Token',
    });
    const user = await fakeUserRepository.create({
      email: 'juliadoe@gmail.com',
      password: '123456',
      role_id: role.id,
      customer_id: 'customer_id',
    });

    const updateUser = await updateProfileService.execute({
      user_id: user.id,
      email: 'johndoe@gmail.com',
      old_password: '123456',
      password: '123123',
    });
    expect(updateUser.password).toBe('123123');
  });

  it('should not be able to update the password from profile without old_password', async () => {
    const role = await fakeRoleRepository.create({
      name: 'Token',
    });
    const user = await fakeUserRepository.create({
      email: 'johndoe@gmail.com',
      password: '123456',
      role_id: role.id,
      customer_id: 'customer_id',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'johndoe@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password from profile wrong old_password', async () => {
    const role = await fakeRoleRepository.create({
      name: 'Token',
    });
    const user = await fakeUserRepository.create({
      email: 'juliadoe@gmail.com',
      password: '123456',
      role_id: role.id,
      customer_id: 'customer_id',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'johndoe@gmail.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
