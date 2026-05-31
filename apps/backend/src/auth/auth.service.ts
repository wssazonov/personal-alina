import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    public constructor(
        private readonly prisma: PrismaService,
        private readonly jwt: JwtService,
    ) {}

    public async login(dto: LoginDto): Promise<{ accessToken: string }> {
        const user = await this.prisma.user.findUnique({
            where: { login: dto.login },
        });

        if (!user || !(await compare(dto.password, user.passwordHash))) {
            throw new UnauthorizedException('Неверный логин или пароль.');
        }

        return {
            accessToken: await this.jwt.signAsync({
                sub: user.id,
                login: user.login,
            }),
        };
    }
}
