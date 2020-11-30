import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import Role from '@modules/roles/infra/typeorm/entities/Role';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  active: boolean;

  @Column()
  accepted_terms: boolean;

  @Column()
  activated_code: boolean;

  @Column()
  first_access: boolean;

  @Column()
  photo?: string;

  @Column('uuid')
  role_id: string;

  @Column('uuid')
  customer_id: string;

  @ManyToOne(() => Customer, customer => customer.users)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @CreateDateColumn()
  @Exclude()
  created_at: Date;

  @UpdateDateColumn()
  @Exclude()
  updated_at: Date;
}

export default User;
