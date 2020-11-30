import { Repository, getRepository } from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import CreateCustomersDTO from '@modules/customers/dtos/CreateCustomersDTO';
import ICustomersRepository from '@modules/customers/infra/repositories/ICustomersRepository';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create({
    subject,
    social_network,
    site,
    payment_day,
    fantasy_name,
    contact_phone,
    contact_name,
    company_name,
    cnpj,
    email,
    address_id,
    active,
  }: CreateCustomersDTO): Promise<Customer> {
    const customer = this.ormRepository.create({
      subject,
      social_network,
      site,
      payment_day,
      fantasy_name,
      contact_phone,
      contact_name,
      company_name,
      cnpj,
      email,
      address_id,
      active,
    });
    await this.ormRepository.save(customer);
    return customer;
  }

  public async findById(customer_id: string): Promise<Customer | undefined> {
    const customers = await this.ormRepository.findOne({
      where: { id: customer_id },
    });

    return customers;
  }
}

export default CustomersRepository;
