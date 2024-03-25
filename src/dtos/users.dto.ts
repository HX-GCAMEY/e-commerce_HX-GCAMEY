import {
  Matches,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  IsEmpty,
} from 'class-validator';
import { PickType } from '@nestjs/swagger';
import { MatchPassword } from '../decorators/matchPassword.decorator';
export class CreateUserDto {
  /**
   * Debe ser un string con al menos 3 caracteres y no puede estar vacío
   * @example 'Bartolomiau'
   */

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  /**
   * Debe ser un email válido y no puede estar vacío
   * @example 'bartolomiau@gmail.com'
   */

  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Debe ser un string con al menos una letra mayúscula, una minúscula, un número y un caracter especial
   * @example 'Bartolomiau123!'
   */

  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.',
  })
  @MinLength(8)
  @MaxLength(15)
  password: string;

  /**
   * Debe ser un string con al menos una letra mayúscula, una minúscula, un número y un caracter especial
   * @example 'Bartolomiau123!'
   */

  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  /**
   * Debe ser un string con al menos 3 caracteres y no puede estar vacío
   * @example 'Calle Falsa 123'
   */

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  /**
   * Debe ser un número y no puede estar vacío
   * @example 123456789
   */

  @IsNotEmpty()
  @IsNumber()
  phone: number;

  /**
   * Debe ser un string con al menos 5 caracteres y no puede estar vacío
   * @example 'Mexico'
   */

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  /**
   * Debe ser un string con al menos 5 caracteres y no puede estar vacío
   * @example 'Mexico City'
   */

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  /**
   * Este campo NO debe ser llenado por el usuario
   * @example
   */

  @IsEmpty()
  isAdmin?: boolean;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  'password',
  'email',
]) {}
