import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDTO {

  @ApiProperty()
  @IsNotEmpty({message: 'Email is required.'})
  @IsEmail({}, {message: 'Email must be valid.'})
  email: string

  @ApiProperty()
  @MinLength(8, { message: 'Password must be longer than or equal to 8 characters' })
  @IsNotEmpty({message: 'Password is required.'})
  password: string

  @IsNotEmpty({message: 'name is required.'})
  name: string
  @IsNotEmpty({message: 'last_name is required.'})
  last_name: string
  @IsNotEmpty({message: 'role_id is required.'})
  role_id: number

  @IsNotEmpty({message: 'area_id is required.'})
  area_id: number
}