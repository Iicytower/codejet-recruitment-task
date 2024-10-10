import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WsResponse,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { Socket } from 'socket.io';
import { SensorDataDto } from '../dto/sensor-data.dto';
import { SensorDataService } from '../../application';
import { AllExceptionsFilter } from '../common/all-exceptions.filter';

@UseFilters(AllExceptionsFilter)
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
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
    @ConnectedSocket() client: Socket,
  ): Promise<WsResponse<string>> {
    await this.service.storeSensorData(body);

    return { event: 'sensorDataResponse', data: 'Data received successfully' };
  }
}
