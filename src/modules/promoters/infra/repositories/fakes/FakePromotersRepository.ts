import Promoter from '@modules/promoters/infra/typeorm/entities/Promoter';
import CreatePromotersDTO from '@modules/promoters/dtos/CreatePromotersDTO';
import IPromotersRepository from '@modules/promoters/infra/repositories/IPromotersRepository';

class FakePromotersRepository implements IPromotersRepository {
  private ormRepository: Promoter[] = [];

  public async create({
    address_id,
    name,
    user_id,
    phone,
    profile_type,
    surname,
  }: CreatePromotersDTO): Promise<Promoter> {
    const promoter = new Promoter();
    Object.assign(promoter, {
      address_id,
      name,
      user_id,
      phone,
      profile_type,
      surname,
    });
    this.ormRepository.push(promoter);
    return promoter;
  }

  public async findById(promoter_id: string): Promise<Promoter | undefined> {
    const promoter = this.ormRepository.find(r => r.id === promoter_id);

    return promoter;
  }
}

export default FakePromotersRepository;
