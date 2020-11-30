import { container } from 'tsyringe';

import CreateUserSevice from '@modules/users/services/CreateUserSevice';

container.registerSingleton<CreateUserSevice>(
  'CreateUserSevice',
  CreateUserSevice,
);
