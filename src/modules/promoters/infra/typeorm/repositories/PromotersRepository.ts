import { Repository, getRepository, QueryRunner } from 'typeorm';

import Promoter from '@modules/promoters/infra/typeorm/entities/Promoter';
import CreatePromotersDTO from '@modules/promoters/dtos/CreatePromotersDTO';
import IPromotersRepository from '@modules/promoters/infra/repositories/IPromotersRepository';

class PromotersRepository implements IPromotersRepository {
  private ormRepository: Repository<Promoter>;

  constructor() {
    this.ormRepository = getRepository(Promoter);
  }

  public async create(
    {
      address_id,
      name,
      user,
      phone,
      profile_type,
      surname,
      stores,
    }: CreatePromotersDTO,
    queryRunner?: QueryRunner,
  ): Promise<Promoter> {
    const promoter = this.ormRepository.create({
      address_id,
      name,
      user,
      phone,
      profile_type,
      surname,
      promoter_store: stores,
    });

    if (queryRunner) {
      console.log(promoter);

      await queryRunner.manager.save(promoter);
    } else {
      await this.ormRepository.save(promoter);
    }
    return promoter;
  }

  public async findById(promoter_id: string): Promise<Promoter | undefined> {
    const promoters = await this.ormRepository.findOne({
      where: { id: promoter_id },
    });

    return promoters;
  }
}

export default PromotersRepository;
