import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('area')
export class AreaEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // Otras propiedades de la entidad AreaEntity si es necesario
}