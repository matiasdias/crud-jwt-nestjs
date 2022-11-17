import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {hashSync} from 'bcrypt' 

@Entity('usuario')
export class UsersEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({name: 'first_name'})
  firstName: string;

  @Column({name: 'last_name'})
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({name:'created_at'})
  created:string

  @DeleteDateColumn({name: 'deleted_at'})
  deleteAt:string;

  @BeforeInsert()
  hashPassoword() {
    this.password = hashSync(this.password, 10)
  }
}
