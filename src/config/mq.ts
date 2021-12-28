import { env } from '@libs/env-unit';
import { registerAs } from '@nestjs/config';

export default registerAs('mq', () => ({
  host: env('RABBITMQ_HOST', ''),
  user: env('RABBITMQ_USER', ''),
  password: env('RABBITMQ_PASSWORD', ''),
}));
