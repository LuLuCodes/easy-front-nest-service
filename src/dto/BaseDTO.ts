/**
 * @deprecated 单一聚合 DTO 已被 `@common/dto/*` 中按职责拆分的 DTO 取代。
 * 保留本文件作为旧代码的过渡兼容层，新代码请直接组合具体 DTO，
 * 或在 controller 中使用 `IntersectionType` 显式聚合。
 *
 * 计划在 P5（业务模块剥离）完成后移除本文件。
 */
import { IntersectionType } from '@nestjs/mapped-types';

import { BaseRequestDto } from '@common/dto/base-request.dto';
import { CacheParamsDto } from '@common/dto/cache-params.dto';
import { DeleteRowDto } from '@common/dto/delete-row.dto';
import { PaginationDto } from '@common/dto/pagination.dto';
import { UpdateStatusDto } from '@common/dto/update-status.dto';

/** @deprecated 改用 `@common/dto/{base-request,cache-params}.dto` 组合。 */
export class BaseDTO extends IntersectionType(BaseRequestDto, CacheParamsDto) {}

/** @deprecated 改用 `@common/dto/pagination.dto` + 业务字段组合。 */
export class QueryDTO extends IntersectionType(BaseDTO, PaginationDto) {}

/** @deprecated 改用 `@common/dto/update-status.dto` + 业务字段组合。 */
export class UpdateStatusDTO extends IntersectionType(BaseDTO, UpdateStatusDto) {}

/** @deprecated 改用 `@common/dto/delete-row.dto` + 业务字段组合。 */
export class DeleteRowDTO extends IntersectionType(BaseDTO, DeleteRowDto) {}
