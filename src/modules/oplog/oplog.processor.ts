import { Injectable, Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { OpLogService } from './oplog.service';

@Injectable()
@Processor('op-log')
export class OpLogProcessor extends WorkerHost {
  private readonly logger = new Logger(OpLogProcessor.name);

  constructor(private readonly opLogService: OpLogService) {
    super();
  }

  async process(job: Job<any>): Promise<void> {
    if (job.name !== 'oplog') {
      this.logger.warn(`unhandled job name: ${job.name}`);
      return;
    }
    const log_data = { ...job.data };
    await this.opLogService.writeOpLog(log_data);
  }
}
