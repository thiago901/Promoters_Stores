import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import CreateCustomersDTO from '@modules/customers/dtos/CreateCustomersDTO';
import ICustomersRepository from '@modules/customers/infra/repositories/ICustomersRepository';

class FakeCustomersRepository implements ICustomersRepository {
  private ormRepository: Customer[] = [];

  public async create({
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
    const customer = new Customer();
    Object.assign(customer, {
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
    this.ormRepository.push(customer);
    return customer;
  }

  public async findById(customer_id: string): Promise<Customer | undefined> {
    const customer = this.ormRepository.find(r => r.id === customer_id);

    return customer;
  }
}

export default FakeCustomersRepository;
