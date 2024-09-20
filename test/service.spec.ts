import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

import { AccessService } from '../src/modules/access/access.service';

describe('Field Test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('add field', async () => {
    const accessService = app.get(AccessService);
    const result = await accessService.getUserList({
      account_id: '',
    } as any);
    console.log(result);
    // 注意:这里需要根据实际的FormService方法和预期结果进行调整
  });
});
