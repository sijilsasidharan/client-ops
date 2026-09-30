import { IsString, MinLength } from 'class-validator';

export class DeleteClientDto {
  @IsString()
  @MinLength(2)
  clientId: string;
}
