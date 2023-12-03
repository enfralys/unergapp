import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { AreaEntity } from './entity/area.entity';
import { hashPassword } from 'src/shared/utils';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>,
    @InjectRepository(AreaEntity) private areaRepository: Repository<AreaEntity>
  ) {}

  async findAll(user: UserEntity) {
   //querybuilder que haga join con la misma tabla para traer los usuarios creador por el que consulta
    return await this.usersRepository.find({
      where: { create_by: user.id },
      relations: ['role','area','subordinados']
    })
  }

  async findAllAdmin(user: UserEntity) {
    //querybuilder que haga join con la misma tabla para traer los usuarios creador por el que consulta
    if (user.role.id != 1) 
    {
      throw new HttpException("No tiene permisos para realizar esta acción.", HttpStatus.BAD_REQUEST)
      
    }
     //querybuilder que haga join con la misma tabla para traer los usuarios creador por el que consulta
    //return await this.usersRepository.find

    const usersRole4 = await this.usersRepository.find({
      where: { role_id: 4 },
      relations: ['role','area']
    })

    //usuarios que pertencecan a los usuarios del rol 4
 

    //unir en una respuesta
    const userResponse = []
    //agregar los usuarios del rol 3 al mismo json de cada usuario del rol 4
  for (const iterator of usersRole4) {
    const usersOfUser = await this.usersRepository.find({
      where: { create_by: iterator.id },
      relations: ['role','area','subordinados']
    })

    userResponse.push({...iterator,users:usersOfUser})
  }

    return userResponse
   }


  async findAllAreas() {
    return await this.areaRepository.find()
  }

  async createUser(userData: any, userRe:UserEntity): Promise<UserEntity> {
    let user = await this.usersRepository.findOne({
      where: { email: userData.email }
    })

    let userFromToken = await this.usersRepository.findOne({
      where: { id: userRe.id },
      relations: ['role','area']
    })

    if (user) {
      throw new HttpException("Email already used.", HttpStatus.BAD_REQUEST)
    }

    // hash password 
    let hashedPassword = await hashPassword('UNERG2021')
 
    // create user
    let userTocreate = new UserEntity()
    userTocreate.email = userData.email
    userTocreate.password = hashedPassword
    userTocreate.name = userData.name
    userTocreate.last_name = userData.last_name 
    userTocreate.role_id = userData.role_id
    
    

      userTocreate.create_by = userFromToken.id;
    

    // Establecer el área correspondiente
    
      userTocreate.area_id = userFromToken.area.id;
    
    
    return await this.usersRepository.save(userTocreate);
  }


}
