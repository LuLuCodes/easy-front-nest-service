import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class MqClientService {
  constructor(private readonly configService: ConfigService) {}

  createOrderProxy() {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${this.configService.get('mq.user')}:${this.configService.get(
            'mq.password',
          )}@${this.configService.get('mq.host')}/Publish`,
        ],
        queue: 'calculation_orderaward',
      },
    });
  }
}
