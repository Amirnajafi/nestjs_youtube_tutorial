import { Column, Entity, IsNull, PrimaryGeneratedColumn } from 'typeorm';

@Entity('codes')
export default class Codes {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false })
  email: string;
  @Column({ nullable: false })
  code: number;
  @Column({ nullable: true, default: false })
  is_used: boolean;
}
