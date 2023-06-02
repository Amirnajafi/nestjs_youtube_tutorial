import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Users from './user.entity';

@Entity('products')
export default class Products {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  title: string;
  @Column({ nullable: true })
  description: string;
  @Column({ nullable: true })
  price: number;

  @Column('int', { nullable: true })
  @ManyToOne(() => Users, (user) => user.id)
  @JoinColumn({ name: 'user' })
  user: Users;
}
