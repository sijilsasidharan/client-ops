import { IsString } from 'class-validator';

export class StartTimerDto {
  @IsString()
  projectId: string;
}
