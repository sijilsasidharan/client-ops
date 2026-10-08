import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StartTimerDto } from './dto/start-timer.dto';
import { CreateManualEntryDto } from './dto/create-manual-entry.dto';

@Injectable()
export class TimeEntryService {
  constructor(private prismaService: PrismaService) {}

  async startTimer(
    startTimerDto: StartTimerDto,
    organizationId: string,
    userId: string,
  ) {
    const project = await this.prismaService.project.findFirst({
      where: {
        id: startTimerDto.projectId,
        organizationId: organizationId,
      },
    });

    if (!project) {
      throw new NotFoundException(
        'Project not found or does not belong to the organization.',
      );
    }

    const running = await this.prismaService.timeEntry.findFirst({
      where: {
        projectId: startTimerDto.projectId,
        userId: userId,
        endTime: null,
      },
    });

    if (running) {
      throw new ConflictException(
        'A timer is already running for this project.',
      );
    }

    return this.prismaService.timeEntry.create({
      data: {
        projectId: startTimerDto.projectId,
        userId: userId,
        organizationId: organizationId,
        startTime: new Date(),
      },
    });
  }

  async stopTimer(projectId: string, organizationId: string, userId: string) {
    const running = await this.prismaService.timeEntry.findFirst({
      where: {
        projectId: projectId,
        organizationId: organizationId,
        userId: userId,
        endTime: null,
      },
    });

    if (!running) {
      throw new NotFoundException('No running timer found for this project.');
    }

    return this.prismaService.timeEntry.update({
      where: {
        id: running.id,
      },
      data: {
        endTime: new Date(),
      },
    });
  }

  async createManualEntry(
    createDto: CreateManualEntryDto,
    organizationId: string,
    userId: string,
  ) {
    const project = await this.prismaService.project.findFirst({
      where: {
        id: createDto.projectId,
        organizationId: organizationId,
      },
    });

    if (!project) {
      throw new NotFoundException(
        'Project not found or does not belong to the organization.',
      );
    }

    return this.prismaService.timeEntry.create({
      data: {
        projectId: createDto.projectId,
        organizationId: organizationId,
        userId: userId,
        startTime: createDto.startTime,
        endTime: createDto.endTime,
        description: createDto.description,
      },
    });
  }

  async getRunningTimer(organizationId: string, userId: string) {
    return this.prismaService.timeEntry.findFirst({
      where: {
        organizationId: organizationId,
        userId: userId,
        endTime: null,
      },
    });
  }

  async getAllEntries(organizationId: string, userId: string) {
    return this.prismaService.timeEntry.findMany({
      where: {
        organizationId: organizationId,
        userId: userId,
      },
      orderBy: {
        startTime: 'desc',
      },
    });
  }

  async updateEntry(
    entryId: string,
    organizationId: string,
    userId: string,
    startTime?: Date,
    endTime?: Date,
    description?: string,
  ) {
    const entry = await this.prismaService.timeEntry.findUnique({
      where: {
        id: entryId,
        organizationId: organizationId,
        userId: userId,
      },
    });

    if (!entry) {
      throw new NotFoundException(
        'Time entry not found or does not belong to the user.',
      );
    }

    return this.prismaService.timeEntry.update({
      where: {
        id: entryId,
      },
      data: {
        startTime,
        endTime,
        description,
      },
    });
  }

  async deleteEntry(entryId: string, organizationId: string, userId: string) {
    const entry = await this.prismaService.timeEntry.findUnique({
      where: {
        id: entryId,
        organizationId: organizationId,
        userId: userId,
      },
    });

    if (!entry) {
      throw new NotFoundException(
        'Time entry not found or does not belong to the user.',
      );
    }

    return this.prismaService.timeEntry.delete({
      where: {
        id: entryId,
      },
    });
  }
}
