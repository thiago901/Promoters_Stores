import { Router } from 'express';

import RequestValidateUserController from '../controllers/RequestValidateUserController';
import ValidateUserController from '../controllers/ValidateUserController';

const validateRoutes = Router();
const requestValidateUserController = new RequestValidateUserController();
const validateUserController = new ValidateUserController();

validateRoutes.post('/request', requestValidateUserController.create);
validateRoutes.post('/validate', validateUserController.create);

export default validateRoutes;
