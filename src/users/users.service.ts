import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // Importe o decorador InjectRepository
import { Repository } from 'typeorm'; // Importe Repository
import * as bcrypt from 'bcryptjs';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) // Injeta o repositório da entidade User
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUserByEmail = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUserByEmail) {
      throw new BadRequestException('E-mail já cadastrado.');
    }

    const existingUserByUsername = await this.usersRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existingUserByUsername) {
      throw new BadRequestException('Nome de usuário já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.usersRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
      role: createUserDto.role,
    });

    const savedUser = await this.usersRepository.save(newUser);

    const { password, ...result } = savedUser;
    return result as User;
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.usersRepository.find();
    return users.map(({ password, ...user }) => user as Omit<User, 'password'>);
  }

  async findOne(id: number): Promise<Omit<User, 'password'>> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }
    const { password, ...result } = user;
    return result as Omit<User, 'password'>;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return (
      (await this.usersRepository.findOne({ where: { email } })) ?? undefined
    );
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const userToUpdate = await this.usersRepository.findOne({ where: { id } });
    if (!userToUpdate) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado.`);
    }

    if (updateUserDto.email && updateUserDto.email !== userToUpdate.email) {
      const existingUser = await this.usersRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException(
          'E-mail já cadastrado por outro usuário.',
        );
      }
    }

    if (
      updateUserDto.username &&
      updateUserDto.username !== userToUpdate.username
    ) {
      const existingUser = await this.usersRepository.findOne({
        where: { username: updateUserDto.username },
      });
      if (existingUser && existingUser.id !== id) {
        throw new BadRequestException(
          'Nome de usuário já cadastrado por outro usuário.',
        );
      }
    }

    this.usersRepository.merge(userToUpdate, updateUserDto);

    if (updateUserDto.password) {
      userToUpdate.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    const updatedUser = await this.usersRepository.save(userToUpdate);

    const { password, ...result } = updatedUser;
    return result as Omit<User, 'password'>;
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Usuário com ID ${id} não encontrado para exclusão.`,
      );
    }
  }
}
