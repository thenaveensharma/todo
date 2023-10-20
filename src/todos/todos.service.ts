import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Todo } from './schemas/todo.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo) private todoModel: typeof Todo) {}

  async create(userId: string, title: string) {
    try {
      if (!userId || !title) {
        throw new BadRequestException('userId and title are required.');
      }
      return await this.todoModel.create({ userId, title });
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(userId: string) {
    try {
      return await this.todoModel.findAndCountAll({
        where: {
          userId,
        },
        order: ['createdAt'],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: string) {
    try {
      return await this.todoModel.findOne({ where: { id } });
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: string, user: any, body: Todo) {
    const todo = await this.findOne(id);
    if (!todo) {
      throw new BadRequestException('Todo does not exist');
    }
    if (todo.dataValues.userId !== user.id) {
      throw new UnauthorizedException('No todo is available');
    }
    let { title, isDone } = body;

    if (!title) {
      title = todo.dataValues.title;
    }
    if (!isDone) {
      isDone = todo.dataValues.isDone;
    }
    await this.todoModel.update(
      { title, isDone },
      {
        where: {
          id,
        },
      },
    );
    return await this.findOne(id);
  }

  async remove(id: string, user: any) {
    try {
      const todo = await this.findOne(id);
      if (!todo) {
        throw new BadRequestException('Todo does not exist');
      }
      if (todo.dataValues.userId !== user.id) {
        throw new UnauthorizedException('No todo is available');
      }
      todo.destroy();
      return {
        message: 'Todo deleted successfully',
      };
    } catch (error) {
      console.log(error);
    }
  }
}
