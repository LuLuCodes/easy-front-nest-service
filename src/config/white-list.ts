import { registerAs } from '@nestjs/config';

export default registerAs('while_list', () => ({
  sign: ['/api/oss/upload-oss'],
}));
