import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { GetClientDto } from './dto/get-client.tro';

@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get('all')
  async getAllClients() {
    return this.clientsService.getAllClients();
  }

  @Get(':id')
  async getClientById(clientId: GetClientDto) {
    return this.clientsService.getClientById(clientId.clientId);
  }

  @Post('create')
  async createClient(data: any) {
    return this.clientsService.createClient(data);
  }

  @Patch('')
  async updateClient() {
    return this.clientsService.updateClient();
  }

  @Delete()
  async deleteClient() {
    return this.clientsService.deleteClient();
  }
}
