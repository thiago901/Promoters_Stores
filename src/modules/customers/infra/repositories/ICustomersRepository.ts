import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import CreateCustomersDTO from '@modules/customers/dtos/CreateCustomersDTO';

export default interface ICustomersRepository {
  create(data: CreateCustomersDTO): Promise<Customer>;
  findById(customer_id: string): Promise<Customer | undefined>;
}
