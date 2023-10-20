import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { Todo } from './schemas/todo.model';
import { AuthGuard } from '../auth/auth.guard';
@UseGuards(AuthGuard)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoData: Todo) {
    const { userId, title } = createTodoData;
    return this.todosService.create(userId, title);
  }

  @Get('all/:userId')
  findAll(@Param('userId') userId: string) {
    if (!userId) {
      throw new BadRequestException('userId is required.');
    }
    return this.todosService.findAll(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Request() req, @Body() updateTodoDto: Todo) {
    const user = req.user;
    return this.todosService.update(id, user, updateTodoDto);
  }

  @Delete(':todoId')
  remove(@Param('todoId') todoId: string, @Request() req) {
    const user = req.user;
    return this.todosService.remove(todoId, user);
  }
}
