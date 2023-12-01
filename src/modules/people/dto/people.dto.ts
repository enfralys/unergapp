import { ApiProperty } from "@nestjsx/crud/lib/crud";

export class CreatePeopleDto {
    @ApiProperty({ description: 'Nombre', type: 'string' })
    name: string;
  
    @ApiProperty({ description: 'Apellido', type: 'string' })
    last_name: string;
  
    @ApiProperty({ description: 'Cédula', type: 'string' })
    identification: string;
  
    @ApiProperty({ description: 'ID del dueño', type: 'string' })
    owner: string; // Asumiendo que el ID del usuario es un string
    
    // Opcional: agregar las propiedades created_at y updated_at si se necesitan en la creación
  }