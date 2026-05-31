import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule);
    const config = app.get(ConfigService);
    const allowedOrigins = config
        .get<string>(
            'FRONTEND_URLS',
            config.get<string>('FRONTEND_URL', 'http://localhost:4200'),
        )
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);

    app.setGlobalPrefix('api');
    app.enableCors({
        origin: allowedOrigins,
        credentials: true,
    });
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    );

    await app.listen(config.get<number>('PORT', 3000));
}

void bootstrap();
