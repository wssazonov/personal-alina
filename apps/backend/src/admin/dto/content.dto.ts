import { Type } from 'class-transformer';
import {
    IsArray,
    IsBoolean,
    IsIn,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    ValidateIf,
    ValidateNested,
} from 'class-validator';

export const ICON_VALUES = [
    'target',
    'book',
    'document',
    'heart',
    'math',
    'code',
    'user',
    'calendar',
    'file',
    'star',
    'quote',
] as const;

class OrderedActiveDto {
    @IsInt()
    public order!: number;

    @IsBoolean()
    public isActive!: boolean;
}

export class AboutFactDto extends OrderedActiveDto {
    @IsOptional()
    @IsString()
    public id?: string;

    @IsIn(ICON_VALUES)
    public icon!: string;

    @IsString()
    @IsNotEmpty()
    public title!: string;

    @IsString()
    @IsNotEmpty()
    public text!: string;
}

export class UpdateAboutDto {
    @IsString()
    @IsNotEmpty()
    public title!: string;

    @IsString()
    @IsNotEmpty()
    public text!: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AboutFactDto)
    public facts!: AboutFactDto[];
}

export class CreateBenefitDto extends OrderedActiveDto {
    @IsIn(ICON_VALUES)
    public icon!: string;

    @IsString()
    @IsNotEmpty()
    public title!: string;

    @IsString()
    @IsNotEmpty()
    public text!: string;
}

export class UpdateBenefitDto {
    @IsOptional()
    @IsIn(ICON_VALUES)
    public icon?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public title?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public text?: string;

    @IsOptional()
    @IsInt()
    public order?: number;

    @IsOptional()
    @IsBoolean()
    public isActive?: boolean;
}

export class DirectionItemDto extends OrderedActiveDto {
    @IsOptional()
    @IsString()
    public id?: string;

    @IsString()
    @IsNotEmpty()
    public text!: string;
}

export class CreateDirectionDto extends OrderedActiveDto {
    @IsIn(ICON_VALUES)
    public icon!: string;

    @IsString()
    @IsNotEmpty()
    public title!: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DirectionItemDto)
    public items!: DirectionItemDto[];
}

export class UpdateDirectionDto {
    @IsOptional()
    @IsIn(ICON_VALUES)
    public icon?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public title?: string;

    @IsOptional()
    @IsInt()
    public order?: number;

    @IsOptional()
    @IsBoolean()
    public isActive?: boolean;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => DirectionItemDto)
    public items?: DirectionItemDto[];
}

export class CreateReviewDto extends OrderedActiveDto {
    @IsString()
    @IsNotEmpty()
    public text!: string;

    @IsString()
    @IsNotEmpty()
    public studentName!: string;

    @IsString()
    @IsNotEmpty()
    public studentClass!: string;

    @IsOptional()
    @ValidateIf((_, value: unknown) => value !== '')
    @IsUrl()
    public imageUrl?: string;

    @IsIn(ICON_VALUES)
    public icon!: string;
}

export class UpdateReviewDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public text?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public studentName?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    public studentClass?: string;

    @IsOptional()
    @ValidateIf((_, value: unknown) => value !== '')
    @IsUrl()
    public imageUrl?: string;

    @IsOptional()
    @IsIn(ICON_VALUES)
    public icon?: string;

    @IsOptional()
    @IsInt()
    public order?: number;

    @IsOptional()
    @IsBoolean()
    public isActive?: boolean;
}
