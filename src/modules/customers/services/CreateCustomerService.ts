import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import { inject, injectable } from 'tsyringe';

import CreateCustomersDTO from '@modules/customers/dtos/CreateCustomersDTO';
import ICustomersRepository from '@modules/customers/infra/repositories/ICustomersRepository';

@injectable()
class CreateCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
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
    payment_day,
    site,
    social_network,
    subject,
  }: CreateCustomersDTO): Promise<Customer> {
    const customer = await this.customersRepository.create({
      active,
      address_id,
      email,
      cnpj,
      company_name,
      contact_name,
      contact_phone,
      fantasy_name,
      payment_day,
      site,
      social_network,
      subject,
    });

    return customer;
  }
}
export default CreateCustomerService;
