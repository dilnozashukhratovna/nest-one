import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-auth.dto';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/models/users.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async registration(userDto: CreateUserDto) {
    const condidate = await this.userService.getUserByEmail(userDto.email);

    if (condidate) {
      throw new HttpException('Bunday user mavjud', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 7);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashedPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException("Email yoki parol noto'g'ri");
    }
    const validPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (validPassword) {
      return user;
    }
    throw new UnauthorizedException("Email yoki parol noto'g'ri");
  }

    async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      // throw new HttpException(
      //   "Foydalanuvchi topilmadi",
      //   HttpStatus.NOT_FOUND,
      // );
      throw new NotFoundException('Foydalanuvchi topilmadi');
    }
    return this.generateToken(user);
  }
}
