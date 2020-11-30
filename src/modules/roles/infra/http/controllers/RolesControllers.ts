import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateRoleService from '@modules/roles/services/CreateRoleService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name } = req.body;
    const createRoleService = container.resolve(CreateRoleService);
    const role = await createRoleService.execute({ name });
    return res.json(classToClass(role));
  }
}
