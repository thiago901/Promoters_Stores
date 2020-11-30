import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Column,
} from 'typeorm';
import Promoter from '@modules/promoters/infra/typeorm/entities/Promoter';
import Store from '@modules/stores/infra/typeorm/entities/Store';

@Entity('promoters_stores')
class PromoterStores {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Promoter, promoter => promoter.promoter_store)
  @JoinColumn({ name: 'promoter_id' })
  promoter: Promoter;

  @Column('uuid')
  store_id: string;

  @ManyToOne(() => Store, store => store.promoter_store)
  @JoinColumn({ name: 'store_id' })
  store: Store;

  @Column('uuid')
  promoter_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default PromoterStores;
