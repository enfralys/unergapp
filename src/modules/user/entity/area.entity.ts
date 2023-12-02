import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('area')
export class AreaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

@OneToMany(() => UserEntity, user => user.area)
users: UserEntity[];

  // Otras propiedades de la entidad AreaEntity si es necesario
}