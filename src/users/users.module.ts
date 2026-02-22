import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { Announcement } from '../announcement.entity'; // Idagdag itong import

@Module({
  // Isama ang Announcement sa forFeature para "makilala" ito ng UsersService
  imports: [TypeOrmModule.forFeature([Users, Announcement])], 
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}


