import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import type { AuthUser } from '../../auth/auth-user.interface';
import { CurrentUser } from '../../auth/current-user.decorator';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';
import { AuthGuard } from '../../auth/jwt-auth.guard';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private projectsService: ProjectsService) {}

  @Get()
  async getAllProjects(
    @Query('clientId') clientId: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.projectsService.getAllProjects(user.organizationId, clientId);
  }

  @Get(':id')
  async getProjectById(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.projectsService.getProjectById(id, user.organizationId);
  }

  @Post()
  async createProject(
    @Body() data: CreateProjectDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.projectsService.createProject(data, user.organizationId);
  }

  @Patch(':id')
  async updateProject(
    @Param('id') id: string,
    @Body() data: UpdateProjectDto,
    @CurrentUser() user: AuthUser,
  ) {
    return this.projectsService.updateProject(id, user.organizationId, data);
  }

  @Delete(':id')
  async deleteProject(@Param('id') id: string, @CurrentUser() user: AuthUser) {
    return this.projectsService.deleteProject(id, user.organizationId);
  }
}
