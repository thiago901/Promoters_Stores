import FakeUserRepository from '@modules/users/infra/repositories/fakes/UserRepository';
// import AppError from '@shared/errors/AppError';
import FakeRoleRepository from '@modules/roles/infra/repositories/fakes/FakeRolesRepository';
import ListUserSevice from './ListUserSevice';

let fakeUserRepository: FakeUserRepository;
let fakeRoleRepository: FakeRoleRepository;
let listUserSevice: ListUserSevice;

describe('ListUsers', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeRoleRepository = new FakeRoleRepository();
    listUserSevice = new ListUserSevice(fakeUserRepository);
  });
  it('should be able to List all users', async () => {
    const role = await fakeRoleRepository.create({
      name: 'Admin',
    });

    const user1 = await fakeUserRepository.create({
      email: 'johndoe@gmail.com',
      password: '123456',
      role_id: role.id,
      customer_id: 'customer_id',
    });
    const user2 = await fakeUserRepository.create({
      email: 'johntreê@gmail.com',
      password: '123456',
      role_id: role.id,
      customer_id: 'customer_id',
    });
    const users = await listUserSevice.execute({});

    expect(users).toEqual(
      expect.arrayContaining([
        {
          id: user1.id,
          email: 'johndoe@gmail.com',
          name: 'John Doe',
          password: '123456',
        },
        {
          id: user2.id,
          email: 'johntreê@gmail.com',
          name: 'John Treê',
          password: '123456',
        },
      ]),
    );
  });
});
