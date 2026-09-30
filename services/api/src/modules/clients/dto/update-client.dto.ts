import { Optional } from '@nestjs/common';
import { IsString, MinLength } from 'class-validator';

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

  @IsString()
  @MinLength(2)
  organizationId?: string;
}
