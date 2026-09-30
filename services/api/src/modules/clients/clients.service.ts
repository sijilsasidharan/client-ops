import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async getAllClients() {}

  async getClientById(id: string) {}

  async createClient(data: any) {}

  async updateClient(id: string, data: any) {}

  async deleteClient(id: string) {}
}
