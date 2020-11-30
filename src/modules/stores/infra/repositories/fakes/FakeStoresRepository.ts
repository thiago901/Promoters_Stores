import Store from '@modules/stores/infra/typeorm/entities/Store';
import CreateStoresDTO from '@modules/stores/dtos/CreateStoresDTO';
import IStoresRepository from '@modules/stores/infra/repositories/IStoresRepository';

class FakeStoresRepository implements IStoresRepository {
  private ormRepository: Store[] = [];

  public async create({
    active,
    address_id,
    email,
    cnpj,
    company_name,
    contact_name,
    contact_phone,
    fantasy_name,
    site,
    social_network,
    subject,
  }: CreateStoresDTO): Promise<Store> {
    const store = new Store();
    Object.assign(store, {
      active,
      address_id,
      email,
      cnpj,
      company_name,
      contact_name,
      contact_phone,
      fantasy_name,
      site,
      social_network,
      subject,
    });
    this.ormRepository.push(store);
    return store;
  }

  public async findById(store_id: string): Promise<Store | undefined> {
    const store = this.ormRepository.find(r => r.id === store_id);

    return store;
  }
}

export default FakeStoresRepository;
