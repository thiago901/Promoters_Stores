import { Router } from 'express';

import AdressesControllers from '../controllers/AdressesControllers';

const adressesControllers = new AdressesControllers();
const addressUserRoutes = Router();

addressUserRoutes.post('/', adressesControllers.create);

export default addressUserRoutes;
