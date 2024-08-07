import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { SensorDataService } from './services/sensor-data.service';

@Module({
  imports: [DatabaseModule],
  providers: [SensorDataService],
  exports: [SensorDataService],
})
export class ApplicationModule {}
