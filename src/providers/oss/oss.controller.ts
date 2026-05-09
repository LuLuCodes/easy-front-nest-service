import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

import { CurrentUser } from '@auth/decorators';
import type { AuthenticatedUser } from '@auth/types/jwt-payload';
import { ApiMultiFile } from '@decorator/api.multi.file.decorator';
import { ValidationPipe } from '@pipe/validation.pipe';

import { SignUploadParamsDto, SignedUrlDto, UploadDto } from './oss.dto';
import { OssProvider } from './oss.provider';

const KEY_RE = /^[A-Za-z0-9._\-/]+$/;
const MAX_FILES = 10;

interface MulterFile {
  originalname: string;
  buffer: Buffer;
  mimetype?: string;
  size?: number;
}

@ApiTags('阿里云 OSS (oss)')
@ApiBearerAuth()
@Controller('oss')
export class OssController {
  constructor(private readonly provider: OssProvider) {}

  /** Server-side multipart upload. Bytes go via this server then to OSS. */
  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile({
    bucket: { type: 'string' },
    oss_path: { type: 'string' },
  })
  @UseInterceptors(FilesInterceptor('files', MAX_FILES))
  async upload(
    @UploadedFiles() files: MulterFile[],
    @Body() body: UploadDto,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files in request');
    }
    const ossPath = normalizePath(body.oss_path);
    const client = await this.provider.getClient(user.tenant_id, body.bucket);
    const results = await Promise.all(
      files.map((f) => {
        const safe = sanitizeFilename(f.originalname);
        const key = `${ossPath}${Date.now()}-${safe}`;
        return client.put({ key, body: f.buffer, mime: f.mimetype });
      }),
    );
    return { files: results };
  }

  /** STS-style PostObject params for direct browser → OSS upload. */
  @Post('sign-upload-params')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signUpload(@Body() body: SignUploadParamsDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.bucket);
    return client.signPostObjectParams({
      max_size_mb: body.max_size_mb,
      expires_seconds: body.expires_seconds,
      dir: body.dir,
    });
  }

  /** Generate a signed URL for download (GET) or direct upload (PUT). */
  @Post('signed-url')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signedUrl(@Body() body: SignedUrlDto, @CurrentUser() user: AuthenticatedUser) {
    const client = await this.provider.getClient(user.tenant_id, body.bucket);
    const url = client.signedUrl(body.key, {
      expires_seconds: body.expires_seconds,
      method: body.method,
      content_type: body.content_type,
    });
    return { url };
  }
}

function normalizePath(input?: string): string {
  if (!input) return '';
  let p = input.trim();
  while (p.startsWith('/')) p = p.slice(1);
  if (p && !p.endsWith('/')) p += '/';
  if (p && !KEY_RE.test(p)) {
    throw new BadRequestException('oss_path contains illegal characters');
  }
  return p;
}

/**
 * Strips path separators and any character outside the safe set so an
 * uploaded filename can never escape the configured prefix or smuggle
 * URL-altering bytes into the object key.
 */
function sanitizeFilename(raw: string): string {
  if (!raw) return 'file';
  // express+multer hands us latin-1 bytes for non-ASCII filenames; recover utf8.
  const decoded = Buffer.from(raw, 'latin1').toString('utf8');
  const flat = decoded.replace(/[\\/]/g, '_').replace(/[^A-Za-z0-9._-]/g, '_');
  // Collapse leading dots so the file isn't a hidden file in the bucket UI.
  const stripped = flat.replace(/^\.+/, '');
  return stripped.slice(0, 200) || 'file';
}
