import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './schemas/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(email: string, name: string, password: string) {
    return await this.userModel.create({ email, password, name });
  }

  async findOneByEmailAndUserId(email: string, id: string) {
    return this.userModel.findAll({
      where: { email: email, userId: id },
    });
  }
  async findAll() {
    return this.userModel.findAndCountAll();
  }
  async findOneByEmail(email: string) {
    return await this.userModel.findOne({
      where: {
        email,
      },
    });
  }
}
