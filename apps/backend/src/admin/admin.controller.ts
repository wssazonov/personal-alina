import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AdminService } from './admin.service';
import {
    CreateBenefitDto,
    CreateDirectionDto,
    CreateReviewDto,
    UpdateAboutDto,
    UpdateBenefitDto,
    UpdateDirectionDto,
    UpdateReviewDto,
} from './dto/content.dto';

@UseGuards(JwtAuthGuard)
@Controller('admin')
export class AdminController {
    public constructor(private readonly admin: AdminService) {}

    @Get('about')
    public getAbout() {
        return this.admin.getAbout();
    }

    @Put('about')
    public updateAbout(@Body() dto: UpdateAboutDto) {
        return this.admin.updateAbout(dto);
    }

    @Get('benefits')
    public getBenefits() {
        return this.admin.getBenefits();
    }

    @Post('benefits')
    public createBenefit(@Body() dto: CreateBenefitDto) {
        return this.admin.createBenefit(dto);
    }

    @Put('benefits/:id')
    public updateBenefit(@Param('id') id: string, @Body() dto: UpdateBenefitDto) {
        return this.admin.updateBenefit(id, dto);
    }

    @Delete('benefits/:id')
    public deleteBenefit(@Param('id') id: string) {
        return this.admin.deleteBenefit(id);
    }

    @Get('directions')
    public getDirections() {
        return this.admin.getDirections();
    }

    @Post('directions')
    public createDirection(@Body() dto: CreateDirectionDto) {
        return this.admin.createDirection(dto);
    }

    @Put('directions/:id')
    public updateDirection(
        @Param('id') id: string,
        @Body() dto: UpdateDirectionDto,
    ) {
        return this.admin.updateDirection(id, dto);
    }

    @Delete('directions/:id')
    public deleteDirection(@Param('id') id: string) {
        return this.admin.deleteDirection(id);
    }

    @Get('reviews')
    public getReviews() {
        return this.admin.getReviews();
    }

    @Post('reviews')
    public createReview(@Body() dto: CreateReviewDto) {
        return this.admin.createReview(dto);
    }

    @Put('reviews/:id')
    public updateReview(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
        return this.admin.updateReview(id, dto);
    }

    @Delete('reviews/:id')
    public deleteReview(@Param('id') id: string) {
        return this.admin.deleteReview(id);
    }
}
