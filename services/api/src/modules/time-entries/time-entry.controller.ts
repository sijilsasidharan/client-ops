import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TimeEntryService } from './time-entry.service';
import { StartTimerDto } from './dto/start-timer.dto';
import { CurrentUser } from '../../auth/current-user.decorator';
import type { AuthUser } from '../../auth/auth-user.interface';
import { CreateManualEntryDto } from './dto/create-manual-entry.dto';

@Controller('time-entries')
export class TimeEntryController {
  constructor(private readonly timeEntryService: TimeEntryService) {}

  @Post('start-timer')
  startTimer(
    @Body() startTimerDto: StartTimerDto,
    @CurrentUser() user: AuthUser,
  ) {
    // Implementation for starting a timer
    return this.timeEntryService.startTimer(
      startTimerDto,
      user.organizationId,
      user.userId,
    );
  }

  @Patch(':id/stop-timer')
  stopTimer(@Param() id: string, @CurrentUser() user: AuthUser) {
    // Implementation for stopping a timer
    return this.timeEntryService.stopTimer(
      id,
      user.organizationId,
      user.userId,
    );
  }

  @Post()
  createManualEntry(
    @Body() createDto: CreateManualEntryDto,
    @CurrentUser() user: AuthUser,
  ) {
    // Implementation for creating a manual time entry
    return this.timeEntryService.createManualEntry(
      createDto,
      user.organizationId,
      user.userId,
    );
  }

  @Get()
  getAllTimeEntries(@CurrentUser() user: AuthUser) {
    // Implementation for getting time entries
    return this.timeEntryService.getAllEntries(
      user.organizationId,
      user.userId,
    );
  }

  @Patch(':id')
  updateTimeEntry(
    @Param() id: string,
    @Body() updateDto: any,
    @CurrentUser() user: AuthUser,
  ) {
    // Implementation for updating a time entry
    return this.timeEntryService.updateEntry(
      id,
      user.organizationId,
      user.userId,
      updateDto.startTime,
      updateDto.endTime,
      updateDto.description,
    );
  }

  @Delete(':id')
  deleteTimeEntry(@Param() id: string, @CurrentUser() user: AuthUser) {
    // Implementation for deleting a time entry
    return this.timeEntryService.deleteEntry(
      id,
      user.organizationId,
      user.userId,
    );
  }
}
