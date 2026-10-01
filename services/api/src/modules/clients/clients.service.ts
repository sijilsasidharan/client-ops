import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateClientDto } from './dto/update-client.dto';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async getAllClients() {
    return this.prisma.client.findMany();
  }

  async getClientById(id: string, organizationId: string) {
    return this.prisma.client.findUnique({
      where: { id, organizationId },
    });
  }

  async createClient(data: CreateClientDto, organizationId: string) {
    return this.prisma.client.create({ data: { ...data, organizationId } });
  }

  async updateClient(
    id: string,
    organizationId: string,
    data: UpdateClientDto,
  ) {
    return this.prisma.client.update({
      where: { id, organizationId },
      data,
    });
  }

  async deleteClient(id: string, organizationId: string) {
    return this.prisma.client.delete({
      where: { id, organizationId },
    });
  }
}
