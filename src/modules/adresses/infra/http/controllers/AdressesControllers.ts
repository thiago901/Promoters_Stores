import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateAddressService from '@modules/adresses/services/CreateAddressService';

export default class AdressesControllers {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      street,
      state,
      postal_code,
      city,
      number,
      neighborhood,
      complement,
    } = req.body;
    const createAddressService = container.resolve(CreateAddressService);
    const address = await createAddressService.execute({
      street,
      state,
      postal_code,
      city,
      number,
      neighborhood,
      complement,
    });
    return res.json(classToClass(address));
  }
}
