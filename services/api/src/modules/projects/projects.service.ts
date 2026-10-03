import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

!Injectable();
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async createProject(
    createProjectDto: CreateProjectDto,
    organizationId: string,
  ) {
    const client = await this.prisma.client.findFirst({
      where: { id: createProjectDto.clientId },
    });

    if (!client) {
      throw new NotFoundException(
        `Client with ID ${createProjectDto.clientId} not found`,
      );
    }

    return this.prisma.project.create({
      data: { ...createProjectDto, organizationId },
    });
  }

  async getAllProjects(organizationId: string, clientId?: string) {
    return this.prisma.project.findMany({
      where: { organizationId, clientId },
    });
  }

  async getProjectById(projectId: string, organizationId: string) {
    const project = await this.prisma.project.findFirst({
      where: { id: projectId, organizationId },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }
    return project;
  }

  async updateProject(
    id: string,
    organizationId: string,
    data: UpdateProjectDto,
  ) {
    if (data.clientId) {
      const client = await this.prisma.client.findFirst({
        where: { id: data.clientId, organizationId },
      });
      if (!client) throw new NotFoundException('Client not found');
    }

    const result = await this.prisma.project.updateMany({
      where: { id, organizationId },
      data,
    });
    if (result.count === 0) throw new NotFoundException('Project not found');

    return this.prisma.project.findUniqueOrThrow({ where: { id } });
  }

  async deleteProject(id: string, organizationId: string) {
    const result = await this.prisma.project.deleteMany({
      where: { id, organizationId },
    });
    if (result.count === 0) throw new NotFoundException('Project not found');
  }
}
