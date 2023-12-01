import { PeopleService } from './people.service';
import { PeopleController } from './people.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeopleEntity } from './entity/people.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PeopleEntity]),
],
  controllers: [PeopleController],
  providers: [PeopleService],
})
export class PeopleModule {}
