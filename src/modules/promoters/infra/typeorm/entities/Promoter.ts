import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import PromoterStores from '@modules/promoters/infra/typeorm/entities/PromoterStores';

@Entity('promoters')
class Promoter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  profile_type: string;

  @Column()
  phone: string;

  @Column()
  photo: string;

  @Column()
  active: boolean;

  @Column('double precision')
  wallet: number;

  @OneToMany(() => PromoterStores, promoterStores => promoterStores.promoter, {
    cascade: true,
  })
  promoter_store: PromoterStores[];

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('uuid')
  address_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Promoter;
