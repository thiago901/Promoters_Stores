import { inject, injectable } from 'tsyringe';

import Promoter from '@modules/promoters/infra/typeorm/entities/Promoter';
import IPromotersRepository from '@modules/promoters/infra/repositories/IPromotersRepository';

interface IRequest {
  id: string;
}
@injectable()
class CreatePromoterService {
  constructor(
    @inject('PromotersRepository')
    private promotersRepository: IPromotersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Promoter | undefined> {
    const promoter = await this.promotersRepository.findById(id);

    return promoter;
  }
}
export default CreatePromoterService;
