import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { QueryUserDto } from './dtos/query-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await this.hashPassword(createUserDto.password);
    createUserDto.password = hashedPassword;

    return await this.usersRepository.save(createUserDto);
  }

  async findOne(queryUserDto: Partial<QueryUserDto>): Promise<User> {
    return await this.usersRepository.findOne({ where: queryUserDto });
  }

  async findById(id: number): Promise<User> {
    return await this.findOne({ id });
  }

  async update(
    id: number,
    updateUserDto: Partial<UpdateUserDto>,
  ): Promise<boolean> {
    const result = await this.usersRepository.update(id, updateUserDto);

    return !!result.affected;
  }

  async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }
}
