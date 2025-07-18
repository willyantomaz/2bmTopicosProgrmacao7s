import { IsEmail, IsString, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../entity/users.entity';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password: string;

  @IsEnum(UserRole, { message: 'O papel deve ser "user" ou "admin"' })
  role: UserRole;
}
