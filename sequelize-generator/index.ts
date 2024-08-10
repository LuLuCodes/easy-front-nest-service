/*
 * @Author: leyi leyi@myun.info
 * @Date: 2023-08-17 20:03:36
 * @LastEditors: leyi leyi@myun.info
 * @LastEditTime: 2024-03-26 11:43:01
 * @FilePath: /douyin-shop-master-service/sequelize-generator/index.ts
 * @Description:
 *
 * Copyright (c) 2024 by ${git_name_email}, All Rights Reserved.
 */
import { select } from '@inquirer/prompts';
import * as SyncModel from './sync-model';
import * as AutoGenerateCrud from './auto-generate-crud';
import * as Chalk from 'chalk';

enum Options {
  SYNC_MODELS_FROM_DB = 'SYNC_MODELS_FROM_DB',
  AUTO_GENERATE_CRUD_FOR_MODEL = 'AUTO_GENERATE_CRUD_FOR_MODEL',
}
(async () => {
  const choices = [
    {
      name: Options.SYNC_MODELS_FROM_DB,
      value: Options.SYNC_MODELS_FROM_DB,
      description: 'sync models from database',
    },
    {
      name: Options.AUTO_GENERATE_CRUD_FOR_MODEL,
      value: Options.AUTO_GENERATE_CRUD_FOR_MODEL,
      description: 'auto generate crud for model',
    },
  ];
  const answer = await select({
    choices,
    message: 'Please choose a option',
  });
  console.log(answer);
  if (answer === Options.SYNC_MODELS_FROM_DB) {
    await SyncModel.run();
  } else if (answer === Options.AUTO_GENERATE_CRUD_FOR_MODEL) {
    await AutoGenerateCrud.run();
  } else {
    console.log(Chalk.red('Unkown option!!!'));
  }
})();
