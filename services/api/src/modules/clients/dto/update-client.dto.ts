import { Optional } from '@nestjs/common';
import { IsNumber, IsString, MinLength } from 'class-validator';

export class UpdateClientDto {
  @IsString()
  @MinLength(2)
  name?: string;

  @Optional()
  @IsString()
  contactInfo?: string;

  @Optional()
  @IsString()
  notes?: string;

  @Optional()
  @IsNumber()
  hourlyRate?: number;
}
