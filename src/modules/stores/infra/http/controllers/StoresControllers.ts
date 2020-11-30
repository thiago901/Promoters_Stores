import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateStoreService from '@modules/stores/services/CreateStoreService';

export default class StoresControllers {
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
      site,
      social_network,
      subject,
    } = req.body;
    const createStoreService = container.resolve(CreateStoreService);
    const role = await createStoreService.execute({
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
    return res.json(classToClass(role));
  }
}
