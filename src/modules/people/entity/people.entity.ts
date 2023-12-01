import { classToPlain, Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "src/modules/user/entity/user.entity";

@Entity('people')
export class PeopleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'text',
    unique: true
  })
  name: string

  @Exclude()
  @Column({
    type: 'text'
  })
  last_name: string

  //cedula
  @Column({
    type: 'text',
  })
  identification: string

    //id del dueño del people
  @ManyToOne(() => UserEntity, user => user.id)
  owner: UserEntity
    
  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date



  toJSON() {
    return classToPlain(this);
  }

}