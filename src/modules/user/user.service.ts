import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { AreaEntity } from './entity/area.entity';

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
}
