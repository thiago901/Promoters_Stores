import { Request, Response } from 'express';

import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateAvatarInUsers from '@modules/users/services/UpdateAvatarInUsers';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatarInUsers = container.resolve(UpdateAvatarInUsers);
    const user = await updateAvatarInUsers.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });
    return response.json(classToClass(user));
  }
}
