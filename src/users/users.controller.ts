import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UsersService } from './users.service';

@Controller('api/v1/users')
export class UsersController {
    constructor(
        private readonly userService:UsersService
    ) {}
    @Get()
    async index() {
        return await this.userService.find();
    }
    
    @Post()
    async store(@Body() body:CreateUserDto) {
        return await this.userService.create(body)
    }

    @Get(':id')
    async show(@Param('id', new ParseUUIDPipe()) id:string) {
        return await this.userService.findOneBy(id)
    }

    @Put(':id')
    async update(@Param('id', new ParseUUIDPipe()) id:string, @Body() body:UpdateUserDto) {
        return await this.userService.update(id, body)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id', new ParseUUIDPipe()) id:string) {
        return await this.userService.delete(id)
    }

    @Post(':email')
    async newPassword(@Param('email') email:string) {
        return await this.userService.forgoPassword(email)
    }
}
