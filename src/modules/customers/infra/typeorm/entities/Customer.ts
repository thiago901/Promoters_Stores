import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('customers')
class Customer {
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
  payment_day: string;

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

  @OneToMany(() => User, user => user.customer)
  users: User[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Customer;
