import Store from '@modules/stores/infra/typeorm/entities/Store';
import CreateStoresDTO from '@modules/stores/dtos/CreateStoresDTO';

export default interface IStoresRepository {
  create(data: CreateStoresDTO): Promise<Store>;
  findById(store_id: string): Promise<Store | undefined>;
}
