import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HasPermissionDecorator } from '../permission/decorators';
import { ROUTE_RESOURCE } from '../permission/enums';
import { PermissionGuard } from '../permission/guards';
import { UserService } from './user.service';
import { CurrentUser } from 'src/shared/decorators';
import { UserEntity } from './entity/user.entity';

@ApiTags('User')
@Controller('user')
export class UserController {

  constructor(private userService: UserService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @HasPermissionDecorator(ROUTE_RESOURCE.USERS)
  @Get()
  async findAll() {
    return await this.userService.findAll()
  }

    @Get('areas')
async findAllAreas() {
    return await this.userService.findAllAreas()
  }

  @UseGuards(AuthGuard('jwt'), PermissionGuard)
  @Post ('create')
  async createUser(@Body() userData: any,@CurrentUser() userRe:UserEntity) {
    return await this.userService.createUser(userData,userRe ) 
  }


}
