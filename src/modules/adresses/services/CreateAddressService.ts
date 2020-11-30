import Address from '@modules/adresses/infra/typeorm/entities/Address';
import { inject, injectable } from 'tsyringe';

import ICreateAddressDTO from '@modules/adresses/dtos/ICreateAddressDTO';
import IAdressesRepository from '@modules/adresses/infra/repositories/IAdressesRepository';

@injectable()
class CreateAddressService {
  constructor(
    @inject('AdressesRepository')
    private adressesRepository: IAdressesRepository,
  ) {}

  public async execute({
    street,
    state,
    postal_code,
    city,
    number,
    neighborhood,
    complement,
  }: ICreateAddressDTO): Promise<Address> {
    const address = await this.adressesRepository.create({
      street,
      state,
      postal_code,
      city,
      number,
      neighborhood,
      complement,
    });

    return address;
  }
}
export default CreateAddressService;
