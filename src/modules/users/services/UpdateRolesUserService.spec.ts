import FakeRoleRepository from '@modules/roles/infra/repositories/fakes/FakeRolesRepository';
import FakeUserRepository from '@modules/users/infra/repositories/fakes/UserRepository';
// import AppError from '@shared/errors/AppError';

import UpdateRolesUserService from './UpdateRolesUserService';

let fakeRoleRepository: FakeRoleRepository;
let fakeUserRepository: FakeUserRepository;

let updateRolesUserService: UpdateRolesUserService;

describe('UpdateRolesUser', () => {
  beforeEach(() => {
    fakeRoleRepository = new FakeRoleRepository();
    fakeUserRepository = new FakeUserRepository();

    updateRolesUserService = new UpdateRolesUserService(
      fakeRoleRepository,
      fakeUserRepository,
    );
  });

  it('should be able to update role user', async () => {
    await fakeRoleRepository.create({
      name: 'Role 1',
    });
    const role2 = await fakeRoleRepository.create({
      name: 'Role 2',
    });
    const user = await fakeUserRepository.create({
      email: 'johndoe@gmail.com',
      password: '123456',
      role_id: role2.id,
      customer_id: 'customer_id',
    });

    const newUser = await updateRolesUserService.execute({
      user_id: user.id,
      role_id: role2.id,
    });

    expect(newUser.role_id).toEqual(role2.id);
  });
});
