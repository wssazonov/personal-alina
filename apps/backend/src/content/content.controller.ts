import { Controller, Get } from '@nestjs/common';
import { ContentService } from './content.service';

@Controller('content')
export class ContentController {
    public constructor(private readonly content: ContentService) {}

    @Get('public')
    public getPublicContent() {
        return this.content.getPublicContent();
    }
}
