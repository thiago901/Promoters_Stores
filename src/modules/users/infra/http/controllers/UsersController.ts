import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserSevice';
import ListUserSevice from '@modules/users/services/ListUserSevice';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password, role_id, customer_id } = req.body;
    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({
      email,
      password,
      role_id,
      customer_id,
    });
    return res.json(classToClass(user));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const listUserSevice = container.resolve(ListUserSevice);
    const users = await listUserSevice.execute({ execept_id_user: id });

    return res.json(classToClass(users));
  }
}
