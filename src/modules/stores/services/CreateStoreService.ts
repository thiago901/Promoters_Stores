import Store from '@modules/stores/infra/typeorm/entities/Store';
import { inject, injectable } from 'tsyringe';

import CreateStoresDTO from '@modules/stores/dtos/CreateStoresDTO';
import IStoresRepository from '@modules/stores/infra/repositories/IStoresRepository';

@injectable()
class CreateStoreService {
  constructor(
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  public async execute({
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
    const store = await this.storesRepository.create({
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

    return store;
  }
}
export default CreateStoreService;
