import { Injectable } from '@nestjs/common';
import { SensorDataRepository } from '../../database';

type StoreSensorDataInput = {
  temperature: number;
  humidity: number;
};

@Injectable()
export class SensorDataService {
  constructor(private repository: SensorDataRepository) {}

  async storeSensorData(input: StoreSensorDataInput) {
    await this.repository.create(input);
  }
}
