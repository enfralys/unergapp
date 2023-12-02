/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { PeopleEntity } from './entity/people.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entity/user.entity';
export class CreationPeopleObject {
  name: string;
  last_name: string;
  identification: string;
  owner: UserEntity;
}
@Injectable()
export class PeopleService {

    constructor(
        @InjectRepository(PeopleEntity) private peopleRepository: Repository<PeopleEntity>
      ) {}

    async create(peopleData: Partial<PeopleEntity>, user:UserEntity): Promise<PeopleEntity> {
        peopleData.owner = user;
        const newPeople = this.peopleRepository.create(peopleData);
        const response = await this.peopleRepository.save(newPeople);

        
        return response;
        
      }
    
      async findAll(user:UserEntity): Promise<PeopleEntity[]> {
        return await this.peopleRepository.find({where:{owner:user}});
      }
      
    
      async findOne(id: string): Promise<PeopleEntity | undefined> {
        return await this.peopleRepository.findOne(id);
      }
    
      async update(id: string, updateData: Partial<PeopleEntity>): Promise<PeopleEntity | undefined> {
        await this.peopleRepository.update(id, updateData);
        return await this.peopleRepository.findOne(id);
      }
    
      async remove(id: string): Promise<boolean> {
        const result = await this.peopleRepository.delete(id);
        return result.affected > 0;
      }


      




    }




