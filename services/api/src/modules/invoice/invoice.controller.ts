import { Controller, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import { InvoiceService } from './invoice.service';
import { GenerateInvoiceDto } from './dto/generate-invoice.dto';
import { AuthGuard } from '../../auth/jwt-auth.guard';
import { CurrentUser } from '../../auth/current-user.decorator';
import type { AuthUser } from '../../auth/auth-user.interface';

@UseGuards(AuthGuard)
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  async generateInvoice(
    dto: GenerateInvoiceDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.invoiceService.generateInvoice(dto, user.organizationId);
  }

  @Get()
  async getAll(
    @Query('clientId') clientId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.invoiceService.getAllInvoices(clientId, user.organizationId);
  }

  @Get(':id')
  async getInvoice(@Query('id') id: string, @CurrentUser() user: AuthUser) {
    return this.invoiceService.getInvoiceById(id, user.organizationId);
  }

  @Post(':id/mark-as-paid')
  async markAsPaid(@Query('id') id: string, @CurrentUser() user: AuthUser) {
    return this.invoiceService.markAsPaid(id, user.organizationId);
  }

  @Get(':id/pdf')
  async generatePdf(
    @Query('id') id: string,
    @CurrentUser() user: AuthUser,
    @Res() res: Response,
  ) {
    return this.invoiceService.generatePdf(id, user.organizationId, res);
  }
}
