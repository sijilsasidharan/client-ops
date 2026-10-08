// dto/update-time-entry.dto.ts
import { IsOptional, IsString, IsDateString } from 'class-validator';
export class UpdateTimeEntryDto {
  @IsOptional() @IsDateString() startTime?: string;
  @IsOptional() @IsDateString() endTime?: string;
  @IsOptional() @IsString() description?: string;
}
