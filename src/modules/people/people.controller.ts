/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PeopleEntity } from './entity/people.entity';
import { PeopleService } from './people.service';
import { CurrentUser } from 'src/shared/decorators';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from '../user/entity/user.entity';
import { CreatePeopleDto } from './dto/people.dto';


@ApiTags('People')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @ApiOperation({ summary: 'Crear una nueva persona' })
  @ApiBody({ type: CreatePeopleDto })
  @ApiResponse({ status: 201, description: 'La persona ha sido creada satisfactoriamente.' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() peopleData: Partial<PeopleEntity>,@CurrentUser() user:UserEntity): Promise<PeopleEntity> {
    return await this.peopleService.create(peopleData,user);
  }

  @ApiOperation({ summary: 'Obtener todas las personas' })
  @ApiResponse({ status: 200, description: 'Devuelve todas las personas.' })
  @UseGuards(AuthGuard('jwt'))

  @Get()
  
  async findAll(@CurrentUser()user: UserEntity): Promise<PeopleEntity[]> {
    return await this.peopleService.findAll(user);
  }

  @ApiOperation({ summary: 'Obtener una persona por su ID' })
  @ApiResponse({ status: 200, description: 'Devuelve la persona solicitada por su ID.' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PeopleEntity | undefined> {
    const person = await this.peopleService.findOne(id);
    if (!person) {
      throw new NotFoundException('Persona no encontrada');
    }
    return person;
  }

  @ApiOperation({ summary: 'Actualizar una persona por su ID' })
  @ApiResponse({ status: 200, description: 'La persona ha sido actualizada satisfactoriamente.' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada.' })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<PeopleEntity>): Promise<PeopleEntity | undefined> {
    const updatedPerson = await this.peopleService.update(id, updateData);
    if (!updatedPerson) {
      throw new NotFoundException('Persona no encontrada');
    }
    return updatedPerson;
  }

  @ApiOperation({ summary: 'Eliminar una persona por su ID' })
  @ApiResponse({ status: 200, description: 'La persona ha sido eliminada satisfactoriamente.' })
  @ApiResponse({ status: 404, description: 'Persona no encontrada.' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    const deleted = await this.peopleService.remove(id);
    if (!deleted) {
      throw new NotFoundException('Persona no encontrada');
    }
    return { success: true };
  }
}