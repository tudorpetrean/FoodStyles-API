import { Body, Controller, Get, Param, Post, Delete } from '@nestjs/common';
import ToDo from './toDo.entity';
import { ToDosService } from './toDos.service';

// deleteTodo(id);

@Controller('todos')
export class ToDosController {
  constructor(private readonly ToDosService: ToDosService) {}

  @Get()
  async getAllToDos(): Promise<ToDo[]> {
    const ToDos = await this.ToDosService.getAllToDos();
    return ToDos;
  }

  @Delete(':id')
  async deleteToDo(@Param('id') id: string): Promise<ToDo[]> {
    const toDos = await this.ToDosService.deleteToDo(Number(id));
    return toDos;
  }

  @Post(':id')
  async updateCompletedToDo(@Param('id') id: string): Promise<ToDo[]> {
    const toDo = await this.ToDosService.updateCompletedToDo(Number(id));
    return toDo;
  }

  @Post()
  async createToDo(@Body('content') content: string) {
    const newToDo = await this.ToDosService.createToDo(content);
    return newToDo;
  }
}
