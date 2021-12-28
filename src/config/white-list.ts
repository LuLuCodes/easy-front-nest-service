import { registerAs } from '@nestjs/config';

export default registerAs('while_list', () => ({
  token: ['/api/oss/upload-oss'],
  sign: ['/api/oss/upload-oss'],
}));
