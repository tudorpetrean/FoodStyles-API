import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import ToDo from './toDo.entity';

export class ToDosService {
  constructor(
    @InjectRepository(ToDo)
    private ToDosRepository: Repository<ToDo>,
  ) {}

  async getAllToDos() {
    const toDos = await this.ToDosRepository.find({
      order: {
        createdAt: 'ASC',
      },
    });
    return toDos;
  }

  async updateCompletedToDo(id: number) {
    const toDo = await this.ToDosRepository.findOne({
      where: {
        id: id,
      },
    });
    if (toDo) {
      toDo.completed = !toDo.completed;
      await this.ToDosRepository.save(toDo);
      const toDos = await this.ToDosRepository.find({
        order: {
          createdAt: 'ASC',
        },
      });
      return toDos;
    }
    throw new NotFoundException('Could not find the ToDo');
  }

  async deleteToDo(id: number) {
    const toDo = await this.ToDosRepository.findOne({
      where: {
        id: id,
      },
    });
    if (toDo) {
      await this.ToDosRepository.remove(toDo);
      const toDos = await this.ToDosRepository.find({
        order: {
          createdAt: 'ASC',
        },
      });
      return toDos;
    }
    throw new NotFoundException('Could not find the ToDo');
  }

  async createToDo(content: string) {
    const newToDo = await this.ToDosRepository.create({
      content,
      completed: false,
    });
    await this.ToDosRepository.save(newToDo);
    const toDos = await this.ToDosRepository.find({
      order: {
        createdAt: 'ASC',
      },
    });
    return toDos;
  }
}
