import { Router } from 'express';

import CustomersControllers from '../controllers/CustomersControllers';

const customersControllers = new CustomersControllers();
const customersRoute = Router();

customersRoute.post('/', customersControllers.create);

export default customersRoute;
