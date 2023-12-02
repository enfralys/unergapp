import { classToPlain, Exclude } from "class-transformer";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserAuthSessionEntity } from "../../auth/entity/user_auth_session.entity";
import { RoleEntity } from "../../role/entity/role.entity";
import { PeopleEntity } from "src/modules/people/entity/people.entity";
import { AreaEntity } from "../entity/area.entity";


@Entity('users')
export class UserEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({
    type: 'text',
    unique: true
  })
  email: string

  //name and last name
  @Column({
    type: 'text',
    nullable: true
  })
  name: string

  @Column({
    type: 'text',
    nullable: true

  })
  last_name: string


  @Exclude()
  @Column({
    type: 'text'
  })
  password: string

  @Exclude()
  @Column({
    type: 'integer',
    nullable: true
  })
  role_id: number
  
  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @OneToMany(() => UserAuthSessionEntity, session => session.user)
  auth_sessions: UserAuthSessionEntity[]

  @ManyToOne(() => AreaEntity, area => area.users)
  @JoinColumn({name: 'area_id', referencedColumnName: 'id'})
  area: AreaEntity;

  @ManyToOne(() => RoleEntity, role => role.users)
  @JoinColumn({name: 'role_id', referencedColumnName: 'id'})
  role: RoleEntity

  @OneToMany(() => PeopleEntity, subordinado => subordinado.owner)
  subordinados: PeopleEntity[];

//area_id
  @Column({
    type: 'integer',
    nullable: true
  })
  area_id: number;
    


  @Column({
    type: 'text',
    nullable: true
  })
  create_by: string;



  toJSON() {
    return classToPlain(this);
  }

}