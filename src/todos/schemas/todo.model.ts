import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';
import { User } from 'src/users/schemas/user.model';
import { UUIDV4 } from 'sequelize';

@Table
export class Todo extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column
  title: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isDone: boolean;

  @ForeignKey(() => User)
  @Column({ type: DataType.UUID, allowNull: false })
  userId: string;

  @BelongsTo(() => User)
  user: User;
}
