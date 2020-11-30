import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ValidateUserService from '@modules/users/services/ValidateUserService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, accepted_terms } = request.body;

    const validateUserService = container.resolve(ValidateUserService);

    await validateUserService.execute({
      token,
      accepted_terms,
    });
    return response.status(204).json();
  }
}
