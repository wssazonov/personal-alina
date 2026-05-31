import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    public login!: string;

    @IsString()
    @IsNotEmpty()
    public password!: string;
}
