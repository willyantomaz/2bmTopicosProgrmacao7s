import {
  IsString,
  IsOptional,
  MinLength,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../users.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
  password?: string;

  @IsOptional()
  @IsEnum(UserRole, { message: 'O papel deve ser "user" ou "admin"' })
  role?: UserRole;
}
