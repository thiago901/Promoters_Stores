import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import PromoterStores from '@modules/promoters/infra/typeorm/entities/PromoterStores';

@Entity('stores')
class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fantasy_name: string;

  @Column()
  company_name: string;

  @Column()
  cnpj: string;

  @Column()
  email: string;

  @Column()
  contact_name: string;

  @Column()
  contact_phone: string;

  @Column()
  social_network: string;

  @Column()
  site: string;

  @Column('text')
  subject: string;

  @Column()
  active: boolean;

  @Column()
  address_id: string;

  @OneToMany(() => PromoterStores, promoterStores => promoterStores.store)
  promoter_store: PromoterStores[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Store;
