import { Repository, getRepository } from 'typeorm';

import Store from '@modules/stores/infra/typeorm/entities/Store';
import CreateStoresDTO from '@modules/stores/dtos/CreateStoresDTO';
import IStoresRepository from '@modules/stores/infra/repositories/IStoresRepository';

class StoresRepository implements IStoresRepository {
  private ormRepository: Repository<Store>;

  constructor() {
    this.ormRepository = getRepository(Store);
  }

  public async create({
    subject,
    social_network,
    site,
    fantasy_name,
    contact_phone,
    contact_name,
    company_name,
    cnpj,
    email,
    address_id,
    active,
  }: CreateStoresDTO): Promise<Store> {
    const store = this.ormRepository.create({
      subject,
      social_network,
      site,
      fantasy_name,
      contact_phone,
      contact_name,
      company_name,
      cnpj,
      email,
      address_id,
      active,
    });
    await this.ormRepository.save(store);
    return store;
  }

  public async findById(store_id: string): Promise<Store | undefined> {
    const stores = await this.ormRepository.findOne({
      where: { id: store_id },
    });

    return stores;
  }
}

export default StoresRepository;
