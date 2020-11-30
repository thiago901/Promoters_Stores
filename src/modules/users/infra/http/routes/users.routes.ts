import { Router } from 'express';

import ensureAuthenticad from '@modules/users/infra/http/middlewares/ensureAuthenticad';

// import uploadConfig from '@config/multerConfig';

import UsersController from '../controllers/UsersController';
// import UserAvatarController from '../controllers/UserAvatarController';

const usersController = new UsersController();
// const userAvatarController = new UserAvatarController();
const userRoutes = Router();
// const upload = multer(uploadConfig.multer);

userRoutes.post('/', usersController.create);

userRoutes.use(ensureAuthenticad);
// userRoutes.patch(
//   '/avatar',
//   upload.single('avatar'),
//   userAvatarController.update,
// );
userRoutes.get('/', usersController.index);

export default userRoutes;
