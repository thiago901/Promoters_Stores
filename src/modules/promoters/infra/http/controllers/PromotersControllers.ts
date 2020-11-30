import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreatePromoterService from '@modules/promoters/services/CreatePromoterService';
import ShowPromoterService from '@modules/promoters/services/ShowPromoterService';

export default class PromotersControllers {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      address_id,
      name,
      phone,
      profile_type,
      surname,
      user,
      stores,
    } = req.body;
    const createPromoterService = container.resolve(CreatePromoterService);
    const promoter = await createPromoterService.execute({
      address_id,
      name,
      user,
      phone,
      profile_type,
      surname,
      stores,
    });
    return res.json(classToClass(promoter));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { promoter_id } = req.params;
    const showPromoterService = container.resolve(ShowPromoterService);
    const promoter = await showPromoterService.execute({
      id: promoter_id,
    });
    return res.json(classToClass(promoter));
  }
}
