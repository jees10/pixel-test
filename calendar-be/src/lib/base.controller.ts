import { BadRequestException, Body, Delete, Get, NotFoundException, Param, Post, Put, Query, ValidationPipe } from "@nestjs/common";
import { BaseService } from "./base.service";
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IEntity } from "src/common/interfaces/entity.interface";
import { tryParse } from "src/utils/object.util";
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";


export class BaseController<T extends IEntity> {
  entityName: string

  constructor(
    entityName: string,
    private entityService: BaseService<T>,
    private createDtoClass: new () => any,
    private updateDtoClass: new () => any,
  ) {
    this.entityName = entityName;
  }

  entityExists = async (id: number) => {
    const entity = await this.entityService.findOneById(id);
    if (!entity) {
      throw new NotFoundException(`${this.entityName} with ID ${id} not found`);
    }
    return entity
  }

  @Get()
  @UseGuards(
    AuthGuard('jwt')
  )
  findAll(
    @Query('filter') filter: string
  ) {
    const query = tryParse(filter)
    return this.entityService.findAll(query);
  }

  @Get('count')
  @UseGuards(
    AuthGuard('jwt')
  )
  count(
    @Query('filter') filter: string
  ) {
    const query = tryParse(filter);
    return this.entityService.count(query);
  }

  @Get(':id')
  @UseGuards(
    AuthGuard('jwt')
  )
  findOne(
    @Param('id') id: number
  ) {
    return this.entityExists(id);
  }


  @Post()
  @UseGuards(
    AuthGuard('jwt')
  )
  create(
    @Body() newEntity: T
  ) {
    const dtoInstance = plainToInstance(this.createDtoClass, newEntity);
    const errors = validateSync(dtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const messages = errors
        .map(err => Object.values(err.constraints || {}))
        .flat();
      throw new BadRequestException(messages);
    }
    return this.entityService.create(dtoInstance);
  }

  @Put(':id')
  @UseGuards(
    AuthGuard('jwt')
  )
  async update(
    @Param('id') id: number,
    @Body() entityToUpdate: Partial<T>
  ): Promise<T> {
    const dtoInstance = plainToInstance(this.createDtoClass, entityToUpdate);
    const errors = validateSync(dtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const messages = errors
        .map(err => Object.values(err.constraints || {}))
        .flat();
      throw new BadRequestException(messages);
    }
    this.entityExists(id);
    return this.entityService.update(id, dtoInstance);
  }

  @Delete(':id')
  @UseGuards(
    AuthGuard('jwt')
  )
  async remove(
    @Param('id') id: number
  ): Promise<void | boolean> {
    this.entityExists(id);
    return this.entityService.delete(id);
  }
}