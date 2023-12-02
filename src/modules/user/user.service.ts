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

  async findAll() {
    return await this.usersRepository.find()
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
