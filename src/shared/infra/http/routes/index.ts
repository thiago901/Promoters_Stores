import { Router } from 'express';

import rolesRoute from '@modules/roles/infra/http/routes/roles.routes';
import passwordRoute from '@modules/users/infra/http/routes/password.routes';
import sessionsRoute from '@modules/users/infra/http/routes/sessions.routes';
import usersRoute from '@modules/users/infra/http/routes/users.routes';
import validateRoute from '@modules/users/infra/http/routes/validate.routes';
import customerRoute from '@modules/customers/infra/http/routes/customer.routes';
import adressesRoute from '@modules/adresses/infra/http/routes/adresses.routes';
import promoterRoute from '@modules/promoters/infra/http/routes/promoter.routes';
import storesRoute from '@modules/stores/infra/http/routes/store.routes';

const routes = Router();

routes.use('/roles', rolesRoute);
routes.use('/password', passwordRoute);
routes.use('/users', usersRoute);
routes.use('/sessions', sessionsRoute);
routes.use('/validation', validateRoute);
routes.use('/customers', customerRoute);
routes.use('/adresses', adressesRoute);
routes.use('/promoters', promoterRoute);
routes.use('/stores', storesRoute);

export default routes;
