import { Repository, getRepository } from 'typeorm';

import Address from '@modules/adresses/infra/typeorm/entities/Address';
import ICreateAddressDTO from '@modules/adresses/dtos/ICreateAddressDTO';
import IAdressesRepository from '@modules/adresses/infra/repositories/IAdressesRepository';

class AdressesRepository implements IAdressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create({
    city,
    complement,
    neighborhood,
    number,
    postal_code,
    state,
    street,
  }: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create({
      city,
      complement,
      neighborhood,
      number,
      postal_code,
      state,
      street,
    });
    await this.ormRepository.save(address);
    return address;
  }

  public async findById(address_id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: { id: address_id },
    });

    return address;
  }
}

export default AdressesRepository;
