/**
 * Aggregate request DTOs composed from the focused per-concern DTOs in
 * `@common/dto/*`. Used by 17+ request DTOs across access / basic /
 * oplog modules to avoid repeating the same `IntersectionType(...)`
 * boilerplate at every call site.
 *
 * Composition map:
 * - `BaseDTO`         = BaseRequestDto + CacheParamsDto
 * - `QueryDTO`        = BaseDTO + PaginationDto
 * - `UpdateStatusDTO` = BaseDTO + UpdateStatusDto
 * - `DeleteRowDTO`    = BaseDTO + DeleteRowDto
 *
 * Earlier history marked these as deprecated targeting removal post-P5.
 * Reviewed in P17: the aggregates are doing real work and the
 * alternative is ~17 IntersectionType call sites with the same shape.
 * Un-deprecated; if a future request DTO genuinely doesn't need cache /
 * request-id fields it can compose its own subset.
 */
import { IntersectionType } from '@nestjs/mapped-types';

import { BaseRequestDto } from '@common/dto/base-request.dto';
import { CacheParamsDto } from '@common/dto/cache-params.dto';
import { DeleteRowDto } from '@common/dto/delete-row.dto';
import { PaginationDto } from '@common/dto/pagination.dto';
import { UpdateStatusDto } from '@common/dto/update-status.dto';

export class BaseDTO extends IntersectionType(BaseRequestDto, CacheParamsDto) {}

export class QueryDTO extends IntersectionType(BaseDTO, PaginationDto) {}

export class UpdateStatusDTO extends IntersectionType(BaseDTO, UpdateStatusDto) {}

export class DeleteRowDTO extends IntersectionType(BaseDTO, DeleteRowDto) {}
