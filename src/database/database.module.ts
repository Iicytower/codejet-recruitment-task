import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SensorDataSchema } from './schemas/sensor-data.schema';
import { SensorDataRepository } from './repositories/sensor-data.repository';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.DATABASE_URL ??
        'mongodb://mongodb:27017/sensordata?authSource=admin',
    ),
    MongooseModule.forFeature([
      { name: 'SensorData', schema: SensorDataSchema },
    ]),
  ],
  providers: [SensorDataRepository],
  exports: [SensorDataRepository],
})
export class DatabaseModule {}
