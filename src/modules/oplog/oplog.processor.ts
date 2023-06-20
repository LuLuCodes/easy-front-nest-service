import { Injectable } from '@nestjs/common';
import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { OpLogService } from './oplog.service';
import { CacheService } from '@service/cache.service';
@Processor('op-log')
export class OpLogProcessor {
  constructor(
    private cacheService: CacheService,
    private opLogService: OpLogService,
  ) {}

  @Process('oplog')
  async handleLog(job: Job<any>) {
    console.log(`handleLog catch:${JSON.stringify(job)}`);
    const log_data = { ...job.data };
    await this.opLogService.writeOpLog(log_data);
  }
}
