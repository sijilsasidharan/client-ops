import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateManualEntryDto {
  @IsString()
  projectId: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}
