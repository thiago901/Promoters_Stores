import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCustomerService from '@modules/customers/services/CreateCustomerService';

export default class CustomersControllers {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
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
    } = req.body;
    const createCustomerService = container.resolve(CreateCustomerService);
    const role = await createCustomerService.execute({
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
    return res.json(classToClass(role));
  }
}
