import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateInvoiceDto {
  @IsString()
  @IsNotEmpty()
  clientId: string;
}
