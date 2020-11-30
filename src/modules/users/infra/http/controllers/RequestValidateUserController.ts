import { Request, Response } from 'express';

import { container } from 'tsyringe';
import SendEmailValidateUser from '@modules/users/services/SendEmailValidateUser';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendEmailValidateUser = container.resolve(SendEmailValidateUser);
    await sendEmailValidateUser.execute({
      email,
    });
    return response.status(204).json();
  }
}
