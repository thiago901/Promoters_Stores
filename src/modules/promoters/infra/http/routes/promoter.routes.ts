import { Router } from 'express';

import PromotersControllers from '../controllers/PromotersControllers';

const promotersControllers = new PromotersControllers();
const promotersRoute = Router();

promotersRoute.post('/', promotersControllers.create);
promotersRoute.get('/:promoter_id', promotersControllers.show);

export default promotersRoute;
