import { Module } from '@nestjs/common';
import { SensorDataGateway } from './gateways/sensor-data.gateway';
import { ApplicationModule } from 'src/application/application.module';

@Module({
  imports: [ApplicationModule],
  providers: [SensorDataGateway],
})
export class ApiModule {}
