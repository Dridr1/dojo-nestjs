import { Injectable, Logger } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(AuthService.name);

  async create(createAuthDto: CreateAuthDto) {
    try {
      const name = createAuthDto.username;
      const password = createAuthDto.password;
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);
      const userDb = this.prisma.user;
      this.logger.log(`USUÁRIO COM NOME ${name} FOI CRIADO`);

      await userDb.create({data: {name, password: hashPassword}});
      return;
    } catch (error) {
      this.logger.error(error);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
