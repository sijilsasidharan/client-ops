import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { CurrentUser } from '../../auth/current-user.decorator';
import * as authUserInterface from '../../auth/auth-user.interface';
import { AuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(AuthGuard)
@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get()
  async getAllClients(@CurrentUser() user: authUserInterface.AuthUser) {
    return this.clientsService.getAllClients();
  }

  @Get(':id')
  async getClientById(
    @Param('id') id: string,
    @CurrentUser() user: authUserInterface.AuthUser,
  ) {
    return this.clientsService.getClientById(id, user.organizationId);
  }

  @Post('create')
  async createClient(
    @Body() data: CreateClientDto,
    @CurrentUser() user: authUserInterface.AuthUser,
  ) {
    return this.clientsService.createClient(data, user.organizationId);
  }

  @Patch(':id')
  async updateClient(
    @Param('id') id: string,
    @Body() data: UpdateClientDto,
    @CurrentUser() user: authUserInterface.AuthUser,
  ) {
    return this.clientsService.updateClient(id, user.organizationId, data);
  }

  @Delete(':id')
  async deleteClient(
    @Param('id') id: string,
    @CurrentUser() user: authUserInterface.AuthUser,
  ) {
    return this.clientsService.deleteClient(id, user.organizationId);
  }
}
