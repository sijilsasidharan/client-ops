import { Optional } from '@nestjs/common';
import { IsNumber, IsString, MinLength } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @MinLength(2)
  name: string;

  @Optional()
  @IsString()
  contactInfo: string;

  @Optional()
  @IsString()
  notes: string;

  @IsNumber()
  hourlyRate: number;
}
