import { IsString, MinLength } from 'class-validator';

export class GetClientDto {
  @IsString()
  @MinLength(2)
  clientId: string;
}
