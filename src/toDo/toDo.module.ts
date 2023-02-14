import { Module } from '@nestjs/common';
import { ToDosController } from './toDos.controller';
import { ToDosService } from './toDos.service';
import ToDo from './toDo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ToDo])],
  controllers: [ToDosController],
  providers: [ToDosService],
})
export class ToDosModule {}
