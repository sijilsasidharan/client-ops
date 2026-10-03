// create-project.dto.ts
import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { ProjectStatus } from '../../../generated/prisma';

export class CreateProjectDto {
  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  clientId: string;

  @IsOptional()
  @IsEnum(ProjectStatus)
  status?: ProjectStatus;

  @IsOptional()
  @IsNumber()
  budget?: number;
}
