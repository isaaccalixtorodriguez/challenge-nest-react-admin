import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FindOptionsWhere, ILike } from 'typeorm';

import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserQuery } from './user.query';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class UserService {
  async save(createUserDto: CreateUserDto): Promise<User> {
    const userByUsername = await this.findByUsername(createUserDto.username);

    if (userByUsername) {
      throw new HttpException(
        `User with username ${createUserDto.username} is already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = User.create({ ...createUserDto, password: hashedPassword });

    return await user.save();
  }

  async findAll(userQuery: UserQuery): Promise<User[]> {
    const where: FindOptionsWhere<User> = {};

    Object.keys(userQuery).forEach((key) => {
        if (key === 'role') {
            where.role = userQuery.role as Role;
        } else {
            where[key] = ILike(`%${userQuery[key]}%`);
        }
    });

    return User.find({
        where,
        order: {
            firstName: 'ASC',
            lastName: 'ASC',
        },
    });
  }

  async findById(id: string): Promise<User> {
    const user = await User.findOne({where: {id}});

    if (!user) {
      throw new HttpException(
        `Could not find user with matching id ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    return User.findOne({ where: { username } });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const currentUser = await this.findById(id);

    /* If username is same as before, delete it from the dto */
    if (currentUser.username === updateUserDto.username) {
      delete updateUserDto.username;
    }

    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    if (updateUserDto.username) {
      if (await this.findByUsername(updateUserDto.username)) {
        throw new HttpException(
          `User with username ${updateUserDto.username} is already exists`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return User.create({ id, ...updateUserDto }).save();
  }

  async delete(id: string): Promise<string> {
    const userById = await this.findById(id);
    await User.delete({id: userById.id});
    return id;
  }

  async count(): Promise<number> {
    return await User.count();
  }

  /* Hash the refresh token and save it to the database */
  async setRefreshToken(id: string, refreshToken: string): Promise<void> {
    const user = await this.findById(id);
    await User.update(user.id, {
      refreshToken: refreshToken ? await bcrypt.hash(refreshToken, 10) : null,
    });
  }
}
