import FakeUserRepository from '@modules/users/infra/repositories/fakes/UserRepository';
import FakeRoleRepository from '@modules/roles/infra/repositories/fakes/FakeRolesRepository';

import AppError from '@shared/errors/AppError';

import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;
let fakeRoleRepository: FakeRoleRepository;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeRoleRepository = new FakeRoleRepository();

    showProfileService = new ShowProfileService(fakeUserRepository);
  });
  it('should be able to return the profile', async () => {
    const role = await fakeRoleRepository.create({
      name: 'Token',
    });
    const user = await fakeUserRepository.create({
      email: 'johndoe@gmail.com',
      password: '123456',
      role_id: role.id,
      customer_id: 'customer_id',
    });

    const userUpdate = await showProfileService.execute({
      user_id: user.id,
    });

    expect(userUpdate.email).toBe('johndoe@gmail.com');
  });
  it('should not be able to return the profile non-exist', async () => {
    expect(
      showProfileService.execute({
        user_id: 'non-exist-id-user',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
