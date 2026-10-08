import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GenerateInvoiceDto } from './dto/generate-invoice.dto';

import PDFDocument from 'pdfkit';
import { Response } from 'express';

export class InvoiceService {
  constructor(private prismaService: PrismaService) {}

  async generateInvoice(dto: GenerateInvoiceDto, orgainizationId: string) {
    const client = await this.prismaService.client.findUnique({
      where: { id: dto.clientId },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    if (!client.hourlyRate) {
      throw new BadRequestException('Client does not have an hourly rate set');
    }

    const projects = await this.prismaService.project.findMany({
      where: { clientId: client.id },
    });
    const projectIds = projects.map((project) => project.id);

    const unbilledTimeEntries = await this.prismaService.timeEntry.findMany({
      where: {
        projectId: { in: projectIds },
        organizationId: orgainizationId,
        endTime: { not: null },
      },
    });

    if (unbilledTimeEntries.length === 0) {
      throw new BadRequestException(
        'No unbilled time entries found for this client',
      );
    }

    const rate = Number(client.hourlyRate);
    const lineItemsData = unbilledTimeEntries.map((entry) => {
      const startTime = new Date(entry.startTime);
      const endTime = new Date(entry.endTime!);
      const hours =
        (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
      const amount = hours * rate;
      return {
        timeEntryId: entry.id,
        description: entry.description ?? 'Time Entry',
        hours,
        rate,
        amount,
      };
    });

    const totalAmount = lineItemsData.reduce(
      (sum, item) => sum + item.amount,
      0,
    );

    return this.prismaService.$transaction(async (tx) => {
      tx.invoice.create({
        data: {
          clientId: client.id,
          organizationId: orgainizationId,
          totalAmount,
          lineItems: { create: lineItemsData },
        },
      });
    });
  }

  async getAllInvoices(clientId: string, organizationId: string) {
    return this.prismaService.invoice.findMany({
      where: { organizationId, clientId },
      include: { lineItems: true },
      orderBy: { issuedAt: 'desc' },
    });
  }

  async getInvoiceById(invoiceId: string, organizationId: string) {
    return this.prismaService.invoice.findUnique({
      where: { id: invoiceId, organizationId },
      include: { lineItems: true, client: true },
    });
  }

  async markAsPaid(id: string, organizationId: string) {
    const result = await this.prismaService.invoice.updateMany({
      where: { id, organizationId, status: 'DRAFT' },
      data: { status: 'PAID' },
    });
    if (result.count === 0)
      throw new NotFoundException('Invoice not found or already paid');
    return this.getInvoiceById(id, organizationId);
  }

  async generatePdf(id: string, organizationId: string, res: Response) {
    const invoice = await this.getInvoiceById(id, organizationId);
    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }
    const doc = new PDFDocument({ margin: 50 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=invoice-${invoice.id}.pdf`,
    );
    doc.pipe(res);

    doc.fontSize(20).text('Invoice', { align: 'center' }).moveDown();
    doc.fontSize(12).text(`Client: ${invoice.client.name}`);
    doc.text(`Status: ${invoice.status}`);
    doc.text(`Issued: ${invoice.issuedAt.toDateString()}`).moveDown();

    invoice.lineItems.forEach((item) => {
      doc.text(
        `${item.description} — ${item.hours}h @ $${item.rate}/h = $${item.amount}`,
      );
    });

    doc
      .moveDown()
      .fontSize(14)
      .text(`Total: $${invoice.totalAmount}`, { align: 'right' });
    doc.end();
  }
}
