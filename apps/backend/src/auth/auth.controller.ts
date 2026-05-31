import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    public constructor(private readonly auth: AuthService) {}

    @Post('login')
    public login(@Body() dto: LoginDto): Promise<{ accessToken: string }> {
        return this.auth.login(dto);
    }
}
