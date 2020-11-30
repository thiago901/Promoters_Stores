import Address from '@modules/adresses/infra/typeorm/entities/Address';
import ICreateAddressDTO from '@modules/adresses/dtos/ICreateAddressDTO';

export default interface IAdressesRepository {
  create(data: ICreateAddressDTO): Promise<Address>;
  findById(address_id: string): Promise<Address | undefined>;
}
