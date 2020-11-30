import { inject, injectable } from 'tsyringe';
import { getConnection } from 'typeorm';

import Promoter from '@modules/promoters/infra/typeorm/entities/Promoter';
import CreatePromotersDTO from '@modules/promoters/dtos/CreatePromotersDTO';
import IPromotersRepository from '@modules/promoters/infra/repositories/IPromotersRepository';
import IStoresRepository from '@modules/stores/infra/repositories/IStoresRepository';
import CreateUserSevice from '@modules/users/services/CreateUserSevice';
import AppError from '@shared/errors/AppError';
// import AppError from '@shared/errors/AppError';

@injectable()
class CreatePromoterService {
  constructor(
    @inject('PromotersRepository')
    private promotersRepository: IPromotersRepository,
    @inject('CreateUserSevice')
    private createUserSevice: CreateUserSevice,
    @inject('StoresRepository')
    private storesRepository: IStoresRepository,
  ) {}

  public async execute({
    address_id,
    name,
    phone,
    profile_type,
    surname,
    user,
  }: // stores,
  CreatePromotersDTO): Promise<Promoter> {
    const connection = getConnection();

    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const storess = await this.storesRepository.findById(
        '800890ec-d368-416d-9bb6-13f825518306',
      );
      if (!storess) {
        throw new AppError('error.message');
      }
      const userCreated = await this.createUserSevice.execute(
        user,
        queryRunner,
      );

      const promoter = await this.promotersRepository.create(
        {
          address_id,
          name,
          phone,
          profile_type,
          surname,
          user: userCreated,
          stores: [storess],
        },
        queryRunner,
      );

      // await queryRunner.commitTransaction();
      return promoter;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new AppError(error);
    } finally {
      await queryRunner.release();
    }
  }
}
export default CreatePromoterService;
