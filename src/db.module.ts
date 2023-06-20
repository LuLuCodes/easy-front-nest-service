import { Module, Global } from '@nestjs/common';
import { InjectModel, SequelizeModule } from '@nestjs/sequelize';

import {
  TDictionary,
  TUser,
  TUserLogin,
  TUserOplog,
  TUserRight,
  TUserRightRelation,
  TUserRole,
  TUserRoleRelation,
  TSmsLog,
} from '@models/index';

@Global()
@Module({
  imports: [
    SequelizeModule.forFeature([
      TDictionary,
      TUser,
      TUserLogin,
      TUserOplog,
      TUserRight,
      TUserRightRelation,
      TUserRole,
      TUserRoleRelation,
      TSmsLog,
    ]),
  ],
  exports: [SequelizeModule],
  controllers: [],
  providers: [],
})
export class DBModule {
  constructor(
    @InjectModel(TUser)
    private readonly tUser: typeof TUser,
    @InjectModel(TUserLogin)
    private readonly tUserLogin: typeof TUserLogin,
    @InjectModel(TUserRole)
    private readonly tUserRole: typeof TUserRole,
    @InjectModel(TUserRoleRelation)
    private readonly tUserRoleRelation: typeof TUserRoleRelation,
  ) {
    // 用户和登录账号 一对多关系
    this.tUser.hasOne(this.tUserLogin, {
      foreignKey: 'user_id',
      sourceKey: 'id',
      as: 'account',
    });

    this.tUserRoleRelation.hasOne(this.tUserRole, {
      foreignKey: 'id',
      sourceKey: 'role_id',
      as: 'role',
    });
  }
}
