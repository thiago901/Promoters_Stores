import { QueryRunner } from 'typeorm';
import Promoter from '@modules/promoters/infra/typeorm/entities/Promoter';
import CreatePromotersDTO from '@modules/promoters/dtos/CreatePromotersDTO';

export default interface IPromotersRepository {
  create(
    data: CreatePromotersDTO,
    queryRunner?: QueryRunner,
  ): Promise<Promoter>;
  findById(promoter_id: string): Promise<Promoter | undefined>;
}
