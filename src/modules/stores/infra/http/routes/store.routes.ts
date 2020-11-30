import { Router } from 'express';

import StoresControllers from '../controllers/StoresControllers';

const storesControllers = new StoresControllers();
const storesRoute = Router();

storesRoute.post('/', storesControllers.create);

export default storesRoute;
