import User from '@modules/users/infra/typeorm/entities/User';
import Store from '@modules/stores/infra/typeorm/entities/Store';

export default interface CreatePromotersDTO {
  name: string;
  surname: string;
  profile_type: string;
  phone: string;
  user: User;
  stores: Store[];
  address_id: string;
}
