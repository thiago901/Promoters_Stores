import { container } from 'tsyringe';
import './providers';
import './services';
import '@modules/users/providers';

import IRolesRepository from '@modules/roles/infra/repositories/IRolesRepository';
import RolesRepository from '@modules/roles/infra/typeorm/repositories/RolesRepository';

import IUserRepository from '@modules/users/infra/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import IUserTokenRepository from '@modules/users/infra/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokesRepository';

import IAdressesRepository from '@modules/adresses/infra/repositories/IAdressesRepository';
import AdressesRepository from '@modules/adresses/infra/typeorm/repositories/AdressesRepository';

import ICustomersRepository from '@modules/customers/infra/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

import IPromotersRepository from '@modules/promoters/infra/repositories/IPromotersRepository';
import PromotersRepository from '@modules/promoters/infra/typeorm/repositories/PromotersRepository';

import IStoresRepository from '@modules/stores/infra/repositories/IStoresRepository';
import StoreRepository from '@modules/stores/infra/typeorm/repositories/StoresRepository';

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
);
container.registerSingleton<IStoresRepository>(
  'StoresRepository',
  StoreRepository,
);
container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokenRepository,
);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IAdressesRepository>(
  'AdressesRepository',
  AdressesRepository,
);
container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);
container.registerSingleton<IPromotersRepository>(
  'PromotersRepository',
  PromotersRepository,
);
