import Address from '@modules/adresses/infra/typeorm/entities/Address';
import ICreateAddressDTO from '@modules/adresses/dtos/ICreateAddressDTO';
import IAdressesRepository from '@modules/adresses/infra/repositories/IAdressesRepository';

class FakeAdressesRepository implements IAdressesRepository {
  private ormrepository: Address[] = [];

  public async create({
    city,
    complement,
    neighborhood,
    number,
    postal_code,
    state,
    street,
  }: ICreateAddressDTO): Promise<Address> {
    const address = new Address();
    Object.assign(address, {
      city,
      complement,
      neighborhood,
      number,
      postal_code,
      state,
      street,
    });
    this.ormrepository.push(address);
    return address;
  }

  public async findById(address_id: string): Promise<Address | undefined> {
    const address = this.ormrepository.find(r => r.id === address_id);

    return address;
  }
}

export default FakeAdressesRepository;
