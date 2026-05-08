import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class CronTaskService {
  private readonly logger = new Logger(CronTaskService.name);

  @Cron(CronExpression.EVERY_2_HOURS)
  async handleCron(): Promise<void> {
    this.logger.log('cron task tick');
  }
}
