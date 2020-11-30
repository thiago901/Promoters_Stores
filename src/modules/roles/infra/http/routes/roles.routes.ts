import { Router } from 'express';

import RoleUserController from '../controllers/RolesControllers';

const roleUserController = new RoleUserController();
const roleUserRoutes = Router();

roleUserRoutes.post('/', roleUserController.create);

export default roleUserRoutes;
