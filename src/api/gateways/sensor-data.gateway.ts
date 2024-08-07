import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { SensorDataDto } from '../dto/sensor-data.dto';
import { SensorDataService } from '../../application';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SensorDataGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  private clients: Set<Socket> = new Set();
  private logger = new Logger(SensorDataGateway.name);

  constructor(private service: SensorDataService) {}

  handleConnection(client: Socket) {
    this.clients.add(client);
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.clients.delete(client);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('sensorData')
  async handleSensorData(
    @MessageBody() body: SensorDataDto,
  ): Promise<WsResponse<string>> {

    await this.service.storeSensorData(body);

    return { event: 'sensorDataResponse', data: 'Data received successfully' };
  }
}
